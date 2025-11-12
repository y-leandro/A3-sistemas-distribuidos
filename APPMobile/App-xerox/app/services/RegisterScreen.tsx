import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/scr/config/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const db = getFirestore();

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const router = useRouter();

  const showToast = (type: "success" | "error", message: string) => {
    Toast.show({
      type,
      text1: message,
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const handleRegister = async () => {
    if (!nome || !telefone || !email || !senha || !confirmarSenha) {
      showToast("error", "Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      showToast("error", "As senhas não coincidem!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await updateProfile(user, { displayName: nome });

      
      await setDoc(doc(db, "users", user.uid), {
        nome,
        telefone,
        email,
        createdAt: new Date(),
      });

      showToast("success", "Conta criada com sucesso!");
      router.replace("/");
    } catch (error: any) {
      showToast("error", `Erro ao criar conta: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#EAF9FF" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados</Text>

        <TextInput
          placeholder="Nome completo"
          placeholderTextColor="#9EBFCC"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <TextInput
          placeholder="Telefone"
          placeholderTextColor="#9EBFCC"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
          style={styles.input}
        />

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#9EBFCC"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        {/* Campo senha */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#9EBFCC"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.eyeButton}>
            <Ionicons name={mostrarSenha ? "eye-off" : "eye"} size={22} color="#5A9DBA" />
          </TouchableOpacity>
        </View>

        {/* Campo confirmar senha */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#9EBFCC"
            secureTextEntry={!mostrarConfirmar}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
          />
          <TouchableOpacity
            onPress={() => setMostrarConfirmar(!mostrarConfirmar)}
            style={styles.eyeButton}
          >
            <Ionicons name={mostrarConfirmar ? "eye-off" : "eye"} size={22} color="#5A9DBA" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/services/LoginScreen")}>
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginHighlight}>Entre aqui</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A9DBA",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#5A9DBA",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDCE7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  eyeButton: {
    marginLeft: -40,
    padding: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#5A9DBA",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginButton: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 15,
    color: "#5A9DBA",
  },
  loginHighlight: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
