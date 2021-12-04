import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import RestaurantInfo from "../components/RestaurantInfo";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/Spacer";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { useContext } from "react";
import { RestaurantsContext } from "../../../services/restaurants/restaurant.context";
import SearchComponent from "../components/SearchComponent";
import { FavouriteContext } from "../../../services/favourites/favouritesContext";
import { FavouriteBarComponent } from "../../../components/favourite/FavouriteBarComponent";
import { RestaurantList } from "../components/RestaurantListStyles";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default function RestaurantsScreen({ navigation }) {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouriteContext);
  const [isToggled, setIsToggled] = useState(false);
  return (
    <SafeArea>
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue400} />
        </LoadingContainer>
      ) : null}
      <SearchComponent
        isToggled={isToggled}
        onToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled ? (
        <FavouriteBarComponent
          favourites={favourites}
          onDetail={navigation.navigate}
        />
      ) : null}
      <RestaurantList
        data={restaurants}
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
  );
}
