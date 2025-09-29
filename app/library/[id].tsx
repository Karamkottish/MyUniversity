import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Appbar,
    Button,
    Card,
    Divider,
    IconButton,
    List,
    Searchbar,
    Text,
} from "react-native-paper";

export default function LibraryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const resources: any = {
    1: {
      title: "Digital Library",
      desc: "Access e-books, e-journals, and online learning resources 24/7.",
      icon: "laptop",
      color: "#42A5F5",
      books: [
        "Clean Code - Robert C. Martin",
        "The Pragmatic Programmer - Andrew Hunt",
        "Design Patterns - Erich Gamma",
        "Code Complete - Steve McConnell",
        "Refactoring - Martin Fowler",
        "Head First Design Patterns - Eric Freeman",
        "Effective Java - Joshua Bloch",
        "Introduction to Algorithms - Cormen, Leiserson, Rivest, Stein",
        "Artificial Intelligence: A Modern Approach - Russell & Norvig",
        "Operating System Concepts - Silberschatz",
        "Database System Concepts - Silberschatz, Korth, Sudarshan",
        "Computer Networking - Kurose & Ross",
        "Programming Pearls - Jon Bentley",
        "JavaScript: The Good Parts - Douglas Crockford",
        "You Don’t Know JS - Kyle Simpson",
        "Learning React - Alex Banks",
        "Python Crash Course - Eric Matthes",
        "Fluent Python - Luciano Ramalho",
        "Deep Learning - Ian Goodfellow",
        "Hands-On Machine Learning - Aurélien Géron",
        "Data Science from Scratch - Joel Grus",
        "Compilers: Principles, Techniques, and Tools - Aho & Ullman",
        "Agile Estimating and Planning - Mike Cohn",
        "Continuous Delivery - Jez Humble",
        "Kubernetes Up & Running - Brendan Burns",
        "Docker Deep Dive - Nigel Poulton",
        "Cloud Native Architecture - Cornelia Davis",
        "Distributed Systems - Maarten van Steen",
        "Software Engineering - Ian Sommerville",
        "The Mythical Man-Month - Fred Brooks",
      ],
    },
    2: {
      title: "Research Journals",
      desc: "Find peer-reviewed papers and research articles.",
      icon: "book-open-page-variant",
      color: "#8E24AA",
    },
    3: {
      title: "Library Hours",
      desc: "Mon–Fri: 8 AM – 8 PM\nSat: 9 AM – 5 PM\nClosed on Sundays & holidays.",
      icon: "clock-outline",
      color: "#FB8C00",
    },
  };

  const resource = resources[id as keyof typeof resources] || {
    title: "Resource",
    desc: "Details coming soon.",
    icon: "book",
    color: "#757575",
    books: [],
  };

  // 🔹 States
  const [showAll, setShowAll] = useState(false);
  const [borrowed, setBorrowed] = useState<{ [key: string]: boolean }>({});
  const [query, setQuery] = useState("");

  const toggleBorrow = (book: string) => {
    setBorrowed((prev) => ({ ...prev, [book]: !prev[book] }));
  };

  // 🔎 Filter logic
  const filteredBooks = resource.books.filter((book: string) =>
    book.toLowerCase().includes(query.toLowerCase())
  );

  const displayedBooks = showAll ? filteredBooks : filteredBooks.slice(0, 8);
  const borrowedBooks = Object.keys(borrowed).filter((b) => borrowed[b]);

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => router.back()} />
        <Appbar.Content title={resource.title} titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Resource description */}
        <Text style={styles.title}>{resource.title}</Text>
        <Text style={styles.desc}>{resource.desc}</Text>

        {/* Borrowed Books Section */}
        {borrowedBooks.length > 0 && (
          <Card style={styles.borrowedCard} mode="elevated">
            <Card.Title
              title="📖 Borrowed Books"
              titleStyle={styles.sectionTitle}
            />
            {borrowedBooks.map((book, idx) => (
              <List.Item
                key={idx}
                title={book}
                titleStyle={{ fontSize: 15, color: "#2E7D32" }}
                left={() => (
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={22}
                    color="#2E7D32"
                  />
                )}
                right={() => (
                  <Button
                    mode="text"
                    textColor="#D32F2F"
                    onPress={() => toggleBorrow(book)}
                  >
                    Return
                  </Button>
                )}
              />
            ))}
          </Card>
        )}

        {/* Show IT Books if Digital Library */}
        {resource.books && resource.books.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>📚 Featured IT Books</Text>

            {/* 🔎 Searchbar */}
            <Searchbar
              placeholder="Search books..."
              value={query}
              onChangeText={setQuery}
              style={styles.searchbar}
              inputStyle={{ fontSize: 15 }}
            />

            {displayedBooks.map((book: string, index: number) => (
              <List.Item
                key={index}
                title={book}
                titleStyle={[
                  styles.bookTitle,
                  borrowed[book] && {
                    color: "#388E3C",
                    textDecorationLine: "line-through",
                  },
                ]}
                left={() => (
                  <MaterialCommunityIcons
                    name="book-outline"
                    size={24}
                    color={borrowed[book] ? "#388E3C" : "#6200EE"}
                  />
                )}
                right={() => (
                  <IconButton
                    icon={borrowed[book] ? "check-circle" : "book-plus"}
                    iconColor={borrowed[book] ? "#388E3C" : "#6200EE"}
                    onPress={() => toggleBorrow(book)}
                  />
                )}
              />
            ))}

            {/* Show More / Less */}
            {filteredBooks.length > 8 && (
              <Button
                onPress={() => setShowAll(!showAll)}
                style={styles.showMoreBtn}
                textColor="#6200EE"
              >
                {showAll ? "Show Less" : "Show More"}
              </Button>
            )}

            <Divider style={{ marginVertical: 20 }} />
          </>
        )}

        {/* Action Button */}
        <Button
          mode="contained"
          style={styles.actionButton}
          onPress={() =>
            alert(
              resource.title === "Study Rooms"
                ? "Study room reserved!"
                : `Accessing ${resource.title}...`
            )
          }
        >
          {resource.title === "Study Rooms" ? "Reserve Room" : "Use Resource"}
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  appbar: { backgroundColor: "#6200EE", elevation: 0 },
  appbarTitle: { color: "white", fontWeight: "bold" },
  content: { padding: 16 },

  // Texts
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1C1B1F",
    marginBottom: 6,
  },
  desc: { fontSize: 16, color: "#2C2C2C", marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1C1B1F",
  },
  bookTitle: { fontSize: 15, color: "#2C2C2C" },

  // Borrowed
  borrowedCard: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#F1F8E9",
  },

  // Searchbar
  searchbar: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 2,
  },

  // Buttons
  actionButton: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 6,
    backgroundColor: "#6200EE",
  },
  showMoreBtn: {
    marginTop: 6,
    borderRadius: 8,
    alignSelf: "center",
  },
});
