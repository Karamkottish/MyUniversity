import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(tabs)/courses"); // Default tab is Courses
  }, []);

  return null; // Nothing shown, just redirect
}
