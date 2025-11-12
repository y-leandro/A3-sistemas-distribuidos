import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { auth, db } from "@/scr/config/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

export default function Conta() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuario = auth.currentUser;
        if (!usuario) return;

        setEmail(usuario.email || "");

        const docRef = doc(db, "users", usuario.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const dados = snap.data();
          setNome(dados.nome || "");
          setTelefone(dados.telefone || "");
          setEndereco(dados.endereco || "");
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        Toast.show({
          type: "error",
          text1: "Erro ao carregar informações",
        });
      } finally {
        setLoading(false);
      }
    };

    carregarUsuario();
  }, []);

  const salvarAlteracoes = async () => {
    const usuario = auth.currentUser;
    if (!usuario) return;

    if (!nome.trim() || !telefone.trim()) {
      Toast.show({
        type: "error",
        text1: "Preencha nome e telefone",
        position: "bottom",
      });
      return;
    }

    try {
      setSalvando(true);

      const docRef = doc(db, "users", usuario.uid);
      await updateDoc(docRef, {
        nome,
        telefone,
        endereco,
      });

      Toast.show({
        type: "success",
        text1: "Informações atualizadas!",
        position: "bottom",
      });
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao salvar alterações",
        position: "bottom",
      });
    } finally {
      setSalvando(false);
    }
  };

  const sairDaConta = async () => {
    try {
      await auth.signOut();
      Toast.show({
        type: "success",
        text1: "Você saiu da conta",
        position: "bottom",
      });
    } catch (error) {
      console.error("Erro ao sair:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao sair da conta",
      });
    }
  };

  const excluirConta = async () => {
    Alert.alert(
      "Excluir conta",
      "Tem certeza de que deseja excluir sua conta? Essa ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const usuario = auth.currentUser;
              if (!usuario) return;

              await deleteDoc(doc(db, "users", usuario.uid));
              await usuario.delete();

              Toast.show({
                type: "success",
                text1: "Conta excluída com sucesso",
              });
            } catch (error) {
              console.error("Erro ao excluir conta:", error);
              Toast.show({
                type: "error",
                text1: "Erro ao excluir conta",
                text2: "Tente sair e entrar novamente",
              });
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5A9DBA" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#EAF9FF" }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>
        <Text style={styles.titulo}>Minha conta</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Rua, número, bairro..."
        />

        <TouchableOpacity
          style={[styles.botao, salvando && { opacity: 0.6 }]}
          onPress={salvarAlteracoes}
          disabled={salvando}
        >
          <Text style={styles.textoBotao}>
            {salvando ? "Salvando..." : "Salvar alterações"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={sairDaConta}>
          <Text style={styles.textoBotaoSecundario}>Sair da conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoExcluir} onPress={excluirConta}>
          <Text style={styles.textoBotaoExcluir}>Excluir conta</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </View>

      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginVertical: 10,
    color: "#5A9DBA",
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  botao: {
    backgroundColor: "#5A9DBA",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  botaoSecundario: {
    backgroundColor: "#cce8f1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoSecundario: {
    color: "#2c6b85",
    fontWeight: "bold",
    fontSize: 15,
  },
  botaoExcluir: {
    backgroundColor: "#ff5555aa",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoExcluir: {
    color: "#fff",
    fontWeight: "bold",
  },
});
