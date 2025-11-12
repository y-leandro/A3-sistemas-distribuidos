import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import Toast from "react-native-toast-message";
import { addDoc, collection, Timestamp, getDoc, doc } from "firebase/firestore";
import { db, auth } from "@/scr/config/firebaseConfig";

export default function Impressoes() {
  
  const tipoPapel = [
    { nome: "Sulfite comum", descricao: "Papel branco padrão", preco: 0.1 },
    { nome: "Sulfite premium", descricao: "Papel de melhor qualidade", preco: 0.2 },
    { nome: "Reciclado", descricao: "Papel ecológico", preco: 0.25 },
    { nome: "Fotográfico", descricao: "Ideal para fotos coloridas", preco: 1.5 },
    { nome: "Couchê fosco", descricao: "Superfície lisa fosca", preco: 0.8 },
    { nome: "Couchê brilhante", descricao: "Superfície brilhante", preco: 1.0 },
    { nome: "Cartolina", descricao: "Mais grosso e firme", preco: 1.2 },
    { nome: "Transparente", descricao: "Usado em apresentações", preco: 2.0 },
    { nome: "Adesivo", descricao: "Verso adesivo", preco: 1.5 },
  ];

  const tamanhoPapel = [
    { nome: "A1", dimensoes: "594 x 841 mm", preco: 10 },
    { nome: "A2", dimensoes: "420 x 594 mm", preco: 6 },
    { nome: "A3", dimensoes: "297 x 420 mm", preco: 3 },
    { nome: "A4", dimensoes: "210 x 297 mm", preco: 1.5 },
    { nome: "A5", dimensoes: "148 x 210 mm", preco: 1 },
    { nome: "Ofício", dimensoes: "216 x 330 mm", preco: 1.8 },
    { nome: "Carta", dimensoes: "216 x 279 mm", preco: 1.6 },
    { nome: "Personalizado", dimensoes: "Medida definida pelo cliente", preco: 5 },
  ];

  const corImpressao = [
    { nome: "Preto e branco", descricao: "Ideal para documentos simples", preco: 0.2 },
    { nome: "Colorida", descricao: "Impressões com cores vivas", preco: 0.8 },
  ];

  const modoImpressao = [
    { nome: "Somente frente", descricao: "Um lado da folha", preco: 0.3 },
    { nome: "Frente e verso", descricao: "Impressão nos dois lados", preco: 0.5 },
  ];

  const gramatura = [
    { nome: "75g", descricao: "Uso cotidiano", preco: 0 },
    { nome: "90g", descricao: "Mais encorpado", preco: 0.1 },
    { nome: "120g", descricao: "Apresentações", preco: 0.3 },
    { nome: "180g", descricao: "Semi-cartão", preco: 0.6 },
    { nome: "230g", descricao: "Cartão rígido", preco: 1.0 },
  ];

  const acabamento = [
    { nome: "Sem acabamento", descricao: "Somente impressão", preco: 0 },
    { nome: "Grampeamento", descricao: "Preso por grampo", preco: 1 },
    { nome: "Encadernação simples", descricao: "Espiral + capa transparente", preco: 5 },
    { nome: "Encadernação luxo", descricao: "Capa dura e contracapa colorida", preco: 10 },
    { nome: "Plastificação", descricao: "Protege e dá brilho", preco: 3 },
    { nome: "Recorte", descricao: "Ajuste de tamanho", preco: 2 },
    { nome: "Dobradura", descricao: "Dobras para folders", preco: 1.5 },
  ];

  const entrega = [
    { nome: "Retirada na loja", descricao: "Grátis", preco: 0 },
    { nome: "Entrega local", descricao: "Raio de até 5km", preco: 5 },
    { nome: "Entrega agendada", descricao: "Com hora marcada", preco: 8 },
  ];

  const titulos = {
    tipoPapel: "Tipo de papel",
    tamanhoPapel: "Tamanho do papel",
    corImpressao: "Cor da impressão",
    modoImpressao: "Modo de impressão",
    gramatura: "Gramatura",
    acabamento: "Acabamento",
    entrega: "Entrega",
  };

  
  const [selecionado, setSelecionado] = useState<Record<string, any>>({
    tipoPapel: "",
    tamanhoPapel: "",
    corImpressao: "",
    modoImpressao: "",
    gramatura: "",
    acabamento: "",
    entrega: "",
  });

  const [arquivos, setArquivos] = useState<any[]>([]);
  const [quantidade, setQuantidade] = useState(0);
  const [valorArquivo, setValorArquivo] = useState(0);
  const [aberto, setAberto] = useState<string | null>(null);

 
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      const usuario = auth.currentUser;
      if (!usuario) return;

      try {
        const docRef = doc(db, "users", usuario.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const dados = snap.data();
          setNomeCliente(dados.nome || "");
          setTelefoneCliente(dados.telefone || "");
        }
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    };

    carregarDadosUsuario();
  }, []);

  
  const selecionarArquivos = async () => {
    const resultado = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/zip", "image/*"],
      multiple: true,
      copyToCacheDirectory: true,
    });

    if (resultado.canceled) return;

    const novos = resultado.assets;
    let totalArquivos = 0;
    let totalValor = 0;
    const processados = [];

    for (const file of novos) {
      try {
        if (file.name.endsWith(".pdf")) {
          const response = await fetch(file.uri);
          const arrayBuffer = await response.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const paginas = pdfDoc.getPageCount();
          totalArquivos += paginas;
          totalValor += paginas * 0.5;
        } else if (file.name.endsWith(".zip")) {
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const zip = await JSZip.loadAsync(blob);
          const qtd = Object.keys(zip.files).length;
          totalArquivos += qtd;
          totalValor += qtd * 0.8;
        } else if (file.mimeType?.startsWith("image/")) {
          totalArquivos += 1;
          totalValor += 1.0;
        }
        processados.push(file);
      } catch (err) {
        console.error("Erro ao processar arquivo:", file.name, err);
      }
    }

    setArquivos(processados);
    setQuantidade(totalArquivos);
    setValorArquivo(totalValor);
  };

 
  const calcularTotal = () => {
    let total = valorArquivo;
    const tabelas = {
      tipoPapel,
      tamanhoPapel,
      corImpressao,
      modoImpressao,
      gramatura,
      acabamento,
      entrega,
    };
    for (const chave of Object.keys(selecionado)) {
      const valor = selecionado[chave];
      const tabela = (tabelas as any)[chave];
      if (!tabela) continue;
      const item = tabela.find((x: any) => x.nome === valor);
      if (item) total += item.preco;
    }
    return total;
  };
  const totalFinal = calcularTotal();

  
  const handleEnviarPedido = async () => {
    if (arquivos.length === 0) {
      Toast.show({
        type: "error",
        text1: "Selecione ao menos um arquivo!",
        position: "bottom",
      });
      return;
    }

    try {
      const usuario = auth.currentUser;
      const pedido = {
        nomeCliente,
        telefoneCliente,
        selecionado,
        arquivos: arquivos.map((a) => ({
          nome: a.name,
          tipo: a.mimeType,
          tamanho: a.size,
        })),
        totalFinal,
        quantidade,
        criadoEm: Timestamp.now(),
        usuario: usuario
          ? { uid: usuario.uid, email: usuario.email }
          : { uid: null, email: "desconhecido" },
      };

      await addDoc(collection(db, "pedidos"), pedido);

      Toast.show({
        type: "success",
        text1: "Pedido enviado com sucesso!",
        text2: `Total: R$${totalFinal.toFixed(2)}`,
        position: "bottom",
      });

      setSelecionado({
        tipoPapel: "",
        tamanhoPapel: "",
        corImpressao: "",
        modoImpressao: "",
        gramatura: "",
        acabamento: "",
        entrega: "",
      });
      setArquivos([]);
      setQuantidade(0);
      setValorArquivo(0);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao enviar pedido",
        text2: "Tente novamente mais tarde",
        position: "bottom",
      });
    }
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#EAF9FF" }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={styles.tituloPrincipal}>Impressões</Text>

        <TouchableOpacity onPress={selecionarArquivos} style={styles.botaoArquivos}>
          <Text style={styles.textoBotaoArquivo}>
            {arquivos.length > 0
              ? "📄 Arquivos selecionados"
              : "📤 Enviar arquivos (PDF, ZIP ou imagens)"}
          </Text>
        </TouchableOpacity>

        {arquivos.length > 0 && (
          <View style={styles.caixaArquivos}>
            {arquivos.map((file, i) => (
              <Text key={i} style={{ color: "#333" }}>
                • {file.name}
              </Text>
            ))}
            <Text style={{ fontWeight: "bold", marginTop: 4 }}>
              Total de arquivos/páginas: {quantidade}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Subtotal: R${valorArquivo.toFixed(2)}
            </Text>
          </View>
        )}

        {/* Seções de seleção */}
        {Object.entries({
          tipoPapel,
          tamanhoPapel,
          corImpressao,
          modoImpressao,
          gramatura,
          acabamento,
          entrega,
        }).map(([key, data]) => (
          <View key={key} style={{ marginBottom: 12 }}>
            <TouchableOpacity
              onPress={() => setAberto(aberto === key ? null : key)}
              style={styles.headerSecao}
            >
              <Text style={styles.tituloSecao}>
                {titulos[key as keyof typeof titulos]}{" "}
                {selecionado[key] ? `• ${selecionado[key]}` : ""}
              </Text>
            </TouchableOpacity>

            {aberto === key && (
              <View style={{ paddingLeft: 10 }}>
                {data.map((item: any, i: number) => {
                  const isSelected = selecionado[key] === item.nome;
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        setSelecionado({ ...selecionado, [key]: item.nome });
                        setAberto(null);
                      }}
                      style={[
                        styles.itemSecao,
                        { backgroundColor: isSelected ? "#5a9dba8a" : "#5a9dba28" },
                      ]}
                    >
                      <Text style={{ fontWeight: "600" }}>{item.nome}</Text>
                      <Text style={{ color: "#555" }}>{item.descricao}</Text>
                      <Text style={{ color: "#555" }}>+ R${item.preco.toFixed(2)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        ))}

        <View style={styles.resumo}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Resumo do pedido:</Text>
          {Object.entries(selecionado).map(([chave, valor]) => (
            <Text key={chave} style={{ color: "#333" }}>
              {titulos[chave as keyof typeof titulos]}:{" "}
              {valor || "não selecionado"}
            </Text>
          ))}
          <Text style={{ color: "#333" }}>
            Arquivos: {arquivos.length} ({quantidade} páginas/itens)
          </Text>
          <Text style={styles.total}>Total: R${totalFinal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.botaoEnviar} onPress={handleEnviarPedido}>
          <Text style={styles.textoBotaoEnviar}>Enviar pedido</Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast />
    </>
  );
}


const styles = StyleSheet.create({
  tituloPrincipal: {
    fontSize: 24,
    marginVertical: 10,
    color: "#5A9DBA",
    fontWeight: "bold",
  },
  headerSecao: {
    backgroundColor: "#5a9dbaa8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemSecao: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
  },
  botaoArquivos: {
    backgroundColor: "#5a9dbaa8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  textoBotaoArquivo: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  caixaArquivos: {
    backgroundColor: "#d4efff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  resumo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#5a9dbaa8",
    borderRadius: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
  },
  botaoEnviar: {
    marginTop: 16,
    backgroundColor: "#5A9DBA",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  textoBotaoEnviar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
