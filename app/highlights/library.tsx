import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar, Card } from "react-native-paper";

export default function LibraryScreen() {
  const router = useRouter();

  const resources = [
    {
      id: 1,
      title: "Digital Library",
      desc: "Access 500+ e-books and IT resources.",
      icon: "laptop",
      color: "#42A5F5",
      route: "/library/1",
    },
    {
      id: 2,
      title: "Research Journals",
      desc: "Explore peer-reviewed papers and research articles.",
      icon: "book-open-page-variant",
      color: "#8E24AA",
      route: "/library/2",
    },
    {
      id: 3,
      title: "Library Hours",
      desc: "Mon–Fri: 8 AM – 8 PM · Sat: 9 AM – 5 PM.",
      icon: "clock-outline",
      color: "#FB8C00",
      route: "/library/3",
    },
    {
      id: 4,
      title: "Study Rooms",
      desc: "Reserve group study rooms or quiet spaces.",
      icon: "door",
      color: "#43A047",
      route: "/library/4",
    },
    {
      id: 5,
      title: "Ask a Librarian",
      desc: "Chat with our librarian assistant for quick help.",
      icon: "chat-question",
      color: "#D81B60",
      route: "/library/ask-librarian", // ✅ direct to chat screen
    },
  ];

  return (
    <>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => router.back()} />
        <Appbar.Content title="Library" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        {resources.map((r) => (
          <Card
            key={r.id}
            style={styles.card}
            onPress={() => router.push(r.route as any)}
          >
            <Card.Title
              title={r.title}
              titleStyle={styles.title}
              subtitle={r.desc}
              subtitleStyle={styles.subtitle}
              left={() => (
                <MaterialCommunityIcons
                  name={r.icon as any}
                  size={32}
                  color={r.color}
                  style={{ marginRight: 12 }}
                />
              )}
            />
          </Card>
        ))}
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
  title: { fontWeight: "bold", fontSize: 18, color: "#212121" },
  subtitle: { fontSize: 14, color: "#424242" },
});
