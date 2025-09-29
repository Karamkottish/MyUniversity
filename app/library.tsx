import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Chip, Searchbar, Text } from "react-native-paper";

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const books = [
    { title: "Introduction to AI", category: "Technology", status: "Available" },
    { title: "Database Systems Concepts", category: "Computer Science", status: "Borrowed" },
    { title: "Modern UI/UX Design", category: "Design", status: "Available" },
    { title: "Advanced Algorithms", category: "Computer Science", status: "Reserved" },
  ];

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>📚 Library</Text>
      <Text style={styles.subtitle}>Search and explore resources</Text>

      {/* 🔍 Search */}
      <Searchbar
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
      />

      {/* 📖 Book List */}
      {filteredBooks.map((book, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.bookTitle}>
              {book.title}
            </Text>
            <Text style={styles.category}>{book.category}</Text>
            <Chip
              style={[
                styles.chip,
                book.status === "Available" && { backgroundColor: "#66BB6A" },
                book.status === "Borrowed" && { backgroundColor: "#42A5F5" },
                book.status === "Reserved" && { backgroundColor: "#EF5350" },
              ]}
              textStyle={{ color: "white", fontWeight: "600" }}
            >
              {book.status}
            </Chip>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 16 },
  header: { textAlign: "center", fontWeight: "bold", marginBottom: 6, color: "#1D1B20" },
  subtitle: { textAlign: "center", marginBottom: 16, fontSize: 16, color: "#555" },
  search: { marginBottom: 20, borderRadius: 12 },
  card: { marginBottom: 12, borderRadius: 16, backgroundColor: "white", elevation: 3 },
  bookTitle: { fontWeight: "600", marginBottom: 6 },
  category: { fontSize: 14, color: "#666", marginBottom: 8 },
  chip: { alignSelf: "flex-start", borderRadius: 8, paddingHorizontal: 6, marginTop: 4 },
});
