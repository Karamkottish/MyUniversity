import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function News() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>📰 Campus News</Text>
      <Card style={styles.card}>
        <Card.Title title="Hackathon 2025" />
        <Card.Content><Text>Join the coding challenge on Oct 6th!</Text></Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Guest Lecture" />
        <Card.Content><Text>AI in Education – Dr. Jamal, Sept 30</Text></Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F8F9FA" },
  title: { textAlign: "center", marginBottom: 16, color: "#1D1B20" },
  card: { marginBottom: 12, borderRadius: 16 }
});
