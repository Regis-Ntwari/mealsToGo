import React from "react"
import styled from "styled-components/native"
import {Spacer} from "../spacer/Spacer"
import { ScrollView, TouchableOpacity } from "react-native"
import {CompactRestaurantInfo} from "../restaurant/CompactRestaurantInfo"

const FavouritesWrapper = styled.View`
    padding: 10px
`

export const FavouriteBarComponent = ({favourites, onDetail}) => {
    if(!favourites.length){
        return null
    }
    return (
        <FavouritesWrapper>
            <ScrollView horizontal={true}>
                {favourites.map((restaurant) => {
                    return (
                        <Spacer key={restaurant.name} position="left" size="medium">
                            <TouchableOpacity onPress={() => onDetail("RestaurantDetail", {
                                restaurant
                            })}>
                            <CompactRestaurantInfo restaurant={restaurant}/>
                            </TouchableOpacity>
                        </Spacer>
                    )
                })}
            </ScrollView>
        </FavouritesWrapper>
    )
}