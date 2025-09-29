import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function EventsCard() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.card]}>
        <LinearGradient colors={["#AB47BC", "#6A1B9A"]} style={styles.gradient}>
          <MaterialCommunityIcons name="ticket" size={28} color="white" />
          <Text style={styles.text}>Events</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    margin: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  gradient: {
    width: 150,
    height: 90,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "white", marginTop: 6, fontWeight: "600" },
});
