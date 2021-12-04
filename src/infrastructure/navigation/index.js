import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { AccountNavigator } from "./AccountNavigator";

import { AppNavigator } from "./AppNavigator";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  console.log(isAuthenticated, "-");
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigator/>
      ) : (
        <AccountNavigator/>
      )}
    </NavigationContainer>
  );
};
