import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import News from "@/scr/components/news";
import Items from "@/scr/components/item";
import { useState, useEffect } from "react";


interface Item {
  title?: string;
  path: string;
  image: string;
}

export default function Index() {
  const placeholder =
    "https://via.placeholder.com/250x250.png?text=Sem+Imagem";

  const news: Item[] = [
    {
      path: "index.tsx",
      image:
        require("@/assets/images/news/1.png"),
    },
    {
      path: "index.tsx",
      image:
        require("@/assets/images/news/2.png"),
    },
    {
      path: "index.tsx",
      image:
        require("@/assets/images/news/3.png"),
    },
  ];

  const items: Item[] = [
    { title: "Impressões", path: "/services/impressoes", image: require("@/assets/images/items/impressoes.png") },
    //{ title: "Cópias", path: "/services/copias", image: require("@/assets/images/items/copias.png") },
    //{ title: "Acabamentos", path: "/services/acabamentos", image: require("@/assets/images/items/acabamentos.png") },
    //{ title: "Digitalização e Envio", path: "/services/digitalizacao", image: require("@/assets/images/items/digitalizacao.png") },
    { title: "Serviços Extras", path: "/services/extra", image: require("@/assets/images/items/extras.png") },
    { title: "Outros", path: "/services/outros", image: require("@/assets/images/items/outros.png") },
    { title: "Seus pedidos", path: "/services/pedidos", image: require("@/assets/images/items/pedidos.png") },
    { title: "Gerenciar conta", path: "/services/conta", image: require("@/assets/images/items/conta.png") },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = news.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalItems]);

  const handleLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleRight = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const currentNews = news[currentIndex];

  return (

    <ScrollView style={styles.container}>
      {/* Seção de Novidades */}
      <View style={styles.newsContainer}>
        <Text style={styles.text}>Novidades</Text>
        <View style={styles.newsContainerItems}>
          <TouchableOpacity onPress={handleLeft} style={styles.arrowButton}>
            <Text style={styles.arrow}>◀</Text>
          </TouchableOpacity>

          <View style={styles.newsBox}>
            <News image={currentNews.image} goTo={currentNews.path} />
          </View>

          <TouchableOpacity onPress={handleRight} style={styles.arrowButton}>
            <Text style={styles.arrow}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção de Serviços */}
      <View style={styles.serviceContainer}>
        <Text style={styles.text}>Serviços</Text>

        <View style={styles.serviceContainerItems}>
          {items.map((item, index) => (
            <Items
              key={index}
              image={item.image || placeholder}
              title={item.title ?? ""}
              goTo={item.path}
            />
          ))}
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF9FF",
  },

  newsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },
  newsContainerItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  newsBox: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  arrowButton: {
    padding: 10,
  },
  arrow: {
    fontSize: 24,
    color: "#5A9DBA",
  },

  serviceContainer: {
    alignItems: "center",
    width: "100%",
  },
  serviceContainerItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 40,
  },

  text: {
    fontSize: 24,
    marginVertical: 10,
    color: "#5A9DBA",
    fontWeight: "bold",
    fontFamily: "System",
  },
});
