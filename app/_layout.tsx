import "@/global.css";
import "react-native-gesture-handler";
import "react-native-reanimated";

import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          // header: (props) => <Header {...props} />,
          headerShown: false,
          contentStyle: {
            backgroundColor: "#0C081E",
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(screens)/NewScaleScreen" />
      </Stack>
    </GestureHandlerRootView>
  );
}
