import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
 
  return (
    <View
      className="items-center justify-center border-b border-white/10"
      style={{ paddingTop: insets.top, padding: 16 }}
    >
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