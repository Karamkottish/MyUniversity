import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";

export const options = {
  headerShown: true,
  title: "📚 My Courses",
  headerStyle: { backgroundColor: "#FFFFFF" },
  headerTintColor: "black", // ✅ black back arrow
  headerBackVisible: true,
  headerTitleStyle: { fontWeight: "bold", fontSize: 20, color: "#1C1B1F" },
};

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Course = {
  id: number;
  name: string;
  instructor: string;
  credits: number;
  schedule: string;
  progress: number; // 0–1
  icon: string;
  color: string;
};

export default function CoursesScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      name: "Mobile App Development",
      instructor: "Dr. Ali",
      credits: 3,
      schedule: "Mon & Wed 10:00–11:30 AM",
      progress: 0.0,
      icon: "cellphone",
      color: "#42A5F5",
    },
    {
      id: 2,
      name: "Database Systems",
      instructor: "Prof. Sarah",
      credits: 4,
      schedule: "Tue & Thu 12:00–1:30 PM",
      progress: 0.6,
      icon: "database",
      color: "#8E24AA",
    },
    {
      id: 3,
      name: "AI Fundamentals",
      instructor: "Dr. Aisha",
      credits: 3,
      schedule: "Mon & Wed 2:00–3:30 PM",
      progress: 1,
      icon: "robot",
      color: "#43A047",
    },
    {
      id: 4,
      name: "Software Engineering",
      instructor: "Dr. Omar",
      credits: 3,
      schedule: "Fri 9:00–12:00 PM",
      progress: 0.9,
      icon: "code-tags",
      color: "#FB8C00",
    },
  ];

  const animatedProgress = useRef<{ [key: number]: Animated.Value }>({}).current;
  courses.forEach((course) => {
    if (!animatedProgress[course.id]) {
      animatedProgress[course.id] = new Animated.Value(0);
    }
  });

  const toggleExpand = (course: Course) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expanded === course.id) {
      setExpanded(null);
    } else {
      setExpanded(course.id);
      Animated.timing(animatedProgress[course.id], {
        toValue: course.progress,
        duration: 1200,
        useNativeDriver: false,
      }).start();
    }
  };

  // Custom Animated Ripple Button
  const AnimatedButton = ({ color, progress }: { color: string; progress: number }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    // Dynamic label
    let label = "Start";
    if (progress === 1) {
      label = "Completed";
    } else if (progress > 0 && progress < 1) {
      label = "Continue";
    }

    return (
      <Pressable
        android_ripple={{ color: "#ffffff30", borderless: false }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ flex: 1 }}
        disabled={progress === 1}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Button
            mode="contained"
            buttonColor={progress === 1 ? "#BDBDBD" : color}
            textColor="#FFFFFF"
            style={styles.openButton}
          >
            {label}
          </Button>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {courses.map((course) => {
          const progressWidth = animatedProgress[course.id].interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          });

          return (
            <Card
              key={course.id}
              style={styles.card}
              onPress={() => toggleExpand(course)}
              mode="elevated"
            >
              <Card.Title
                title={course.name}
                titleStyle={styles.courseTitle}
                subtitle={`Instructor: ${course.instructor}`}
                subtitleStyle={styles.instructor}
                left={() => (
                  <MaterialCommunityIcons
                    name={course.icon as any}
                    size={32}
                    color={course.color}
                    style={{ marginRight: 8 }}
                  />
                )}
              />

              {expanded === course.id && (
                <Card.Content style={styles.details}>
                  <Text style={styles.detailText}>📅 {course.schedule}</Text>
                  <Text style={styles.detailText}>🎓 Credits: {course.credits}</Text>

                  <Text style={styles.progressLabel}>
                    Progress: {(course.progress * 100).toFixed(0)}%
                  </Text>
                  <View style={styles.progressBackground}>
                    <Animated.View
                      style={[styles.progressFill, { width: progressWidth }]}
                    />
                  </View>
                </Card.Content>
              )}

              <Card.Actions>
                <AnimatedButton color={course.color} progress={course.progress} />
              </Card.Actions>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  content: { padding: 16 },
  card: {
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  courseTitle: { fontWeight: "bold", fontSize: 18, color: "#212121" },
  instructor: { fontSize: 14, color: "#555" },
  details: { marginTop: 8 },
  detailText: { fontSize: 15, color: "#333", marginBottom: 4 },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: "#212121",
  },
  progressBackground: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6200EE",
    borderRadius: 6,
  },
  openButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
