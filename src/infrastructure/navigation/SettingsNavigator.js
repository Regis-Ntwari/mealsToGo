import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CameraScreen } from "../../features/settings/screens/CameraScreen";
import { FavouriteScreen } from "../../features/settings/screens/FavouriteScreen";
import { SettingScreen } from "../../features/settings/screens/SettingScreen";

const Stack = createStackNavigator();

export const SettingsNavigator = ({route, navigation}) => {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen options={{
                header: () => null
            }}
                name="Settings"
                component={SettingScreen}/>
            <Stack.Screen name="Favourites" component={FavouriteScreen}/>
            <Stack.Screen name="Camera" component={CameraScreen}/>
        </Stack.Navigator>
    )
}