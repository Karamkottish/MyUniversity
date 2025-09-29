import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Avatar, Card, Chip, IconButton, Text, TextInput } from "react-native-paper";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function AskLibrarianScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "👋 Hello! I’m your librarian assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (text?: string) => {
    const finalText = text || input;
    if (!finalText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: finalText,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    // Fake AI response
    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 2,
        text: generateBotReply(newMessage.text),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1200);
  };

  const generateBotReply = (question: string) => {
    if (question.toLowerCase().includes("book")) {
      return "📚 You can search for books in the Digital Library section. Do you want me to recommend IT books?";
    }
    if (question.toLowerCase().includes("hours")) {
      return "🕒 The library is open Mon–Fri (8AM–8PM) and Sat (9AM–5PM). Closed on Sundays.";
    }
    if (question.toLowerCase().includes("research")) {
      return "🔍 You can access research journals via the 'Research Journals' section in the library resources.";
    }
    return "🤔 That’s a great question! I’ll connect you with resources in the library.";
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => router.back()} />
        <Appbar.Content title="Ask a Librarian" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageRow,
              item.sender === "user" ? styles.userRow : styles.botRow,
            ]}
          >
            {item.sender === "bot" && (
              <Avatar.Icon
                size={32}
                icon="book-open-variant"
                style={styles.botAvatar}
              />
            )}

            <Card
              style={[
                styles.messageCard,
                item.sender === "user" ? styles.userCard : styles.botCard,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "user" ? styles.userText : styles.botText,
                ]}
              >
                {item.text}
              </Text>
            </Card>

            {item.sender === "user" && (
              <Avatar.Icon size={32} icon="account" style={styles.userAvatar} />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messages}
      />

      {loading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#6200EE" />
          <Text style={styles.typingText}>Librarian is typing...</Text>
        </View>
      )}

      {/* Input + Quick Replies */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        {/* Quick Reply Chips */}
        <View style={styles.quickReplies}>
          <Chip
            mode="outlined"
            onPress={() => handleSend("📚 Show me IT books")}
            style={styles.chip}
            textStyle={{ fontSize: 13 }}
          >
            📚 IT Books
          </Chip>
          <Chip
            mode="outlined"
            onPress={() => handleSend("🕒 Library hours")}
            style={styles.chip}
            textStyle={{ fontSize: 13 }}
          >
            🕒 Hours
          </Chip>
          <Chip
            mode="outlined"
            onPress={() => handleSend("❓ Research help")}
            style={styles.chip}
            textStyle={{ fontSize: 13 }}
          >
            ❓ Research
          </Chip>
        </View>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            mode="outlined"
            placeholder="Type your question..."
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
          <IconButton
            icon="send"
            size={28}
            onPress={() => handleSend()}
            iconColor="#6200EE"
            style={styles.sendBtn}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  // Appbar
  appbar: { backgroundColor: "#6200EE" },
  appbarTitle: { color: "white", fontWeight: "bold", fontSize: 20 },

  // Messages
  messages: { padding: 12 },
  messageRow: { flexDirection: "row", alignItems: "flex-end", marginVertical: 6 },
  userRow: { justifyContent: "flex-end" },
  botRow: { justifyContent: "flex-start" },

  // Avatars
  userAvatar: { backgroundColor: "#6200EE", marginLeft: 6 },
  botAvatar: { backgroundColor: "#8E24AA", marginRight: 6 },

  messageCard: { padding: 10, borderRadius: 16, maxWidth: "70%" },

  // User bubble
  userCard: { backgroundColor: "#6200EE" },
  userText: { fontSize: 15, color: "white" },

  // Bot bubble
  botCard: { backgroundColor: "#E0E0E0" },
  botText: { fontSize: 15, color: "#212121" },

  // Typing Indicator
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingLeft: 16,
  },
  typingText: { marginLeft: 8, color: "#555" },

  // Quick Replies
  quickReplies: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  chip: {
    borderRadius: 20,
    borderColor: "#6200EE",
  },

  // Input bar
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
  },
  input: { flex: 1, marginRight: 8, backgroundColor: "white" },
  sendBtn: { margin: 0 },
});
