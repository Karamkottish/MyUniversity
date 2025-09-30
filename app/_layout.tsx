// app/_layout.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Image, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

// 🔹 Custom Material 3 Theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200EE", // deep purple
    secondary: "#03DAC5", // teal accent
    tertiary: "#BB86FC", // lilac
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: "#1C1B1F",
    outline: "#E0E0E0",
    error: "#B00020",
  },
  roundness: 12, // globally rounded corners
};

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* 🔹 Drawer Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Karam K</Text>
        <Text style={styles.role}>🎓 Computer Science • Year 3</Text>
      </View>

      {/* 🔹 Drawer Items */}
      <View style={styles.menuSection}>
        <DrawerItem
          label="Dashboard"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => props.navigation.navigate("(tabs)")}
        />
        <DrawerItem
          label="Courses"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="book-education-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => props.navigation.navigate("courses")}
        />
        <DrawerItem
          label="News"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => props.navigation.navigate("news")}
        />
        <DrawerItem
          label="Profile"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => props.navigation.navigate("profile")}
        />
        <DrawerItem
          label="Notifications"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => props.navigation.navigate("notifications")}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* ✅ Wrap in PaperProvider with theme */}
      <PaperProvider theme={theme}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: theme.colors.primary,
            drawerInactiveTintColor: "#444",
            drawerLabelStyle: { fontSize: 15, fontWeight: "500" },
          }}
        >
          <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Dashboard" }} />
          <Drawer.Screen name="courses" options={{ drawerLabel: "Courses" }} />
          <Drawer.Screen name="news" options={{ drawerLabel: "News" }} />
          <Drawer.Screen name="profile" options={{ drawerLabel: "Profile" }} />
          <Drawer.Screen
            name="notifications"
            options={{ drawerLabel: "Notifications" }}
          />
        </Drawer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#6200EE",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  role: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  menuSection: {
    flex: 1,
    paddingTop: 10,
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
