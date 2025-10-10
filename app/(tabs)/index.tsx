import Header from "@/components/ui/header";
import Icons from "@/components/ui/icons";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const data = [
    { id: 1, title: "Photo 1" },
    { id: 2, title: "Photo 2" },
    { id: 3, title: "Photo 3" },
    { id: 4, title: "Photo 4" },
    { id: 5, title: "Photo 5" },
    { id: 6, title: "Photo 6" },
    { id: 7, title: "Photo 7" },
  ];
  return (
    <>
      <Header title="Upscaler" />
      <View className="p-4 flex-1 gap-2">
        <Text className="text-white font-sans-bold text-2xl">Photos</Text>
        <View className="flex-1 w-full">
          <FlatList
            data={data}
            numColumns={3}
            renderItem={({ index }) =>
              index === 0 ? <NewPhoto /> : <PhotoCard />
            }
            contentContainerStyle={{ gap: 16 }}
            columnWrapperStyle={{ gap: 16 }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </>
  );
}

function PhotoCard() {
  return (
    <TouchableOpacity className="flex-[.33] rounded-2xl overflow-hidden aspect-[0.8/1]">
      <Image
        source={require("@/assets/images/photo1.png")}
        resizeMode="cover"
        className=" w-full h-full"
      />
    </TouchableOpacity>
  );
}

function NewPhoto() {
  return (
    <Link href="/(screens)/NewScaleScreen" asChild>
      <TouchableOpacity className="flex-[.33] border-4 gap-2 border-dashed border-white bg-white/10 items-center justify-center rounded-2xl overflow-hidden aspect-[0.8/1]">
        <Icons name="CirclePlus" size={24} color="white" />
        <Text className="text-white text-base font-sans-bold text-center">
          Upscale{"\n"}New
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
