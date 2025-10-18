import BeforeAfterSlider from "@/components/BeforeAfter";
import Header from "@/components/ui/header";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
// ActivityIndicator, yükleme animasyonu için eklendi
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Butonları dinamik render etmek için bir dizi
const scaleOptions = [
  { label: "2x", premium: false },
  { label: "4x", premium: true },
  { label: "8x", premium: true },
];

export default function NewScaleScreen() {
  const [upto, setUpTo] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  // 'isComplated' -> 'isCompleted' olarak düzeltildi
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [baseImage, setBaseImage] = React.useState<string>();
  const [scaledImage, setScaledImage] = React.useState<string>();

  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    console.log(res);
    if (!res.canceled) {
      setBaseImage(res.assets[0].uri);
    }
    if (res.canceled) {
      Alert.alert("You have to select an image", "Please pick a image", [
        {
          text: "Open gallery",
          onPress: pickImage,
        },
      ]);
    }
  };

  React.useEffect(() => {
    pickImage();
  }, []);

  // Ölçekleme işlemini başlatan fonksiyon
  function handleScale() {
    // Zaten yükleniyorsa tekrar çalıştırmayı engelle
    if (isLoading) return;

    setIsLoading(true);

    // setTimeout'un içine state güncellemeleri alındı (Mantık hatası düzeltildi)
    setTimeout(() => {
      setIsCompleted(true);
      setIsLoading(false);
    }, 3_000);
  }

  // Yeni ölçek seçildiğinde hem 'upto' hem de 'isCompleted' state'ini güncelleyen fonksiyon
  function handleSetUpto(value: number) {
    setUpTo(value);
    // Kullanıcı yeni bir ölçek seçtiğinde sonucu sıfırla
    setIsCompleted(false);
  }

  return (
    <>
      <Header title="New Scale" />
      {/* flex-1: Bu View'ın Header dışında kalan tüm ekranı kaplamasını sağlar
        p-4: İç boşluk
        flex-col: Çocukları dikey dizer
        gap-4: Çocuklar arasına boşluk koyar
      */}
      <View className="flex-1 p-4 flex flex-col gap-4">
        {/*
          flex-1: Bu View'ın, alttaki butonlar dışında kalan tüm dikey alanı doldurmasını sağlar.
          w-full: Tam genişlik
          rounded-3xl overflow-hidden: Köşeleri yuvarlatır ve taşan içeriği gizler
          (Eski 'aspect-[10/15.5]' kaldırıldı)
        */}
        <View className="w-full flex-1 rounded-3xl overflow-hidden">
          {isCompleted && baseImage && scaledImage ? (
            <BeforeAfterSlider before={baseImage} after={scaledImage} />
          ) : (
            <Image
              source={{ uri: baseImage }}
              // 'stretch' yerine 'cover' kullanıldı (Daha iyi görüntü)
              resizeMode="cover"
              className="w-full h-full"
            />
          )}
        </View>

        {/* Kontrol Butonları Alanı */}
        <View className="gap-4">
          <View className="bg-white/10 rounded-3xl p-2">
            {!isLoading ? (
              <View className="flex-row gap-2">
                {/* scaleOptions dizisi map edilerek butonlar dinamik oluşturuldu */}
                {scaleOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option.label}
                    onPress={() => handleSetUpto(index)} // Yeni handler kullanıldı
                    className={cn(
                      "border-2 border-white/10 p-3 flex-1 items-center justify-evenly rounded-2xl flex-row",
                      // index'e göre aktif stil belirlendi
                      upto === index && "bg-white/50"
                    )}
                  >
                    <Text className="font-sans-bold text-xl text-white">
                      {option.label}
                    </Text>
                    {/* Premium ikon koşulu */}
                    {option.premium && (
                      <Icons name="Crown" color="gold" size={20} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Yükleniyor durumu
              <View className="flex-row">
                {/* 'w-1/2' yerine 'w-full' kullanıldı (Görsel tutarlılık) */}
                <View
                  className={cn(
                    "bg-white/50 p-3 w-full items-center justify-center rounded-2xl flex-row"
                  )}
                >
                  {/* '50%' metni yerine ActivityIndicator eklendi */}
                  <ActivityIndicator size="small" color="white" />
                  <Text className="font-sans-bold text-xl text-white ml-3">
                    Scaling...
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Upscale Butonu (Değişiklik yok) */}
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
              className="p-4 items-center justify-evenly flex-row"
              onPress={handleScale}
              // Yüklenirken butonu pasif hale getir
              disabled={isLoading}
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
