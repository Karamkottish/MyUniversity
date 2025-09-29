import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home"); // Go to Home after 2.5s
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
     <Image 
  source={require("../assets/images/karamuniversitywithoutBackground.png")} 
  style={styles.logo} 
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#6200EE" },
  logo: { width: 150, height: 150, resizeMode: "contain" }
});
