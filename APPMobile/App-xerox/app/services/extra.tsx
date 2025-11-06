import { StyleSheet, View, Text, ScrollView } from "react-native";
import Items from "@/scr/components/services/item";

export default function Extras() {

  const placeholder = "";

  interface Item {
    title?: string;
    image: string;
  }


  
  const items: Item[] = [
    { title: "Formatação de TCC", image: placeholder },
    { title: "Formatação de Currículo", image: placeholder },
    { title: "Revisão e ajustes simples em documentos", image: placeholder },
    { title: "Digitalização e Envio", image: placeholder },
    { title: "Criação de panfleto, cartão, banner",  image: placeholder },
    { title: "Fotos 3x4",  image: placeholder },
    { title: "Etiquetas e adesivos personalizados",  image: placeholder },
  ];

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.text}>Serviços extras</Text>
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