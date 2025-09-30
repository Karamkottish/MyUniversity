import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    Animated,
    LayoutAnimation,
    Platform,
    StyleSheet,
    UIManager,
    View,
} from "react-native";
import { Button, Card, Chip, IconButton, Text } from "react-native-paper";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CoursesFall2024() {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const progressAnim = useRef<{ [key: number]: Animated.Value }>({}).current;

  const toggleExpand = (id: number, targetProgress: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    if (!progressAnim[id]) progressAnim[id] = new Animated.Value(0);

    Animated.timing(progressAnim[id], {
      toValue: expanded[id] ? 0 : targetProgress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const courses = [
    {
      id: 1,
      title: "Database Systems",
      instructor: "Prof. Sarah",
      desc: "Relational models, SQL, indexing, and query optimization.",
      icon: "database",
      color: "#8E24AA",
      progress: 0.75,
    },
    {
      id: 2,
      title: "Artificial Intelligence Fundamentals",
      instructor: "Dr. Kareem",
      desc: "Core AI concepts, ML algorithms, and reasoning techniques.",
      icon: "robot",
      color: "#2E7D32",
      progress: 0.6,
    },
    {
      id: 3,
      title: "Software Engineering",
      instructor: "Dr. Lina",
      desc: "Agile methods, SDLC, and teamwork in software projects.",
      icon: "code-tags",
      color: "#FB8C00",
      progress: 0.5,
    },
    {
      id: 4,
      title: "Operating Systems",
      instructor: "Prof. Omar",
      desc: "Processes, scheduling, memory management, and concurrency.",
      icon: "laptop",
      color: "#D81B60",
      progress: 0.8,
    },
    {
      id: 5,
      title: "Computer Networks",
      instructor: "Dr. Hanan",
      desc: "Networking protocols, TCP/IP, routing, and network security.",
      icon: "access-point-network",
      color: "#039BE5",
      progress: 0.55,
    },
    {
      id: 6,
      title: "Mobile Application Development",
      instructor: "Dr. Ali",
      desc: "Cross-platform development using React Native & Flutter.",
      icon: "cellphone",
      color: "#F4511E",
      progress: 0.4,
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        📚 My Courses – Fall 2024 / 2025
      </Text>

      {courses.map((course) => {
        if (!progressAnim[course.id]) {
          progressAnim[course.id] = new Animated.Value(0);
        }

        return (
          <Card key={course.id} style={styles.card} mode="elevated">
            <Card.Title
              title={course.title}
              titleStyle={[styles.courseTitle, { color: course.color }]}
              subtitle={`Instructor: ${course.instructor}`}
              subtitleStyle={styles.instructor}
              left={(props) => (
                <MaterialCommunityIcons
                  {...props}
                  name={course.icon as any}
                  size={30}
                  color={course.color}
                />
              )}
              right={() => (
                <IconButton
                  icon={expanded[course.id] ? "chevron-up" : "chevron-down"}
                  iconColor={course.color}
                  onPress={() => toggleExpand(course.id, course.progress)}
                />
              )}
            />

            {expanded[course.id] && (
              <Animated.View style={styles.expandContent}>
                <Card.Content>
                  <Text style={styles.desc}>{course.desc}</Text>
                  <Chip
                    style={[styles.chip, { backgroundColor: course.color + "20" }]}
                    textStyle={{ color: course.color, fontWeight: "600" }}
                  >
                    Fall 2024 / 2025
                  </Chip>

                  {/* Progress */}
                  <Text style={styles.progressLabel}>
                    Progress: {Math.round(course.progress * 100)}%
                  </Text>
                  <View style={styles.progressWrapper}>
                    <Animated.View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: course.color,
                          width: progressAnim[course.id].interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"],
                          }),
                        },
                      ]}
                    />
                  </View>
                </Card.Content>

                <Card.Actions>
                  <Button
                    mode="contained"
                    textColor="#1C1C1C"
                    buttonColor={course.color + "CC"}
                    style={styles.button}
                    onPress={() => alert(`Opening ${course.title}`)}
                  >
                    Open
                  </Button>
                </Card.Actions>
              </Animated.View>
            )}
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F8F9FA" },
  title: {
    textAlign: "center",
    marginBottom: 16,
    color: "#1D1B20",
    fontWeight: "bold",
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 3,
  },
  courseTitle: { fontWeight: "bold", fontSize: 18 },
  instructor: { fontWeight: "600", color: "#333" },
  desc: { fontSize: 14, color: "#444", marginBottom: 10 },
  chip: { marginBottom: 10, alignSelf: "flex-start", borderRadius: 8 },
  progressLabel: { fontSize: 13, fontWeight: "600", marginBottom: 6, color: "#333" },
  progressWrapper: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  button: { borderRadius: 10 },
  expandContent: { overflow: "hidden" },
});
