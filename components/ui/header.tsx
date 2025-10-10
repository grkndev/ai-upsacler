import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = navigation.getParent()?.getState()?.routes[navigation.getParent()?.getState()?.index as number].name
  const canGoBack = route !== "(tabs)" && navigation.canGoBack();
 
  return (
    <View
      className="items-center justify-center border-b border-white/10"
      style={{ paddingTop: insets.top, padding: 16 }}
    >
      <Text className="text-white text-2xl font-sans-bold">
        {title}
       {/*    {headerTitles[currentRoute as keyof typeof headerTitles]} */}
       {canGoBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
       )}
      </Text>
    </View>
  );
}

const headerTitles = {
  index: "Home",
  profile: "Profile",
  settings: "Settings",
};