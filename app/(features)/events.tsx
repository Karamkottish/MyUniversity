import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">🎉 Events</Text>
      <Text style={styles.subtitle}>Campus activities and upcoming events</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F9FA" },
  subtitle: { marginTop: 10, fontSize: 16, color: "#555" },
});
