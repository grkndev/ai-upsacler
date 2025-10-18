import React from "react";
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Icons from "./ui/icons";

const ASPECT_RATIO = 10 / 15.5;
const AnimatedImage = Animated.createAnimatedComponent(Image);

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  "worklet";
  return Math.min(Math.max(value, lowerBound), upperBound);
};

const BeforeAfterSlider = () => {
  const { width: windowWidth } = useWindowDimensions();

  const containerWidth = useSharedValue(windowWidth);
  const containerHeight = useSharedValue(windowWidth / ASPECT_RATIO);
  const sliderRatio = useSharedValue(0.5);
  const sliderPosition = useSharedValue(windowWidth * sliderRatio.value);
  const panOffset = useSharedValue(sliderPosition.value);

  const handleLayout = React.useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    const { width, height } = nativeEvent.layout;
    containerWidth.value = width;
    containerHeight.value = height;
    const nextPosition = width * sliderRatio.value;
    sliderPosition.value = clamp(nextPosition, 0, width);
  }, []);

  React.useEffect(() => {
    const nextWidth = windowWidth;
    containerWidth.value = nextWidth;
    containerHeight.value = nextWidth / ASPECT_RATIO;
    const nextPosition = nextWidth * sliderRatio.value;
    sliderPosition.value = clamp(nextPosition, 0, nextWidth);
  }, [windowWidth]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      panOffset.value = sliderPosition.value;
    })
    .onUpdate((event) => {
      const nextPosition = panOffset.value + event.translationX;
      const clampedPosition = clamp(nextPosition, 0, containerWidth.value);
      sliderPosition.value = clampedPosition;
      sliderRatio.value =
        containerWidth.value === 0
          ? 0.5
          : clampedPosition / containerWidth.value;
    });

  const animatedSliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sliderPosition.value }],
    };
  });

  const animatedAfterImageStyle = useAnimatedStyle(() => {
    return {
      width: sliderPosition.value,
    };
  });

  const animatedHandleHeightStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
    };
  });

  const animatedImageFillStyle = useAnimatedStyle(() => {
    return {
      width: containerWidth.value,
      height: containerHeight.value,
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageContainer,
          { width: windowWidth, aspectRatio: ASPECT_RATIO },
        ]}
        onLayout={handleLayout}
      >
        {/* Before Image (Alt katman) */}
        <AnimatedImage
          source={{
            uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          }}
          style={[styles.image, styles.imageFill, animatedImageFillStyle]}
          resizeMode="cover"
        />

        {/* After Image (Üst katman - kırpılmış) */}
        <Animated.View
          style={[styles.afterImageContainer, animatedAfterImageStyle]}
        >
          <AnimatedImage
            source={{
              uri: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
            }}
            style={[styles.image, styles.imageFill, animatedImageFillStyle]}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Slider Handle */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.sliderHandle,
              animatedSliderStyle,
              animatedHandleHeightStyle,
            ]}
          >
            <View style={styles.handleLine} />
            <View style={styles.handleCircle}>
              <Icons name="ChevronLeft" color="#000" />
              <Icons name="ChevronRight" color="#000" />
            </View>
            <View style={styles.handleLine} />
          </Animated.View>
        </GestureDetector>

        {/* Before/After Labels */}
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Animated.Text style={styles.labelText}>ÖNCESİ</Animated.Text>
          </View>
          <View style={[styles.label, styles.labelRight]}>
            <Animated.Text style={styles.labelText}>SONRASI</Animated.Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFill: {
    alignSelf: "flex-start",
  },
  afterImageContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  sliderHandle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: -2,
    width: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  handleLine: {
    width: 4,
    flex: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  handleCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  labelContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  label: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  labelRight: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  labelText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default BeforeAfterSlider;
