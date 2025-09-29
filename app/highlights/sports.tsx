import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Divider, Text } from "react-native-paper";

type SportEvent = {
  id: number;
  event: string;
  time: string;
  place: string;
  icon: string;
  color: string;
};

export default function SportsScreen() {
  const router = useRouter();
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const toggleJoin = (id: number) => {
    setJoinedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const sports: SportEvent[] = [
    {
      id: 1,
      event: "Basketball Finals",
      time: "Friday 6:00 PM",
      place: "Sports Complex",
      icon: "basketball",
      color: "#FB8C00",
    },
    {
      id: 2,
      event: "Football Match",
      time: "Sunday 4:00 PM",
      place: "Main Stadium",
      icon: "soccer",
      color: "#1E88E5",
    },
    {
      id: 3,
      event: "Tennis Tournament",
      time: "Monday 3:00 PM",
      place: "Court 2",
      icon: "tennis",
      color: "#43A047",
    },
    {
      id: 4,
      event: "Volleyball League",
      time: "Wednesday 5:00 PM",
      place: "Gym Hall",
      icon: "volleyball",
      color: "#8E24AA",
    },
    {
      id: 5,
      event: "Swimming Gala",
      time: "Thursday 2:00 PM",
      place: "Aquatic Center",
      icon: "swim",
      color: "#00ACC1",
    },
    {
      id: 6,
      event: "Cricket Friendly",
      time: "Saturday 10:00 AM",
      place: "Cricket Ground",
      icon: "cricket",
      color: "#FDD835",
    },
    {
      id: 7,
      event: "E-Sports Championship",
      time: "Saturday 8:00 PM",
      place: "Auditorium",
      icon: "gamepad-variant",
      color: "#D81B60",
    },
  ];

  const myEvents = sports.filter((s) => joinedEvents.includes(s.id));

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => router.back()} />
        <Appbar.Content title="Sports" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {/* Sports Events */}
        {sports.map((s) => {
          const isJoined = joinedEvents.includes(s.id);
          return (
            <Card key={s.id} style={styles.card} mode="elevated">
              <Card.Title
                title={s.event}
                titleStyle={styles.title}
                subtitle={s.time}
                subtitleStyle={styles.subtitle}
                left={() => (
                  <MaterialCommunityIcons
                    name={s.icon as any}
                    size={36}
                    color={s.color}
                    style={{ marginRight: 8 }}
                  />
                )}
              />
              <Card.Content>
                <Text style={styles.place}>{s.place}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode={isJoined ? "outlined" : "contained"}
                  textColor={isJoined ? s.color : "white"}
                  buttonColor={isJoined ? "white" : s.color}
                  style={styles.joinButton}
                  onPress={() => toggleJoin(s.id)}
                >
                  {isJoined ? "Leave Event" : "Join Event"}
                </Button>
              </Card.Actions>
            </Card>
          );
        })}

        {/* My Events Section */}
        <Divider style={{ marginVertical: 20 }} />
        <Text style={styles.sectionTitle}>🏆 My Events</Text>

        {myEvents.length > 0 ? (
          myEvents.map((s) => (
            <Card key={s.id} style={styles.myEventCard}>
              <Card.Title
                title={s.event}
                subtitle={`${s.time} • ${s.place}`}
                left={() => (
                  <MaterialCommunityIcons
                    name={s.icon as any}
                    size={32}
                    color={s.color}
                  />
                )}
              />
            </Card>
          ))
        ) : (
          <Text style={styles.emptyText}>
            You haven’t joined any events yet.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  // App Bar
  appbar: { backgroundColor: "#6200EE", elevation: 0 },
  appbarTitle: { color: "white", fontWeight: "bold", fontSize: 20 },

  // Cards
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  title: { fontWeight: "bold", fontSize: 18, color: "#212121" },
  subtitle: { fontSize: 14, color: "#555" },
  place: { fontSize: 15, color: "#424242", marginTop: 4 },
  joinButton: { borderRadius: 10 },

  // My Events Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1D1B20",
  },
  myEventCard: {
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: "#F1F5FB",
  },
  emptyText: { fontSize: 15, color: "#777", fontStyle: "italic" },
});
