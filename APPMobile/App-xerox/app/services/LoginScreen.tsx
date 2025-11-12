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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/scr/config/firebaseConfig";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  const showToast = (type: "success" | "error", message: string) => {
    Toast.show({
      type,
      text1: message,
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      showToast("error", "Preencha todos os campos!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      showToast("success", "Login realizado com sucesso!");
      router.replace("/"); 
    } catch (error: any) {
      showToast("error", `Erro ao fazer login: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#EAF9FF" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Entre para continuar</Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#9EBFCC"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#9EBFCC"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
          />
          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"}
              size={22}
              color="#5A9DBA"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/services/RegisterScreen")}
        >
          <Text style={styles.registerText}>
            Não tem uma conta?{" "}
            <Text style={styles.registerHighlight}>Crie agora</Text>
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
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 15,
    color: "#5A9DBA",
  },
  registerHighlight: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
