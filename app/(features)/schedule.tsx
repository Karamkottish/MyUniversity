import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";

type ClassItem = {
  day: string;
  subject: string;
  time: string;
  room: string;
  colors: [string, string];
};

export default function ScheduleScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height; // detect orientation

  const classes: ClassItem[] = [
    { day: "Monday", subject: "Mobile App Development", time: "10:00 AM - 11:30 AM", room: "Room 201", colors: ["#42A5F5", "#1E88E5"] },
    { day: "Monday", subject: "Database Systems", time: "12:00 PM - 1:30 PM", room: "Room 105", colors: ["#66BB6A", "#2E7D32"] },
    { day: "Tuesday", subject: "Operating Systems", time: "09:00 AM - 10:30 AM", room: "Room 110", colors: ["#FF7043", "#E64A19"] },
    { day: "Tuesday", subject: "Computer Networks", time: "11:00 AM - 12:30 PM", room: "Room 210", colors: ["#29B6F6", "#0288D1"] },
    { day: "Wednesday", subject: "Software Engineering", time: "10:00 AM - 11:30 AM", room: "Room 305", colors: ["#AB47BC", "#6A1B9A"] },
    { day: "Thursday", subject: "Artificial Intelligence", time: "09:00 AM - 10:30 AM", room: "Room 220", colors: ["#EC407A", "#AD1457"] },
    { day: "Thursday", subject: "Web Development", time: "11:00 AM - 12:30 PM", room: "Room 115", colors: ["#FFA726", "#FB8C00"] },
  ];

  // Group by day
  const grouped = classes.reduce<Record<string, ClassItem[]>>((acc, cls) => {
    if (!acc[cls.day]) acc[cls.day] = [];
    acc[cls.day].push(cls);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        📅 Semester Schedule
      </Text>
      <Text style={styles.subtitle}>
        Information Technology - Software Specialization
      </Text>

      {Object.keys(grouped).map((day) => (
        <View key={day} style={styles.daySection}>
          <Text style={styles.dayTitle}>{day}</Text>
          <View style={[styles.cardRow, isLandscape && { flexDirection: "row", flexWrap: "wrap" }]}>
            {grouped[day].map((cls, idx) => (
              <LinearGradient
                key={idx}
                colors={cls.colors}
                style={[styles.card, isLandscape && styles.landscapeCard]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.subject}>{cls.subject}</Text>
                <Text style={styles.details}>{cls.time}</Text>
                <Text style={styles.room}>{cls.room}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>
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
  daySection: { marginBottom: 24 },
  dayTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  cardRow: { flexDirection: "column" },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  landscapeCard: {
    width: "48%", // two cards per row in landscape
    marginRight: "4%",
  },
  subject: { fontSize: 18, fontWeight: "700", color: "white", marginBottom: 6 },
  details: { fontSize: 14, color: "white", marginBottom: 2 },
  room: { fontSize: 13, color: "white", opacity: 0.9 },
});
