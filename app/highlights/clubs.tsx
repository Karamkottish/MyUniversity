import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar, Button, Card } from "react-native-paper";

export default function ClubsScreen() {
  const router = useRouter();

  const [joinedClubs, setJoinedClubs] = useState<number[]>([]);

  const toggleJoin = (id: number) => {
    setJoinedClubs((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const clubs = [
    {
      id: 1,
      name: "Coding Club",
      desc: "Sharpen your coding skills with weekly challenges & hackathons.",
      icon: "laptop-code",
      color: "#42A5F5",
    },
    {
      id: 2,
      name: "Debate Society",
      desc: "Practice public speaking, debate, and critical thinking.",
      icon: "account-voice",
      color: "#8E24AA",
    },
    {
      id: 3,
      name: "Photography Club",
      desc: "Capture moments with creative campus photo walks.",
      icon: "camera",
      color: "#FF7043",
    },
    {
      id: 4,
      name: "Music Club",
      desc: "Jam, perform, and share your passion for music.",
      icon: "music",
      color: "#EF5350",
    },
    {
      id: 5,
      name: "Drama & Theatre",
      desc: "Explore acting, stage design, and performance arts.",
      icon: "drama-masks",
      color: "#FFA726",
    },
    {
      id: 6,
      name: "Robotics Club",
      desc: "Build and program robots for competitions.",
      icon: "robot",
      color: "#26C6DA",
    },
    {
      id: 7,
      name: "Sports Club",
      desc: "Join teams, tournaments, and fitness challenges.",
      icon: "basketball",
      color: "#66BB6A",
    },
  ];

  return (
    <>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => router.back()} />
        <Appbar.Content title="Clubs" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        {clubs.map((c) => {
          const isJoined = joinedClubs.includes(c.id);

          return (
            <Card
              key={c.id}
              style={styles.card}
              onPress={() => router.push(`/clubs/${c.id}` as any)}
            >
              <Card.Title
                title={c.name}
                titleStyle={styles.title}
                subtitle={c.desc}
                subtitleStyle={styles.subtitle}
                subtitleNumberOfLines={2}
                left={(props) => (
                  <MaterialCommunityIcons
                    name={c.icon as any}
                    size={36}
                    color={c.color}
                    style={{ marginRight: 12 }}
                  />
                )}
              />
              <Card.Actions>
                <Button
                  mode={isJoined ? "outlined" : "contained"}
                  textColor={isJoined ? c.color : "white"}
                  buttonColor={isJoined ? "white" : c.color}
                  style={styles.joinButton}
                  onPress={() => toggleJoin(c.id)}
                >
                  {isJoined ? "Leave Club" : "Join Club"}
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 12 },
  appbar: { backgroundColor: "#6200EE", elevation: 0 },
  appbarTitle: { color: "white", fontWeight: "bold", fontSize: 20 },
  card: {
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  title: { fontWeight: "bold", fontSize: 18, color: "#212121" }, // darker
  subtitle: { fontSize: 14, color: "#424242" }, // darker
  joinButton: { borderRadius: 10 },
});
