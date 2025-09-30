import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, RadioButton, Text } from "react-native-paper";

export default function Language() {
  const [lang, setLang] = useState("en");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#039BE5", "#29B6F6", "#81D4FA"]}
        style={styles.header}
      >
        <Text variant="headlineMedium" style={styles.headerText}>
          🌐 Language
        </Text>
      </LinearGradient>

      <Card style={styles.card} mode="elevated">
        <RadioButton.Group onValueChange={setLang} value={lang}>
          <RadioButton.Item label="English" value="en" />
          <RadioButton.Item label="Arabic" value="ar" />
          <RadioButton.Item label="French" value="fr" />
        </RadioButton.Group>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },
  headerText: { color: "white", fontWeight: "bold" },
  card: { margin: 16, borderRadius: 20 },
});
