import { Stack, useRouter } from "expo-router";
import { Appbar } from "react-native-paper";


export default function FeaturesLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content
              title={options.title as string}
              titleStyle={{ fontWeight: "bold" }}
            />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name="schedule"
        options={{ title: "📅 Schedule" }}
      />
      <Stack.Screen
        name="assignments"
        options={{ title: "📘 Assignments" }}
      />
      <Stack.Screen
        name="payments"
        options={{ title: "💳 Payments" }}
      />
      <Stack.Screen
        name="events"
        options={{ title: "🎉 Events" }}
      />
    </Stack>
  );
}
