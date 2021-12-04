import AsyncStorage from "@react-native-async-storage/async-storage"
import { Camera } from "expo-camera"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import styled from "styled-components"
import {AuthenticationContext} from "../../../services/authentication/AuthenticationContext"

const ProfileCamera = styled(Camera)`
    width : 100%;
    height : 100%
`

export const CameraScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null)
    const cameraRef = useRef();
    const {user} = useContext(AuthenticationContext)
    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted")
        })();
    },[])
    

    const snap = async() => {
        if(cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            AsyncStorage.setItem(`${user.uid}--photo`, photo.uri);
            navigation.goBack();
        }
    }

    if(hasPermission === null){
        return <View/>
    }
    if(hasPermission === false){
        return <Text>No Access to camera</Text>
    }
    return (
        <TouchableOpacity onPress={snap}>
                <ProfileCamera
                ref={(camera) => {cameraRef.current = camera}}
                    type={Camera.Constants.Type.front}
                    ratio={"16:9"}
                >

        </ProfileCamera>
            </TouchableOpacity>
    )
}