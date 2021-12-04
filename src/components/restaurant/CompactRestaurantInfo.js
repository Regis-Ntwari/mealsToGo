import React from "react"
import styled from "styled-components/native";
import { Text } from '../typography/TextTypography'
import WebView from 'react-native-webview'
import { Platform } from "react-native";

const CompactImage = styled.Image`
    border-radius: 10px;
    width : 120px;
    height : 100px;
`

const Item = styled.View`
    padding : 10px;
    max-width : 120px;
    align-items: center
`

const CompactWebView = styled(WebView)`
    border-radius : 10px;
    width: 120px;
    height: 100px
`
export const CompactRestaurantInfo = ({restaurant, isMap}) => {
    const Image = Platform.OS === "android" && isMap ? CompactWebView : CompactImage
    return (
        <Item>
            <Image source={{uri: restaurant.photos[0]}}/>
            <Text center variant="caption" numberOfLines={3}>
                {restaurant.name}
            </Text>
        </Item>
    )
}