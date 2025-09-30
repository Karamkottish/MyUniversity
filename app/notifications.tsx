import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Card, Chip, Text } from "react-native-paper";

type Notification = {
  id: number;
  type: "announcement" | "assignment" | "payment";
  title: string;
  message: string;
  time: string;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "announcement",
      title: "Basketball Finals Tonight 🏀",
      message: "Starts 6:00 PM at the Sports Complex.",
      time: "2h ago",
    },
    {
      id: 2,
      type: "assignment",
      title: "AI Project Report Due",
      message: "Submit before 11:59 PM via LMS.",
      time: "5h ago",
    },
    {
      id: 3,
      type: "payment",
      title: "Tuition Fee Reminder",
      message: "Your semester fee is due in 3 days.",
      time: "1d ago",
    },
    {
      id: 4,
      type: "announcement",
      title: "Library E-Resources Update",
      message: "500+ new textbooks added.",
      time: "2d ago",
    },
  ]);

  const [isRead, setIsRead] = useState(false);

  const getColor = (type: Notification["type"]) => {
    switch (type) {
      case "announcement":
        return "#42A5F5"; // blue
      case "assignment":
        return "#66BB6A"; // green
      case "payment":
        return "#EF5350"; // red
      default:
        return "#9E9E9E";
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "announcement":
        return "bullhorn";
      case "assignment":
        return "file-document";
      case "payment":
        return "credit-card";
      default:
        return "bell-outline";
    }
  };

  const handleDismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header + Mark All Button */}
      <View style={styles.headerRow}>
        <Text variant="headlineMedium" style={styles.header}>
          🔔 Notifications
        </Text>
        <Pressable onPress={() => setIsRead(true)}>
          <Text style={styles.markAll}>Mark all as read</Text>
        </Pressable>
      </View>

      {/* Notification Cards */}
      {notifications.map((n) => (
        <Swipeable
          key={n.id}
          onSwipeableOpen={() => handleDismiss(n.id)}
          renderRightActions={() => (
            <View style={styles.deleteBox}>
              <MaterialCommunityIcons name="delete" size={24} color="white" />
            </View>
          )}
        >
          <Card
            style={[
              styles.card,
              isRead && { opacity: 0.5 }, // fade if marked read
            ]}
            mode="elevated"
          >
            <Card.Content style={styles.cardContent}>
              {/* Icon Circle */}
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: getColor(n.type) },
                ]}
              >
                <MaterialCommunityIcons
                  name={getIcon(n.type)}
                  size={24}
                  color="white"
                />
              </View>

              {/* Text + Chip */}
              <View style={styles.textWrapper}>
                <Text variant="titleMedium" style={styles.title}>
                  {n.title}
                </Text>
                <Text style={styles.message}>{n.message}</Text>
                <Chip
                  style={[styles.chip, { backgroundColor: getColor(n.type) }]}
                  textStyle={{ color: "white" }}
                >
                  {n.time}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        </Swipeable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 16 },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: { fontWeight: "bold", color: "#1D1B20" },
  markAll: {
    fontSize: 14,
    color: "#42A5F5",
    fontWeight: "600",
  },

  // Cards
  card: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  cardContent: { flexDirection: "row", alignItems: "center" },

  // Icon Circle
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  textWrapper: { flex: 1 },
  title: { fontWeight: "bold", marginBottom: 4, color: "#1D1B20" },
  message: { fontSize: 14, color: "#555", marginBottom: 8 },
  chip: { alignSelf: "flex-start", borderRadius: 8 },

  // Swipe delete action
  deleteBox: {
    backgroundColor: "#EF5350",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 16,
    marginBottom: 12,
  },
});
