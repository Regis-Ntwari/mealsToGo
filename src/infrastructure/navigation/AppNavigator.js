import React, { useContext } from "react";
import { RestaurantNavigator } from "./RestaurantNavigator";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MapScreen } from "../../features/maps/screens/MapScreen";
import { FavouritesContextProvider } from "../../services/favourites/favouritesContext";
import { LocationContextprovider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurant.context";
import { SettingsNavigator } from "./SettingsNavigator";

const Tab = createBottomTabNavigator();



export const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextprovider>
        <RestaurantsContextProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === "Restaurant") {
                  iconName = "md-restaurant";
                } else if (route.name === "Settings") {
                  iconName = "md-settings";
                } else if (route.name === "Map") {
                  iconName = "md-map";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Restaurant" component={RestaurantNavigator} options={{headerShown : false}}/>
            <Tab.Screen name="Map" component={MapScreen} options={{headerShown : false}}/>
            <Tab.Screen name="Settings" component={SettingsNavigator} options={{headerShown : false}}/>
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextprovider>
    </FavouritesContextProvider>
  );
};
