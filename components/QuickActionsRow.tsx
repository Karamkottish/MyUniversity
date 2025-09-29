import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type RoutePath =
  | "/(features)/schedule"
  | "/(features)/assignments"
  | "/(features)/payments"
  | "/(features)/events";

type QuickAction = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  colors: [string, string];
  route: RoutePath;
};

const actions: QuickAction[] = [
  {
    label: "Schedule",
    icon: "calendar",
    colors: ["#42A5F5", "#1E88E5"],
    route: "/(features)/schedule",
  },
  {
    label: "Assignments",
    icon: "file-document",
    colors: ["#FF7043", "#E64A19"],
    route: "/(features)/assignments",
  },
  {
    label: "Payments",
    icon: "credit-card",
    colors: ["#66BB6A", "#2E7D32"],
    route: "/(features)/payments",
  },
  {
    label: "Events",
    icon: "ticket",
    colors: ["#AB47BC", "#6A1B9A"],
    route: "/(features)/events",
  },
];

function QuickActionCard({ item }: { item: QuickAction }) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => router.push(item.route)}
    >
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.card]}>
        <LinearGradient colors={item.colors} style={styles.gradient}>
          <MaterialCommunityIcons name={item.icon} size={28} color="white" />
          <Text style={styles.text}>{item.label}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function QuickActionsRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {actions.map((item, idx) => (
        <QuickActionCard key={idx} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  card: {
    borderRadius: 16,
    marginHorizontal: 6,
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
