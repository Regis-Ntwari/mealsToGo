import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/AuthenticationContext";

export default function App() {

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  const firebaseConfig = {
    apiKey: "AIzaSyD5SaEEpbthdhK37EVtAnHND751r2s32_o",
    authDomain: "mealstogo-7dfb1.firebaseapp.com",
    projectId: "mealstogo-7dfb1",
    storageBucket: "mealstogo-7dfb1.appspot.com",
    messagingSenderId: "547232205596",
    appId: "1:547232205596:web:0ec67ce7fd71573b6408d9",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
        <ExpoStatusBar />
      </ThemeProvider>
    </>
  );
}
