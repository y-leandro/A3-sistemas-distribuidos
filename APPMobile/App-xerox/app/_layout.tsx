import { Stack } from "expo-router";
import Header from "@/scr/components/header";
import Screen from "@/scr/components/screen";
import Toast from "react-native-toast-message";

export default function MainLayout() {
  return (
    <Screen>
      <Stack
        screenOptions={{
          header: Header,
        }}
      />

      <Toast />
    </Screen>
  );
}
