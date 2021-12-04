import React, {createContext, useEffect, useState} from 'react'
import {locationTransform, lcoationRequest} from './location.service'

export const LocationContext = createContext();

export const LocationContextprovider = ({children}) => {
    const [location, setlocation] = useState(null)
    const [keyword, setkeyword] = useState("San Francisco")
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const onSearch = (searchKeyword) => {
        setloading(true);
        setkeyword(searchKeyword)
        
    }

    useEffect(() => {
        if(!keyword.length){
            return;
        }
        lcoationRequest(keyword.toLowerCase())
        .then(locationTransform)
        .then((result) => {
            setloading(false);
            setlocation(result)
        })
        .catch((err) => {
            setloading(false);
            seterror(err)
        })
    }, [keyword])
    return <LocationContext.Provider
        value={{
            loading,
            error,
            location,
            search: onSearch,
            keyword
        }}
    >
        {children}
    </LocationContext.Provider>
}