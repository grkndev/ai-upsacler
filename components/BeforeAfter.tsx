import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 400;

const BeforeAfterSlider = () => {
  const sliderPosition = useSharedValue(SCREEN_WIDTH / 2);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newPosition = e.absoluteX;
      if (newPosition >= 0 && newPosition <= SCREEN_WIDTH) {
        sliderPosition.value = newPosition;
      }
    })
    .onEnd(() => {
      // İsteğe bağlı: slider'ı bıraktığınızda ortaya dönmesini istiyorsanız
      // sliderPosition.value = withSpring(SCREEN_WIDTH / 2);
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Before Image (Alt katman) */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* After Image (Üst katman - kırpılmış) */}
        <Animated.View style={[styles.afterImageContainer, animatedAfterImageStyle]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800' }}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Slider Handle */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.sliderHandle, animatedSliderStyle]}>
            <View style={styles.handleLine} />
            <View style={styles.handleCircle}>
              <View style={styles.handleArrowLeft} />
              <View style={styles.handleArrowRight} />
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
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
  },
  afterImageContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
  },
  sliderHandle: {
    position: 'absolute',
    top: 0,
    left: -2,
    width: 4,
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleLine: {
    width: 4,
    flex: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  handleCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  handleArrowLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: '#333',
    marginRight: 4,
  },
  handleArrowRight: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: '#333',
    marginLeft: 4,
  },
  labelContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  label: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  labelRight: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  labelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default BeforeAfterSlider;