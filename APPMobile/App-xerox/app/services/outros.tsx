import { StyleSheet, View, Text, ScrollView } from "react-native";
import Items from "@/scr/components/services/item";
import { useRouter } from "expo-router";

export default function Outros() {
  const placeholder = "";
  const router = useRouter();

  interface Item {
    title?: string;
    path: string;
    image: string;
  }



  const items: Item[] = [
    { title: "Promoções e descontos", path: "/service/outros", image: placeholder },
    { title: "Horário de funcionamento", path: "/service/outros", image: placeholder },
    { title: "Localização da loja", path: "/service/outros", image: placeholder },
    { title: "Fale conosco", path: "/service/outros", image: placeholder },
    { title: "FAQ", path: "/service/outros", image: placeholder },
  ];



  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Outros</Text>
        <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
          {items.map((item, index) => (
            <Items
              key={index}
              image={item.image || placeholder}
              title={item.title ?? ""}
            />

          ))}

        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginVertical: 10,
    color: "#5A9DBA",
    fontWeight: "bold",
    fontFamily: "System",
    margin: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#EAF9FF",
  },
});