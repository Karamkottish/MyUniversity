import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, ProgressBar, SegmentedButtons, Text } from "react-native-paper";

type Assignment = {
  title: string;
  due: string;
  status: "Pending" | "Submitted" | "Overdue";
};

export default function AssignmentsScreen() {
  const [filter, setFilter] = useState("All");

  const assignments: Assignment[] = [
    { title: "AI Project Report", due: "Due: 30 Sept 2025", status: "Pending" },
    { title: "Database Lab #3", due: "Submitted on: 25 Sept 2025", status: "Submitted" },
    { title: "Web Development Homework", due: "Due: 20 Sept 2025", status: "Overdue" },
    { title: "Mobile App Presentation", due: "Due: 2 Oct 2025", status: "Pending" },
    { title: "Software Engineering Essay", due: "Submitted on: 22 Sept 2025", status: "Submitted" },
  ];

  const total = assignments.length;
  const submitted = assignments.filter((a) => a.status === "Submitted").length;
  const progress = submitted / total;

  // Apply filter
  const filteredAssignments =
    filter === "All"
      ? assignments
      : assignments.filter((a) => a.status === filter);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text variant="headlineMedium" style={styles.header}>
        📘 Assignments
      </Text>
      <Text style={styles.subtitle}>
        All your pending & submitted assignments
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressWrapper}>
        <Text style={styles.progressText}>
          Submitted {submitted}/{total}
        </Text>
        <ProgressBar
          progress={progress}
          color="#42A5F5"
          style={styles.progressBar}
        />
      </View>

      {/* Filter Row */}
      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          {
            value: "All",
            label: "All",
            style: { backgroundColor: "#E0E0E0" },
            labelStyle: { color: "#333", fontWeight: "600" },
          },
          {
            value: "Pending",
            label: "Pending",
            style: { backgroundColor: "#42A5F5" },
            labelStyle: { color: "white", fontWeight: "600" },
          },
          {
            value: "Submitted",
            label: "Submitted",
            style: { backgroundColor: "#66BB6A" },
            labelStyle: { color: "white", fontWeight: "600" },
          },
          {
            value: "Overdue",
            label: "Overdue",
            style: { backgroundColor: "#EF5350" },
            labelStyle: { color: "white", fontWeight: "600" },
          },
        ]}
        style={styles.filterRow}
      />

      {/* Assignment Cards */}
      {filteredAssignments.map((a, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              {a.title}
            </Text>
            <Text style={styles.due}>{a.due}</Text>
            <Chip
              style={[
                styles.chip,
                a.status === "Pending" && { backgroundColor: "#42A5F5" },
                a.status === "Submitted" && { backgroundColor: "#66BB6A" },
                a.status === "Overdue" && { backgroundColor: "#EF5350" },
              ]}
              textStyle={{ color: "white", fontWeight: "600" }}
            >
              {a.status}
            </Chip>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 16 },
  header: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
    color: "#1D1B20",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
  },
  progressWrapper: {
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
  },
  filterRow: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  title: { fontWeight: "600", marginBottom: 6 },
  due: { fontSize: 14, color: "#666", marginBottom: 8 },
  chip: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 6,
    marginTop: 4,
  },
});
