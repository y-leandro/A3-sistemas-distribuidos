import { Stack } from "expo-router";
import Header from "@/scr/components/header";
import Screen from "@/scr/components/screen";


export default function MainLayout() {
  return (

    <Screen>
      <Stack screenOptions={{
        header: Header
      }} />


    </Screen>

  );
}
