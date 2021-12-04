import React, { useContext } from "react";
import { FavouriteContext } from "../../services/favourites/favouritesContext";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const FavouriteButton = styled(TouchableOpacity)`
  top : 1px;
  right : 1px
  z-index : -1
  flex-direction : row-reverse
`;

export const Favourite = ({ restaurant }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouriteContext);
  const isFavourite = favourites.some(
    (r) => r.place_id === restaurant.place_id
  );
  return (
    <FavouriteButton
        onPress={() => !isFavourite ? addToFavourites(restaurant) : removeFromFavourites(restaurant)}
    >
        <AntDesign
            name={
                isFavourite ? "heart" : "hearto"
            }
            size={25}
            color={isFavourite ? "red" : "white"}
        />
    </FavouriteButton>
    
  );
};
