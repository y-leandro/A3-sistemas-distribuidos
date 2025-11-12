import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { auth, db } from "@/scr/config/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const usuario = auth.currentUser;
        if (!usuario) return;

        
        const pedidosRef = collection(db, "pedidos");
        const q = query(
          pedidosRef,
          where("usuario.uid", "==", usuario.uid),
          orderBy("criadoEm", "desc")
        );

        const snap = await getDocs(q);
        const lista: any[] = [];
        snap.forEach((doc) => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setPedidos(lista);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5A9DBA" />
      </View>
    );
  }

  if (pedidos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.semPedidos}>Você ainda não fez nenhum pedido 💤</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
    const dados = item.selecionado || {};
    const arquivos = item.arquivos || [];

    return (
      <View style={styles.card}>
        <Text style={styles.titulo}>Pedido #{item.id.slice(0, 6)}</Text>
        <Text style={styles.texto}>Cliente: {item.nomeCliente || "—"}</Text>
        <Text style={styles.texto}>
          Total: R$ {item.totalFinal?.toFixed(2) || "0.00"}
        </Text>
        <View style={styles.linha} />

        <Text style={styles.subtitulo}>Detalhes do pedido:</Text>
        <Text style={styles.item}>Tamanho: {dados.tamanhoPapel}</Text>
        <Text style={styles.item}>Cor: {dados.corImpressao}</Text>
        <Text style={styles.item}>Entrega: {dados.entrega}</Text>
        <Text style={styles.item}>Acabamento: {dados.acabamento}</Text>
        <Text style={styles.item}>Tipo: {dados.tipoPapel}</Text>
        <Text style={styles.item}>Impressão: {dados.modoImpressao}</Text>
        <Text style={styles.item}>Gramatura: {dados.gramatura}</Text>

        <View style={styles.linha} />

        <Text style={styles.subtitulo}>Arquivos enviados:</Text>
        {arquivos.map((a: any, index: number) => (
          <Text key={index} style={styles.arquivo}>
            • {a.nome} ({(a.tamanho / 1024).toFixed(1)} KB)
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EAF9FF" }}>
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  semPedidos: { fontSize: 16, color: "#666", textAlign: "center" },
  card: {
    backgroundColor: "#b7dae9ff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  subtitulo: { fontWeight: "600", marginTop: 4, marginBottom: 2 },
  texto: { color: "#333", marginBottom: 2 },
  item: { color: "#555", fontSize: 14, marginLeft: 5 },
  arquivo: { color: "#444", fontSize: 13, marginLeft: 5 },
  linha: { height: 1, backgroundColor: "#5A9DBA", marginVertical: 6 },
});
