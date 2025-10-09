import Icons from "@/components/ui/icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";

const TabBarComponent = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    // Cleanup
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const currentRoute = state.routes[state.index].name;
  return (
    <>
      {!isKeyboardVisible && (
        <View className="border-white/10 border-t bg-transparent flex flex-row items-center justify-center w-full h-24">
          {/* HOME */}
          <TouchableOpacity
            onPress={() => navigation.navigate("index")}
            className={`flex h-full w-1/4 items-center justify-center $`}
          >
            <Icons
              name={"House"}
              color={currentRoute === "index" ? "#fff" : "#a1a1aa"}
            />
          </TouchableOpacity>

          {/* PROFILE */}
          <TouchableOpacity
            onPress={() => navigation.navigate("profile")}
            className={` flex h-full w-1/4 items-center justify-center`}
          >
            <Icons
              name={"UserRound"}
              color={currentRoute === "profile" ? "#fff" : "#a1a1aa"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("settings")}
            className={`flex h-full w-1/4 items-center justify-center`}
          >
            <Icons
              name={"Settings"}
              color={currentRoute === "settings" ? "#fff" : "#a1a1aa"}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default TabBarComponent;
