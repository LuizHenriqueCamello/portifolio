import React, { useRef } from 'react';
import {
  PanResponder,
  Animated,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { useRouter, useSegments } from 'expo-router';

const { width } = Dimensions.get('window');

const TELAS = [
  'index',
  'sobre',
  'academico',
  'profissional',
  'projetos',
  'jogo',
];

const SWIPE_THRESHOLD = width * 0.22;
const VELOCITY_THRESHOLD = 0.3;

interface Props {
  children: React.ReactNode;
}

export function SwipeNavigator({ children }: Props) {
  const router = useRouter();
  const segments = useSegments();

  const translateX = useRef(new Animated.Value(0)).current;
  const swipeHandled = useRef(false);

  const telaAtual = segments[segments.length - 1] ?? 'index';
  const indiceAtual = TELAS.indexOf(telaAtual);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;

        return (
          Math.abs(dx) > Math.abs(dy) * 1.5 &&
          Math.abs(dx) > 12
        );
      },

      onPanResponderGrant: () => {
        swipeHandled.current = false;
        translateX.setValue(0);
      },

      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;

        const isFirst = indiceAtual === 0;
        const isLast = indiceAtual === TELAS.length - 1;

        // Resistência nas bordas
        if ((dx > 0 && isFirst) || (dx < 0 && isLast)) {
          translateX.setValue(dx * 0.12);
        } else {
          translateX.setValue(dx * 0.2);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState;

        const swipedLeft =
          dx < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD;

        const swipedRight =
          dx > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD;

        // Próxima tela
        if (
          swipedLeft &&
          indiceAtual < TELAS.length - 1 &&
          !swipeHandled.current
        ) {
          swipeHandled.current = true;

          Animated.timing(translateX, {
            toValue: -20,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            translateX.setValue(0);

            router.replace(
              `/(tabs)/${TELAS[indiceAtual + 1]}` as any
            );
          });

          return;
        }

        // Tela anterior
        if (
          swipedRight &&
          indiceAtual > 0 &&
          !swipeHandled.current
        ) {
          swipeHandled.current = true;

          Animated.timing(translateX, {
            toValue: 20,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            translateX.setValue(0);

            router.replace(
              `/(tabs)/${TELAS[indiceAtual - 1]}` as any
            );
          });

          return;
        }

        // Volta ao normal
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }).start();
      },

      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.inner,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inner: {
    flex: 1,
  },
});