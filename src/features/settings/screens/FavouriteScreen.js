import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/Spacer";
import { Text } from "../../../components/typography/TextTypography";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { FavouriteContext } from "../../../services/favourites/favouritesContext";
import RestaurantInfo from "../../restaurants/components/RestaurantInfo";
import { RestaurantList } from "../../restaurants/components/RestaurantListStyles";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
export const FavouriteScreen = ({navigation}) => {
  const { favourites } = useContext(FavouriteContext);

  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfo restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  );
};
