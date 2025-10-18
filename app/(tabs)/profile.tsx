import BeforeAfter from "@/components/BeforeAfter";
import Header from "@/components/ui/header";
import React from "react";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <>
      <Header title="Profile" />
      <View className="flex-1">
        <BeforeAfter />
      </View>
    </>
  );
}
