import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type Highlight = {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  colors: [string, string];
  route: "/(tabs)/home" | "/(tabs)/courses" | "/(tabs)/news" | "/(tabs)/profile";
};

const highlights: Highlight[] = [
  { title: "Leaderboard", subtitle: "Top 10 Students", icon: "trophy", colors: ["#FF9800", "#F44336"], route: "/(tabs)/courses" },
  { title: "Clubs", subtitle: "Join your favorite club", icon: "account-group", colors: ["#42A5F5", "#1E88E5"], route: "/(tabs)/news" },
  { title: "Sports", subtitle: "Basketball finals Friday", icon: "basketball", colors: ["#66BB6A", "#2E7D32"], route: "/(tabs)/news" },
  { title: "Graduation", subtitle: "Plan your big day", icon: "school", colors: ["#AB47BC", "#6A1B9A"], route: "/(tabs)/profile" },
];

function HighlightCard({ item }: { item: Highlight }) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => router.push(item.route)}
    >
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.highlightWrapper]}>
        <LinearGradient colors={item.colors} style={styles.gradientCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name={item.icon} size={40} color="white" style={styles.icon} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function HomeHighlights() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {highlights.map((item, idx) => (
        <HighlightCard key={idx} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  highlightWrapper: {
    marginRight: 16,
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  gradientCard: {
    width: 220,
    height: 140,
    borderRadius: 20,
    padding: 16,
    justifyContent: "flex-end",
  },
  icon: { marginBottom: 8 },
  title: { fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "white", opacity: 0.9 },
});
