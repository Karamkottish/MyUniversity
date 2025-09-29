import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, Chip, Divider, Text } from "react-native-paper";

type Event = {
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  category: "Sports" | "Club" | "Workshop" | "Ceremony";
};

export default function EventsScreen() {
  const events: Event[] = [
    {
      title: "Basketball Finals",
      date: "2025-10-02",
      time: "6:00 PM",
      location: "Main Sports Hall",
      category: "Sports",
    },
    {
      title: "AI Hackathon",
      date: "2025-10-10",
      time: "9:00 AM",
      location: "Innovation Lab",
      category: "Workshop",
    },
    {
      title: "Drama Club Performance",
      date: "2025-10-15",
      time: "7:30 PM",
      location: "Auditorium",
      category: "Club",
    },
    {
      title: "Graduation Ceremony",
      date: "2025-10-30",
      time: "5:00 PM",
      location: "Central Hall",
      category: "Ceremony",
    },
  ];

  // Calendar markings
  const markedDates = events.reduce<Record<string, any>>((acc, e) => {
    acc[e.date] = {
      marked: true,
      dotColor:
        e.category === "Sports"
          ? "#66BB6A"
          : e.category === "Workshop"
          ? "#AB47BC"
          : e.category === "Club"
          ? "#FFA726"
          : "#EF5350",
    };
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text variant="headlineMedium" style={styles.header}>
        🎉 Events
      </Text>
      <Text style={styles.subtitle}>Campus activities and upcoming events</Text>

      {/* Calendar */}
      <Calendar
        markedDates={markedDates}
        theme={{
          todayTextColor: "#42A5F5",
          selectedDayBackgroundColor: "#42A5F5",
          arrowColor: "#42A5F5",
          dotColor: "#42A5F5",
        }}
        style={styles.calendar}
      />

      {/* Featured Event */}
      <Card style={styles.featuredCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.featuredTitle}>
            ⭐ Featured Event
          </Text>
          <Text style={styles.eventTitle}>{events[0].title}</Text>
          <Text style={styles.eventDetails}>
            {events[0].date} • {events[0].time}
          </Text>
          <Text style={styles.eventDetails}>{events[0].location}</Text>
          <Chip style={[styles.chip, { backgroundColor: "#42A5F5" }]} textStyle={styles.chipText}>
            {events[0].category}
          </Chip>
        </Card.Content>
      </Card>

      <Divider style={{ marginVertical: 16 }} />

      {/* Upcoming Events */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Upcoming Events
      </Text>

      {events.slice(1).map((e, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {/* Date Badge */}
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{e.date.split("-")[2]}</Text>
              <Text style={styles.monthText}>
                {new Date(e.date).toLocaleString("en-US", { month: "short" })}
              </Text>
            </View>

            {/* Event Info */}
            <View style={styles.info}>
              <Text style={styles.eventTitle}>{e.title}</Text>
              <Text style={styles.eventDetails}>
                {e.date} • {e.time}
              </Text>
              <Text style={styles.eventDetails}>{e.location}</Text>
            </View>

            {/* Category Chip */}
            <Chip
              style={[
                styles.chip,
                e.category === "Sports" && { backgroundColor: "#66BB6A" },
                e.category === "Workshop" && { backgroundColor: "#AB47BC" },
                e.category === "Club" && { backgroundColor: "#FFA726" },
                e.category === "Ceremony" && { backgroundColor: "#EF5350" },
              ]}
              textStyle={styles.chipText}
            >
              {e.category}
            </Chip>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 16 },
  header: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
    color: "#1D1B20",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
  },
  calendar: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
  featuredCard: {
    borderRadius: 16,
    backgroundColor: "#FFF",
    elevation: 3,
    marginBottom: 12,
  },
  featuredTitle: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#1D1B20",
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
    color: "#333",
  },
  card: {
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: "white",
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateBadge: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#42A5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  monthText: {
    fontSize: 12,
    color: "white",
    textTransform: "uppercase",
  },
  info: { flex: 1, marginRight: 8 },
  eventTitle: { fontWeight: "600", fontSize: 16, marginBottom: 4 },
  eventDetails: { fontSize: 13, color: "#666" },
  chip: {
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 28,
    alignSelf: "flex-start",
  },
  chipText: { color: "white", fontWeight: "600" },
});
