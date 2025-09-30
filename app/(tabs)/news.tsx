import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View
} from "react-native";
import { Card, Chip, Text } from "react-native-paper";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type NewsItem = {
  id: number;
  title: string;
  desc: string;
  details: string;
  category: string;
  gradient: [string, string];
  thumbnail: string;
};

export default function NewsScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [heights, setHeights] = useState<{ [key: number]: number }>({});
  const animatedHeights = useRef<{ [key: number]: Animated.Value }>({}).current;

  const news: NewsItem[] = [
    {
      id: 1,
      title: "Hackathon 2025",
      desc: "Join the biggest coding challenge on Oct 6th.",
      details:
        "Teams of 3–5 will compete for 48 hours to build innovative solutions. Prizes include internships and tech gadgets!",
      category: "💻 Tech",
      gradient: ["#42A5F5", "#1E88E5"],
      thumbnail: "https://img.icons8.com/color/96/laptop.png",
    },
    {
      id: 2,
      title: "Guest Lecture",
      desc: "AI in Education – Sept 30.",
      details:
        "Dr. Jamal explores the role of artificial intelligence in transforming higher education, with live Q&A.",
      category: "🎓 Academic",
      gradient: ["#8E24AA", "#6A1B9A"],
      thumbnail: "https://img.icons8.com/color/96/artificial-intelligence.png",
    },
    {
      id: 3,
      title: "Sports Festival",
      desc: "Annual sports week Oct 10–14.",
      details:
        "Football, basketball, and athletics competitions. Don’t miss the closing ceremony with fireworks!",
      category: "🏀 Sports",
      gradient: ["#43A047", "#2E7D32"],
      thumbnail: "https://img.icons8.com/color/96/basketball.png",
    },
    {
      id: 4,
      title: "Library Week",
      desc: "Discover knowledge treasures.",
      details:
        "Workshops on research skills, citation tools, and free giveaways of digital resources all week.",
      category: "📚 Academic",
      gradient: ["#FB8C00", "#EF6C00"],
      thumbnail: "https://img.icons8.com/color/96/books.png",
    },
    {
      id: 5,
      title: "Startup Fair",
      desc: "Meet top startups hiring students.",
      details:
        "Network with founders and recruiters from 20+ startups. Bring your CVs and innovative ideas.",
      category: "🚀 Tech",
      gradient: ["#D81B60", "#AD1457"],
      thumbnail: "https://img.icons8.com/color/96/startup.png",
    },
  ];

  // Initialize animated values
  news.forEach((n) => {
    if (!animatedHeights[n.id]) {
      animatedHeights[n.id] = new Animated.Value(0);
    }
  });

  const toggleExpand = (id: number) => {
    if (expanded === id) {
      Animated.timing(animatedHeights[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(null));
    } else {
      if (expanded) {
        Animated.timing(animatedHeights[expanded], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      setExpanded(id);
      Animated.timing(animatedHeights[id], {
        toValue: heights[id] || 100, // fallback height
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {news.map((n) => (
          <Card
            key={n.id}
            style={styles.card}
            mode="elevated"
            onPress={() => toggleExpand(n.id)}
          >
            {/* Gradient Header */}
            <LinearGradient
              colors={n.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientHeader}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: n.thumbnail }} style={styles.thumbnail} />
                <Text style={styles.cardTitle}>{n.title}</Text>
              </View>
              <Chip
                style={styles.chip}
                textStyle={{
                  color: "#212121",
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                {n.category}
              </Chip>
            </LinearGradient>

            {/* Card Content */}
            <Card.Content>
              <Text style={styles.cardSubtitle}>{n.desc}</Text>

              {/* Animated Expansion */}
              <Animated.View
                style={{
                  height: animatedHeights[n.id],
                  overflow: "hidden",
                }}
              >
                <View
                  onLayout={(e) => {
                    const h = e.nativeEvent.layout.height;
                    if (!heights[n.id]) {
                      setHeights((prev) => ({ ...prev, [n.id]: h }));
                    }
                  }}
                >
                  <Text style={styles.cardDetails}>{n.details}</Text>
                </View>
              </Animated.View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "white",
  },

  gradientHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  thumbnail: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  cardSubtitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  cardDetails: {
    marginTop: 8,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },

  chip: {
    borderRadius: 8,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
});
