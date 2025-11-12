import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); 

  const isHome = pathname === "/" || pathname === "/services/RegisterScreen" || pathname === "/services/LoginScreen"; 

  return (
    <View style={styles.container}>
      {!isHome && (
        <Ionicons
          onPress={() => router.push("/")}
          name="chevron-back-outline"
          size={30}
          color="#5A9DBA"
          style={styles.icon}
        />
      )}
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF9FF",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    position: "absolute",
    left: 20,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: "center",
  },
});
