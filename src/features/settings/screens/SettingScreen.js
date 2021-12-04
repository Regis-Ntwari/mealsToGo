import React, { useContext, useEffect, useState } from "react";
import { Avatar, List } from "react-native-paper";
import { Spacer } from "../../../components/spacer/Spacer";
import { Text } from "../../../components/typography/TextTypography";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);
  const getprofilePicture = async(currentUser) => {
    const photoURI = AsyncStorage.getItem(`${currentUser.uid}--photo`);
    setPhoto(photoURI)
  }

  useFocusEffect(() => {
    getprofilePicture(user);
  },[user])
  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!photo ? <Avatar.Icon
            size={180}
            backgroundColor="#2182BD"
            icon="human"
            style={{ marginTop: 10 }}
          /> : (
            <Avatar.Image
            size={180}
            backgroundColor="#2182BD"
            source={{uri : photo}}
            style={{ marginTop: 10 }}
          />
          )}
          
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          style={{ padding: 16 }}
          title="Favourites"
          description="View your Favourites"
          left={(props) => (
            <List.Icon {...props} color="black" icon="star-outline" />
          )}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          style={{ padding: 16 }}
          title="Logout"
          left={(props) => (
            <List.Icon {...props} color="black" icon="lock-open-outline" />
          )}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
