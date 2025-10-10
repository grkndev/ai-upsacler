import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "./icons";
export default function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = navigation.getParent()?.getState()?.routes[
    navigation.getParent()?.getState()?.index as number
  ].name;
  const canGoBack = route !== "(tabs)" && navigation.canGoBack();

  return (
    <View
      className="relative flex flex-row items-center justify-center border-b border-white/10"
      style={{ paddingTop: insets.top, padding: 16 }}
    >
      {canGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 bg-white/10 rounded-full p-1.5"
          style={{ margin: 16, marginTop: insets.top }}
        >
          <Icons name="ChevronLeft" color="white" />
        </TouchableOpacity>
      )}
      <Text className="text-white text-2xl font-sans-bold">
        {title}
        {/*    {headerTitles[currentRoute as keyof typeof headerTitles]} */}
      </Text>
    </View>
  );
}

const headerTitles = {
  index: "Home",
  profile: "Profile",
  settings: "Settings",
};
