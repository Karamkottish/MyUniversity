import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function ClubsCard() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/highlights/clubs")}>
      <LinearGradient colors={["#42A5F5", "#1E88E5"]} style={styles.card}>
        <MaterialCommunityIcons name="account-group" size={40} color="white" />
        <Text style={styles.title}>Clubs</Text>
        <Text style={styles.subtitle}>Join your favorite club</Text>
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
