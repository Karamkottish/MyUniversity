import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Badge, Card, ProgressBar, Text } from "react-native-paper";
import {
    ClubsCard,
    LeaderboardCard,
    LibraryCard,
    SportsCard,
} from "../../components/highlights";
import QuickActionsRow from "../../components/QuickActionsRow";

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const upcomingClasses = [
    { subject: "Software Engineering", time: "10:00 AM", room: "Room 204" },
    { subject: "Database Systems", time: "12:00 PM", room: "Lab 3" },
    { subject: "AI Fundamentals", time: "2:00 PM", room: "Room 305" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.headerBox, { opacity: fadeAnim }]}>
        <View style={styles.headerTopRow}>
          {/* Profile Avatar */}
          <Image
            source={{ uri: "https://via.placeholder.com/60" }}
            style={styles.avatar}
          />

          {/* Notification Bell */}
          <Pressable
            style={styles.bellWrapper}
            onPress={() => router.push("/notifications")}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={28}
              color="white"
            />
            <Badge style={styles.badge}>3</Badge>
          </Pressable>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>👋 Welcome back, Karam!</Text>
        <Text style={styles.subGreeting}>Here’s what’s happening today</Text>
      </Animated.View>

      {/* Today’s Progress */}
      <Text variant="headlineMedium" style={styles.sectionTitle}>
        📊 Today’s Progress
      </Text>
      <Card style={styles.progressCard}>
        <Card.Content>
          <Text style={styles.progressLabel}>Attendance 85%</Text>
          <ProgressBar
            progress={0.85}
            color="#42A5F5"
            style={styles.progressBar}
          />

          <Text style={styles.progressLabel}>Assignments Completed 60%</Text>
          <ProgressBar
            progress={0.6}
            color="#66BB6A"
            style={styles.progressBar}
          />

          <Text style={styles.progressLabel}>GPA Trend 3.4 / 4.0</Text>
          <ProgressBar
            progress={0.85}
            color="#AB47BC"
            style={styles.progressBar}
          />
        </Card.Content>
      </Card>

      {/* Campus Highlights */}
      <Text variant="headlineMedium" style={styles.sectionTitle}>
        🌟 Campus Highlights
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.highlightsRow}
      >
        <LeaderboardCard />
        <ClubsCard />
        <SportsCard />
        <LibraryCard />
      </ScrollView>

      {/* Quick Actions */}
      <Text variant="headlineMedium" style={styles.sectionTitle}>
        ⚡ Quick Actions
      </Text>
      <QuickActionsRow />

      {/* Upcoming Classes */}
      <Text variant="headlineMedium" style={styles.sectionTitle}>
        📅 Upcoming Classes
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {upcomingClasses.map((c, idx) => (
          <View key={idx} style={styles.classCard}>
            <Text style={styles.classSubject}>{c.subject}</Text>
            <Text style={styles.classInfo}>{c.time}</Text>
            <Text style={styles.classInfo}>{c.room}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Announcements */}
      <Text variant="headlineMedium" style={styles.sectionTitle}>
        📢 Announcements
      </Text>
      <View style={[styles.announcementCard, { backgroundColor: "#FFF3E0" }]}>
        <Text style={styles.announcementTitle}>🏀 Basketball Finals!</Text>
        <Text style={styles.announcementText}>
          Don’t miss the inter-college championship game. Starts 6:00 PM at the
          sports complex.
        </Text>
      </View>

      <View style={[styles.announcementCard, { backgroundColor: "#E3F2FD" }]}>
        <Text style={styles.announcementTitle}>📚 New Library E-Resources</Text>
        <Text style={styles.announcementText}>
          Explore 500+ new digital textbooks available now in the Library
          section of the app.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 16 },

  // Header
  headerBox: {
    backgroundColor: "#42A5F5",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
  },
  bellWrapper: { position: "relative" },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF5252",
    color: "white",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  subGreeting: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    marginTop: 4,
  },

  // Progress
  progressCard: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 4,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1D1B20",
  },

  highlightsRow: { marginBottom: 24 },

  // Upcoming Classes
  classCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: 180,
  },
  classSubject: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  classInfo: { fontSize: 14, color: "#666" },

  // Announcements
  announcementCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  announcementTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  announcementText: { fontSize: 14, color: "#555" },
});
