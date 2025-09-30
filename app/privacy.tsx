import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, List, Switch, Text } from "react-native-paper";

export default function Privacy() {
  const [shareProfile, setShareProfile] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#43A047", "#66BB6A", "#A5D6A7"]}
        style={styles.header}
      >
        <Text variant="headlineMedium" style={styles.headerText}>
          🛡 Privacy Settings
        </Text>
      </LinearGradient>

      <Card style={styles.card} mode="elevated">
        <List.Item
          title="Share my profile with classmates"
          right={() => (
            <Switch value={shareProfile} onValueChange={setShareProfile} />
          )}
        />
        <List.Item
          title="Allow anonymous data collection"
          right={() => (
            <Switch value={dataCollection} onValueChange={setDataCollection} />
          )}
        />
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
