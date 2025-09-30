import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8E24AA", "#AB47BC", "#CE93D8"]}
        style={styles.header}
      >
        <Text variant="headlineMedium" style={styles.headerText}>
          🔒 Reset Password
        </Text>
      </LinearGradient>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <TextInput
            label="Old Password"
            secureTextEntry
            value={oldPass}
            onChangeText={setOldPass}
            style={styles.input}
          />
          <TextInput
            label="New Password"
            secureTextEntry
            value={newPass}
            onChangeText={setNewPass}
            style={styles.input}
          />
          <TextInput
            label="Confirm New Password"
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
            style={styles.input}
          />

          <Button
            mode="contained"
            style={styles.btn}
            labelStyle={{ color: "#fff", fontWeight: "600" }}
            onPress={() => alert("Password Changed!")}
          >
            Update
          </Button>
        </Card.Content>
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
  input: { marginBottom: 12 },
  btn: { marginTop: 12, borderRadius: 12, backgroundColor: "#8E24AA" },
});
