import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthenticationContext } from "../authentication/AuthenticationContext";

export const FavouriteContext = createContext();

export const FavouritesContextProvider = ({children}) => {
    const {user} = useContext(AuthenticationContext)
    const[favourites, setFavourites] = useState([])

    const add = (restaurant) => {
        setFavourites([...favourites, restaurant])
    }

    const remove = (restaurant) => {
        const newFavourites = favourites.filter(
            (f) => f.place_id !== restaurant.place_id
        )
        setFavourites(newFavourites)
    }

    const saveFavourites = async(value, uid) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue)
        } catch (error) {
            console.log(error);
        }
    }

    const loadFavourites = async(uid) => {
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`)
            if(value !== null){
                setFavourites(JSON.parse(value))
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(user){
            saveFavourites(favourites, user.uid)
        }
    }, [favourites, user])

    useEffect(() => {
        loadFavourites(user.uid)
    }, [user])
    return (
        <FavouriteContext.Provider
            value={{
                favourites,
                addToFavourites : add,
                removeFromFavourites: remove,
            }}
        >
            {children}
        </FavouriteContext.Provider>
    )
}