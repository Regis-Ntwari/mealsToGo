import React, { useContext, useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import styled from 'styled-components/native'
import { LocationContext } from '../../../services/location/location.context'
import SearchMapComponent from '../components/SearchMapComponent'
import {RestaurantsContext} from '../../../services/restaurants/restaurant.context'
import { MapCalloutComponent } from '../components/MapCalloutComponent'

const Map = styled(MapView)`
    height : 100%;
    width : 100%;
`
export const MapScreen = ({navigation}) => {
    const {location} = useContext(LocationContext)
    const {restaurants = []} = useContext(RestaurantsContext)

    const [latDelta, setLatDelta] = useState(0)

    const {lat, lng, viewport} = location

    useEffect(() => {
        const northeastLat = viewport.northeast.lat;
        const southwestLat = viewport.southwest.lat;

        const latDelta = northeastLat - southwestLat;
        setLatDelta(latDelta)
    }, [location, viewport])
    return (
        <>
            <SearchMapComponent/>
            <Map region={{
                latitude : lat,
                longitude : lng,
                latitudeDelta : latDelta,
                longitudeDelta : 0.02,
            }}>
                {restaurants.map((restaurant) => {
                    return <MapView.Marker
                        key={restaurant.name}
                        title={restaurant.name}
                        coordinate={{
                            latitude : restaurant.geometry.location.lat,
                            longitude : restaurant.geometry.location.lng
                        }}>
                        <MapView.Callout onPress={() => navigation.navigate("RestaurantDetail", {restaurant})}>
                            <MapCalloutComponent restaurant={restaurant}/>
                        </MapView.Callout>
                    </MapView.Marker>
                })}
            </Map>
        </>
    )
}