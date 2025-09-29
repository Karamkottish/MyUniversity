import { ScrollView, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import HomeHighlights from "../../components/HomeHighlights";
import QuickActionsRow from "../../components/QuickActionsRow";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* 🎓 Banner */}
      <Card style={styles.banner}>
        <Card.Content style={{ alignItems: "center" }}>
          <Avatar.Icon
            size={64}
            icon="school"
            style={{ backgroundColor: "#FFD54F" }}
          />
          <Text
            variant="headlineSmall"
            style={{ color: "white", marginTop: 12 }}
          >
            Welcome back, Karam 👋
          </Text>
          <Text style={{ color: "white", marginTop: 4 }}>
            Have a productive day!
          </Text>
        </Card.Content>
      </Card>

      {/* ⚡ Quick Actions */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        ⚡ Quick Actions
      </Text>
      <QuickActionsRow />

      {/* 📅 Upcoming Classes */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        📅 Upcoming Classes
      </Text>
      <Card style={styles.card}>
        <Card.Title
          title="Mobile App Development"
          subtitle="10:00 AM • Room 201"
        />
      </Card>
      <Card style={styles.card}>
        <Card.Title
          title="Database Systems"
          subtitle="12:00 PM • Room 105"
        />
      </Card>

      {/* 🌟 Campus Highlights */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        🌟 Campus Highlights
      </Text>
      <HomeHighlights />

      {/* 📢 Announcements */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        📢 Announcements
      </Text>
      <Card style={styles.outlinedCard} mode="outlined">
        <Card.Content>
          <Text>Assignment #3 due Friday – AI Project</Text>
        </Card.Content>
      </Card>
      <Card style={styles.outlinedCard} mode="outlined">
        <Card.Content>
          <Text>Library hours extended until 10 PM this week</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 16 },
  banner: {
    backgroundColor: "#6200EE",
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 16,
  },
  sectionTitle: { marginVertical: 12, fontWeight: "600", color: "#1D1B20" },
  card: { marginBottom: 12, borderRadius: 16 },
  outlinedCard: { marginBottom: 12, borderRadius: 16 },
});
