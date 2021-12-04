import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export default function SearchComponent({isToggled, onToggle}) {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword)
  },[keyword])

  console.log(isToggled);

  return (
    <SearchContainer>
      <Searchbar placeholder="Search for a Location" value={searchKeyword} 
      icon={isToggled ? "heart" : "heart-outline"}
      iconColor={isToggled ? "red" : "gray"}
      onIconPress={onToggle}
      onSubmitEditing={() => {
          search(searchKeyword)
      }}
      onChangeText={(text) => {
          setSearchKeyword(text)
      }}
      />
    </SearchContainer>
  );
}
