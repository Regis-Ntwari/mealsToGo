import React, { createContext, useState, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import { restaurantsRequest, restaurantsTransform } from "./Restaurant.service";

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({children}) => {
    const [restaurants, setrestaurants] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState(null)
    const {location} = useContext(LocationContext);

    const retrieveRestaurants = (loc) => {
        setisLoading(true);
        setrestaurants([])
        setTimeout(() => {
            restaurantsRequest(loc).then(restaurantsTransform).then((results) => {
                setisLoading(false)
                setrestaurants(results);
            }).catch((err) => {
                setisLoading(false)
                seterror(err)
            })
        }, 2000);
    }

    useEffect(() => {
        if(location){
            const locationString = `${location.lat},${location.lng}`
            retrieveRestaurants(locationString)
        }
    }, [location])
    return <RestaurantsContext.Provider value={{
        restaurants,
        isLoading,
        error
        }}>
        {children}
    </RestaurantsContext.Provider>
}