import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Avatar.Text size={80} label="KK" style={{ backgroundColor: "#6200EE" }} />
      <Text variant="titleLarge" style={styles.name}>Karam K</Text>
      <Text variant="bodyMedium">Student • Computer Science</Text>
      <Button mode="contained" style={styles.btn}>Edit Profile</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F9FA" },
  name: { marginTop: 16, marginBottom: 4 },
  btn: { marginTop: 16, borderRadius: 12 }
});
