import React from 'react'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import RestaurantsScreen from '../../features/restaurants/screens/RestaurantsScreen'
import { RestaurantDetail } from '../../features/restaurants/screens/RestaurantDetail';

const RestaurantStack = createStackNavigator();

export const RestaurantNavigator = () => {
    return (
        <RestaurantStack.Navigator screenOptions={{
            ...TransitionPresets.ModalPresentationIOS,
            headerShown : false
        }}>
            <RestaurantStack.Screen
                name="Restaurants"
                component={RestaurantsScreen}
            />
            <RestaurantStack.Screen
                name="RestaurantDetail"
                component={RestaurantDetail}
            />
        </RestaurantStack.Navigator>
    )
}