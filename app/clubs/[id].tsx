import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Divider,
    List,
    Text,
} from "react-native-paper";

type ClubEvent = { id: number; title: string; date: string };
type ClubMember = { id: number; name: string; avatar: string };

export default function ClubDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const clubs: any = {
    1: {
      name: "Coding Club",
      desc: "Sharpen your coding skills with hackathons, challenges, and workshops.",
      color: "#42A5F5",
      events: [
        { id: 1, title: "Hackathon 2025", date: "March 10, 2025" },
        { id: 2, title: "AI Workshop", date: "April 5, 2025" },
      ],
      members: [
        { id: 1, name: "Aisha", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Mohammed", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, name: "Sara", avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    2: {
      name: "Debate Society",
      desc: "Improve your public speaking, argumentation, and critical thinking.",
      color: "#8E24AA",
      events: [{ id: 1, title: "Inter-University Debate", date: "March 15, 2025" }],
      members: [
        { id: 1, name: "John", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: 2, name: "Fatima", avatar: "https://i.pravatar.cc/150?img=5" },
      ],
    },
  };

  const club =
    clubs[id as keyof typeof clubs] || {
      name: "Club",
      desc: "Details coming soon.",
      color: "#6200EE",
      events: [],
      members: [],
    };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={[styles.appbar, { backgroundColor: club.color }]}>
        <Appbar.BackAction color="white" onPress={() => router.back()} />
        <Appbar.Content title={club.name} titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Club Info */}
        <Card style={[styles.infoCard, { backgroundColor: club.color + "20" }]} mode="elevated">
          <Card.Content>
            <Text style={styles.clubTitle}>{club.name}</Text>
            <Text style={styles.clubDesc}>{club.desc}</Text>
          </Card.Content>
        </Card>

        {/* Events */}
        <Text style={styles.sectionTitle}>📅 Upcoming Events</Text>
        {club.events.length > 0 ? (
          club.events.map((event: ClubEvent) => (
            <Card key={event.id} style={styles.eventCard}>
              <Card.Title
                title={event.title}
                titleStyle={styles.eventTitle}
                subtitle={event.date}
                subtitleStyle={styles.eventSubtitle}
                left={(props) => <Avatar.Icon {...props} icon="calendar" color="white" style={{ backgroundColor: club.color }} />}
              />
            </Card>
          ))
        ) : (
          <Text style={styles.emptyText}>No upcoming events</Text>
        )}

        <Divider style={{ marginVertical: 20 }} />

        {/* Members */}
        <Text style={styles.sectionTitle}>👥 Members</Text>
        {club.members.length > 0 ? (
          club.members.map((member: ClubMember) => (
            <List.Item
              key={member.id}
              title={member.name}
              titleStyle={styles.memberName}
              left={() => (
                <Avatar.Image size={40} source={{ uri: member.avatar }} />
              )}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No members listed</Text>
        )}

        {/* Join Button */}
        <Button
          mode="contained"
          style={[styles.joinButton, { backgroundColor: club.color }]}
          onPress={() => alert(`Joined ${club.name}`)}
        >
          Join Club
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  appbar: { elevation: 0 },
  appbarTitle: { color: "white", fontWeight: "bold" },

  infoCard: {
    marginBottom: 20,
    borderRadius: 20,
  },
  clubTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#212121", // darker
  },
  clubDesc: {
    fontSize: 16,
    color: "#424242", // darker
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1D1B20",
  },
  eventCard: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    elevation: 2,
  },
  eventTitle: { fontWeight: "bold", fontSize: 16, color: "#212121" },
  eventSubtitle: { fontSize: 14, color: "#555" },

  emptyText: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
    marginBottom: 10,
  },
  memberName: { fontSize: 16, color: "#212121" },

  joinButton: { marginTop: 20, borderRadius: 12, paddingVertical: 6 },
});
