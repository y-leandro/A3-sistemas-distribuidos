import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/scr/config/firebaseConfig";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";

import News from "@/scr/components/news";
import Items from "@/scr/components/item";


interface Item {
  title?: string;
  path: string;
  image: any;
}

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const news: Item[] = [
    { path: "/", image: require("@/assets/images/news/1.png") },
    { path: "/", image: require("@/assets/images/news/2.png") },
    { path: "/", image: require("@/assets/images/news/3.png") },
  ];

  const items: Item[] = [
    { title: "Impressões", path: "/services/impressoes", image: require("@/assets/images/items/impressoes.png") },
    { title: "Serviços Extras", path: "/services/extra", image: require("@/assets/images/items/extras.png") },
    { title: "Outros", path: "/services/outros", image: require("@/assets/images/items/outros.png") },
    { title: "Seus pedidos", path: "/services/pedidos", image: require("@/assets/images/items/pedidos.png") },
    { title: "Gerenciar conta", path: "/services/conta", image: require("@/assets/images/items/conta.png") },
  ];

  const totalItems = news.length;

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        Toast.show({
          type: "error",
          text1: "Você precisa fazer login!",
          position: "bottom",
          visibilityTime: 3000,
        });

        
        setTimeout(() => {
          router.replace("/services/LoginScreen");
        }, 1000);
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalItems]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const currentNews = news[currentIndex];

  return (
    <>
      <ScrollView style={styles.container}>
        
        <View style={styles.newsContainer}>
          <Text style={styles.text}>Novidades</Text>
          <View style={styles.newsContainerItems}>
            <TouchableOpacity
              onPress={() => setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)}
              style={styles.arrowButton}
            >
              <Text style={styles.arrow}>◀</Text>
            </TouchableOpacity>

            <View style={styles.newsBox}>
              <News image={currentNews.image} goTo={currentNews.path} />
            </View>

            <TouchableOpacity
              onPress={() => setCurrentIndex((prev) => (prev + 1) % totalItems)}
              style={styles.arrowButton}
            >
              <Text style={styles.arrow}>▶</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.serviceContainer}>
          <Text style={styles.text}>Serviços</Text>
          <View style={styles.serviceContainerItems}>
            {items.map((item, index) => (
              <Items
                key={index}
                image={item.image}
                title={item.title ?? ""}
                goTo={item.path}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF9FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF9FF",
  },
  loadingText: {
    color: "#5A9DBA",
    fontSize: 18,
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
  },
});
