import Header from "@/components/ui/header";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
export default function NewScaleScreen() {
  const [upto, setUpTo] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isComplated, setIsComplated] = React.useState(false);
  return (
    <>
      <Header title="New Scale" />
      <View className=" p-4 flex flex-col gap-4">
        <View
          className=" w-full aspect-[10/15.5] rounded-3xl overflow-hidden "
          //intensity={100}
          //tint="systemUltraThinMaterial"
        >
          <Image
            source={require("@/assets/images/photo1.png")}
            resizeMode="stretch"
            className=" w-full h-full"
          />
        </View>

        <View className=" gap-4">
          <View className="bg-white/10 rounded-3xl p-2 ">
            {!isLoading && (
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setUpTo(0)}
                  className={cn(
                    " border-2 border-white/10 p-3 flex-1 items-center justify-evenly rounded-2xl flex-row ",
                    upto === 0 && "bg-white/50"
                  )}
                >
                  <Text className="font-sans-bold text-xl text-white">2x</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setUpTo(1)}
                  className={cn(
                    "border-2 border-white/10 p-3 flex-1 items-center justify-evenly rounded-2xl flex-row ",
                    upto === 1 && "bg-white/50"
                  )}
                >
                  <Text className="font-sans-bold text-xl text-white">4x</Text>
                  <Icons name="Crown" color="gold" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setUpTo(2)}
                  className={cn(
                    "border-2 border-white/10 p-3 flex-1 items-center justify-evenly rounded-2xl flex-row ",
                    upto === 2 && "bg-white/50"
                  )}
                >
                  <Text className="font-sans-bold text-xl text-white">8x</Text>
                  <Icons name="Crown" color="gold" size={20} />
                </TouchableOpacity>
              </View>
            )}
            {isLoading && (
              <View className="flex-row gap-2">
                <View
                  className={cn(
                    " bg-white/50 p-3 w-1/2 items-center justify-evenly rounded-2xl flex-row "
                  )}
                >
                  <Text className="font-sans-bold text-xl text-white">50%</Text>
                </View>
              </View>
            )}
          </View>
          <LinearGradient
            colors={["#5B2CF2", "#8E44FD", "#FF4D8D", "#F90AAD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.35, 0.7, 1]}
            style={{
              borderRadius: 24,
              borderWidth: 4,
              borderColor: "#311A98",
            }}
          >
            <TouchableOpacity
              className="p-4 items-center justify-evenly flex-row "
              onPress={() => setIsLoading((prev) => !prev)}
            >
              {upto === 0 ? (
                <Text className="font-sans-bold text-xl text-white">
                  Upscale
                </Text>
              ) : (
                <Text className="font-sans-bold text-lg text-white">
                  Upscale with Premium
                </Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </>
  );
}
