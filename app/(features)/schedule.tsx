import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";

export default function ScheduleScreen() {
  const router = useRouter();

  // 📚 Fall 2024 – 2025 Timetable (IT – Software Specialization)
  const timetable = [
    {
      day: "Sunday",
      classes: [
        { course: "Mobile App Development", time: "10:00 AM – 11:30 AM", room: "Room 204" },
        { course: "Database Systems", time: "1:00 PM – 2:30 PM", room: "Lab 3" },
      ],
    },
    {
      day: "Monday",
      classes: [
        { course: "Artificial Intelligence Fundamentals", time: "9:00 AM – 10:30 AM", room: "Room 305" },
        { course: "Operating Systems", time: "12:00 PM – 1:30 PM", room: "Room 210" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { course: "Software Engineering", time: "11:00 AM – 12:30 PM", room: "Room 101" },
        { course: "Computer Networks", time: "2:00 PM – 3:30 PM", room: "Room 312" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { course: "Compiler Design", time: "9:30 AM – 11:00 AM", room: "Room 206" },
        { course: "Cloud Computing", time: "1:00 PM – 2:30 PM", room: "Room 220" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { course: "Machine Learning", time: "10:00 AM – 11:30 AM", room: "Room 108" },
        { course: "Capstone Project", time: "1:00 PM – 3:00 PM", room: "Innovation Lab" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => router.back()} />
        <Appbar.Content title="📅 Weekly Schedule" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {/* Timetable */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {timetable.map((day, index) => (
          <Card key={index} style={styles.dayCard} mode="elevated">
            <Card.Title
              title={day.day}
              titleStyle={styles.dayTitle}
              left={(props) => (
                <Text {...props} style={styles.dayEmoji}>
                  📘
                </Text>
              )}
            />
            <Card.Content>
              {day.classes.map((c, idx) => (
                <View key={idx} style={styles.classBox}>
                  <Text style={styles.course}>{c.course}</Text>
                  <Text style={styles.details}>{c.time}</Text>
                  <Text style={styles.details}>{c.room}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  // Appbar
  appbar: { backgroundColor: "#6200EE", elevation: 0 },
  appbarTitle: { color: "white", fontWeight: "bold", fontSize: 20 },

  // Day Card
  dayCard: { marginBottom: 16, borderRadius: 18, backgroundColor: "white", elevation: 3 },
  dayTitle: { fontWeight: "bold", fontSize: 18, color: "#1D1B20" },
  dayEmoji: { fontSize: 22, marginRight: 12 },

  // Class Info
  classBox: { marginBottom: 12, paddingLeft: 8, borderLeftWidth: 3, borderLeftColor: "#6200EE" },
  course: { fontSize: 16, fontWeight: "600", color: "#212121" },
  details: { fontSize: 14, color: "#555" },
});
