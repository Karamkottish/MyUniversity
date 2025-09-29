import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function LibraryCard() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/highlights/library")}>
      <LinearGradient colors={["#8E24AA", "#5E35B1"]} style={styles.card}>
        <MaterialCommunityIcons name="book-open-variant" size={40} color="white" />
        <Text style={styles.title}>Library</Text>
        <Text style={styles.subtitle}>Access e-books & journals</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 140,
    borderRadius: 20,
    padding: 16,
    justifyContent: "flex-end",
    marginRight: 12,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "white", marginTop: 8 },
  subtitle: { fontSize: 14, color: "white", opacity: 0.9 },
});
