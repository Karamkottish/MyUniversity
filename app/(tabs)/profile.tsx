// app/(tabs)/profile.tsx
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

export default function Profile() {
  const [visible, setVisible] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Example profile data (locked by admin)
  const profile = {
    firstName: "Karam",
    lastName: "K",
    major: "Computer Science",
    year: "Year 3",
  };

  const [email, setEmail] = useState("karam@example.com");
  const [phone, setPhone] = useState("+123456789");
  const [bio, setBio] = useState("Passionate about mobile app development.");

  // 📸 Pick Image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <LinearGradient colors={["#6200EE", "#3700B3"]} style={styles.header}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.avatarImg} />
        ) : (
          <Avatar.Text size={90} label="KK" style={styles.avatar} />
        )}
        <Text variant="headlineMedium" style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text variant="titleSmall" style={styles.role}>
          {profile.major} • {profile.year}
        </Text>
      </LinearGradient>

      {/* About Me Card */}
      <Card style={styles.card}>
        <LinearGradient
          colors={["#FF6F61", "#FF8A65", "#FFD54F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Card.Content>
            <Text style={styles.sectionTitle}>📌 About Me</Text>
            <Text style={styles.aboutText}>{bio}</Text>

            <Button
              mode="contained"
              style={styles.btn}
              labelStyle={{ fontWeight: "600", color: "#fff" }}
              onPress={() => setVisible(true)}
            >
              Edit Profile
            </Button>
          </Card.Content>
        </LinearGradient>
      </Card>

      {/* Modal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Edit Profile</Text>

          {/* Profile Pic */}
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.avatarImgSmall} />
          ) : (
            <Avatar.Text size={70} label="KK" style={styles.avatarSmall} />
          )}
          <Button
            mode="outlined"
            onPress={pickImage}
            style={{ marginBottom: 16, borderRadius: 12 }}
          >
            Upload Photo
          </Button>

          {/* Locked fields */}
          <TextInput label="First Name" value={profile.firstName} disabled style={styles.input} />
          <TextInput label="Last Name" value={profile.lastName} disabled style={styles.input} />
          <TextInput label="Major" value={profile.major} disabled style={styles.input} />
          <TextInput label="Year" value={profile.year} disabled style={styles.input} />

          {/* Editable */}
          <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput label="Phone" value={phone} onChangeText={setPhone} style={styles.input} />
          <TextInput label="Bio" value={bio} onChangeText={setBio} style={styles.input} multiline />

          <Button
            mode="contained"
            onPress={() => {
              setVisible(false);
              alert("Profile updated!");
            }}
            style={styles.saveBtn}
            labelStyle={{ color: "#fff", fontWeight: "600" }}
          >
            Save Changes
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },

  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatar: { backgroundColor: "rgba(255,255,255,0.2)", marginBottom: 12 },
  avatarImg: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  name: { color: "white", fontWeight: "bold" },
  role: { color: "rgba(255,255,255,0.9)" },

  card: { marginHorizontal: 16, borderRadius: 20, marginBottom: 16 },
  gradient: { padding: 16, borderRadius: 20 },

  sectionTitle: { fontWeight: "bold", marginBottom: 8, fontSize: 18, color: "#fff" },
  aboutText: { fontSize: 15, color: "rgba(255,255,255,0.9)", marginBottom: 16 },

  btn: { borderRadius: 12, backgroundColor: "#8E24AA", alignSelf: "flex-start" },

  modal: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16, color: "#1C1B1F" },
  input: { marginBottom: 12 },

  saveBtn: { marginTop: 10, borderRadius: 12, backgroundColor: "#03DAC5" },

  avatarImgSmall: { width: 70, height: 70, borderRadius: 35, alignSelf: "center", marginBottom: 8 },
  avatarSmall: { alignSelf: "center", marginBottom: 8, backgroundColor: "#6200EE" },
});
