import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function Courses() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>📚 My Courses</Text>
      <Card style={styles.card}>
        <Card.Title title="Mobile App Development" />
        <Card.Content><Text>Instructor: Dr. Ali</Text></Card.Content>
        <Card.Actions><Button mode="contained">Open</Button></Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Database Systems" />
        <Card.Content><Text>Instructor: Prof. Sarah</Text></Card.Content>
        <Card.Actions><Button mode="contained">Open</Button></Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F8F9FA" },
  title: { textAlign: "center", marginBottom: 16, color: "#1D1B20" },
  card: { marginBottom: 12, borderRadius: 16 }
});
