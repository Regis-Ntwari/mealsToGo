import React, { useContext, useState } from "react";

import { Spacer } from "../../../components/spacer/Spacer";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  ErrorContainer,
  AuthInput,
  Title,
} from "../components/AccountStyles";
import { Text } from "../../../components/typography/TextTypography";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, Colors } from "react-native-paper";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { onLogin, isLoading, error } = useContext(AuthenticationContext);
  console.log(isLoading, error);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer>
          <AuthInput
            label="password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(u) => setpassword(u)}
          />
        </Spacer>
        {error ? (
          <Spacer size="large">
            <ErrorContainer>
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          </Spacer>
        ) : null}
        <Spacer>
          {isLoading ? (
            
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer>
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
