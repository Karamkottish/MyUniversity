import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { Appbar, Card, Chip, SegmentedButtons, Text } from "react-native-paper";

type Student = { id: number; name: string; score: number; avatar: string };

export default function LeaderboardScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState("week");

  // Example data per filter
  const weekly: Student[] = [
    { id: 1, name: "Aisha Khan", score: 98, avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Mohammed Ali", score: 95, avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Sara Ahmed", score: 94, avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  const monthly: Student[] = [
    { id: 1, name: "John Smith", score: 92, avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 2, name: "Fatima Noor", score: 91, avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "Omar Hassan", score: 90, avatar: "https://i.pravatar.cc/150?img=6" },
  ];

  const allTime: Student[] = [
    { id: 1, name: "Layla Hussein", score: 99, avatar: "https://i.pravatar.cc/150?img=7" },
    { id: 2, name: "David Johnson", score: 97, avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 3, name: "Zara Malik", score: 96, avatar: "https://i.pravatar.cc/150?img=9" },
  ];

  let students: Student[] = weekly;
  if (filter === "month") students = monthly;
  if (filter === "all") students = allTime;

  const renderItem = ({ item, index }: { item: Student; index: number }) => {
    let rankColor = "#9E9E9E";
    if (index === 0) rankColor = "#FFD700";
    if (index === 1) rankColor = "#C0C0C0";
    if (index === 2) rankColor = "#CD7F32";

    return (
      <Card style={[styles.card, index < 3 && styles.topCard]}>
        <Card.Content style={styles.row}>
          <Chip
            style={[styles.rankChip, { backgroundColor: rankColor }]}
            textStyle={{ color: "white", fontWeight: "bold" }}
          >
            #{index + 1}
          </Chip>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>Score: {item.score}</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header mode="center-aligned" style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Leaderboard" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {/* Filter Toggle */}
      <View style={styles.filterRow}>
        <SegmentedButtons
          value={filter}
          onValueChange={setFilter}
          buttons={[
            { value: "week", label: "This Week" },
            { value: "month", label: "This Month" },
            { value: "all", label: "All Time" },
          ]}
        />
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  appbar: {
    backgroundColor: "#6200EE",
    elevation: 0,
  },
  appbarTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  filterRow: {
    padding: 12,
    backgroundColor: "#fff",
  },

  card: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  topCard: {
    borderWidth: 2,
    borderColor: "#EEE",
  },

  row: { flexDirection: "row", alignItems: "center", padding: 4 },
  rankChip: {
    marginRight: 12,
    borderRadius: 20,
    minWidth: 50,
    justifyContent: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#EEE",
    marginRight: 12,
  },
  info: { flex: 1 },
  name: { fontWeight: "600", fontSize: 16, color: "#1D1B20" },
  score: { fontSize: 14, color: "#666" },
});
