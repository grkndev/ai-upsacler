import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Header({ navigation }: { navigation: NavigationProp<any> }) {
  const insets = useSafeAreaInsets();
  const currentRoute = navigation.getState().routes[navigation.getState().index].name;
  return (
    <View
      className="items-center justify-center border-b border-white/10"
      style={{ paddingTop: insets.top, padding: 16 }}
    >
      <Text className="text-white text-2xl font-sans-bold">
        {headerTitles[currentRoute as keyof typeof headerTitles]}
      </Text>
    </View>
  );
}

const headerTitles = {
  index: "Home",
  profile: "Profile",
  settings: "Settings",
};