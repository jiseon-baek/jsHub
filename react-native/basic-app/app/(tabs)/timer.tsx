import { useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 100);
  };

  const onStop = () => {
    if (intervalRef.current)
      clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const onReset = () => {
    onStop();
    setTime(0);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: '#D0D0D0',
        dark: '#353636',
      }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.titleContainer}
        />
      }
    >
      <ThemedView>
        <ThemedText>
          {Math.floor(time / 10)}.{time % 10}
        </ThemedText>
        <View style={styles.flex}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={onStart}
          >
            <ThemedText>시작</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={onStop}
          >
            <ThemedText>멈춤</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={onReset}
          >
            <ThemedText>리셋</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    gap: 16,
    margin: 'auto',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 100,
    backgroundColor: '#f2f2f2',
    padding: 20,
    textAlign: 'center',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
  },
});
