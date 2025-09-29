import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Chip, Divider, Text } from "react-native-paper";

type Payment = {
  title: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "Overdue";
};

export default function PaymentsScreen() {
  const payments: Payment[] = [
    { title: "Tuition Fee - Fall 2025", amount: "SAR 12,000", date: "01 Sept 2025", status: "Paid" },
    { title: "Library Fee", amount: "SAR 500", date: "15 Sept 2025", status: "Pending" },
    { title: "Lab Fee", amount: "SAR 750", date: "10 Aug 2025", status: "Overdue" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text variant="headlineMedium" style={styles.header}>
        💳 Payments
      </Text>
      <Text style={styles.subtitle}>Check tuition and fee status</Text>

      {/* Summary Card */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.summaryTitle}>
            Outstanding Balance
          </Text>
          <Text style={styles.balance}>SAR 1,250</Text>
          <Text style={styles.note}>*2 payments pending/overdue</Text>
          <Button
            mode="contained"
            style={styles.payButton}
            onPress={() => console.log("Pay all pending fees")}
          >
            Pay Now
          </Button>
        </Card.Content>
      </Card>

      {/* Divider */}
      <Divider style={{ marginVertical: 16 }} />

      {/* Recent Transactions */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Recent Transactions
      </Text>
      {payments.map((p, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View>
              <Text style={styles.paymentTitle}>{p.title}</Text>
              <Text style={styles.date}>{p.date}</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.amount}>{p.amount}</Text>
              <Chip
                style={[
                  styles.chip,
                  p.status === "Paid" && { backgroundColor: "#66BB6A" },
                  p.status === "Pending" && { backgroundColor: "#42A5F5" },
                  p.status === "Overdue" && { backgroundColor: "#EF5350" },
                ]}
                textStyle={{ color: "white", fontWeight: "600" }}
              >
                {p.status}
              </Chip>
              {(p.status === "Pending" || p.status === "Overdue") && (
                <Button
                  mode="contained-tonal"
                  style={styles.smallPayButton}
                  onPress={() => console.log(`Pay ${p.title}`)}
                >
                  Pay Now
                </Button>
              )}
            </View>
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
  summaryCard: {
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3,
    marginBottom: 12,
    paddingBottom: 12,
  },
  summaryTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },
  balance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E64A19",
    marginBottom: 4,
  },
  note: {
    fontSize: 13,
    color: "#777",
    marginBottom: 12,
  },
  payButton: {
    borderRadius: 8,
    backgroundColor: "#42A5F5",
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
    color: "#333",
  },
  card: {
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: "white",
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#666",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1D1B20",
  },
  chip: {
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 28,
    marginBottom: 6,
  },
  smallPayButton: {
    borderRadius: 6,
    marginTop: 4,
  },
});
