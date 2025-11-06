import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Impressoes() {
  // tuas consts, sem mexer nos nomes
  const tipoPapel = [
    { nome: "Sulfite comum", descricao: "Papel branco padrão para impressões do dia a dia" },
    { nome: "Sulfite premium", descricao: "Papel branco de melhor qualidade e textura" },
    { nome: "Reciclado", descricao: "Papel ecológico de tom amarelado" },
    { nome: "Fotográfico", descricao: "Ideal para fotos e imagens coloridas" },
    { nome: "Couchê fosco", descricao: "Acabamento fosco e superfície lisa" },
    { nome: "Couchê brilhante", descricao: "Acabamento brilhante para materiais visuais" },
    { nome: "Cartolina", descricao: "Mais grosso e firme, ideal para capas e cartazes" },
    { nome: "Transparente", descricao: "Usado para retroprojetores e apresentações" },
    { nome: "Adesivo", descricao: "Papel com verso adesivo para etiquetas e logos" },
  ];

  const tamanhoPapel = [
    { nome: "A1", dimensoes: "594 x 841 mm" },
    { nome: "A2", dimensoes: "420 x 594 mm" },
    { nome: "A3", dimensoes: "297 x 420 mm" },
    { nome: "A4", dimensoes: "210 x 297 mm" },
    { nome: "A5", dimensoes: "148 x 210 mm" },
    { nome: "Ofício", dimensoes: "216 x 330 mm" },
    { nome: "Carta", dimensoes: "216 x 279 mm" },
    { nome: "Personalizado", dimensoes: "Medida definida pelo cliente" },
  ];

  const tipoImpressao = [
    { nome: "Preto e branco", descricao: "Ideal para documentos e textos simples" },
    { nome: "Colorida", descricao: "Impressões com cores vivas e imagens" },
    { nome: "Frente e verso", descricao: "Impressão em ambos os lados da folha" },
    { nome: "Somente frente", descricao: "Impressão em um lado da folha" },
  ];

  const gramatura = [
    { nome: "75g", descricao: "Papel leve, ideal para uso cotidiano" },
    { nome: "90g", descricao: "Mais encorpado, boa qualidade visual" },
    { nome: "120g", descricao: "Mais resistente, ideal para apresentações" },
    { nome: "180g", descricao: "Semi-cartão, ideal para convites e capas" },
    { nome: "230g", descricao: "Cartão, ideal para impressos rígidos" },
  ];

  const acabamento = [
    { nome: "Sem acabamento", descricao: "Somente impressão" },
    { nome: "Grampeamento", descricao: "Folhas presas por grampo" },
    { nome: "Encadernação simples", descricao: "Com espiral e capa transparente" },
    { nome: "Encadernação luxo", descricao: "Espiral + capa dura e contracapa colorida" },
    { nome: "Plastificação", descricao: "Protege e dá brilho ao documento" },
    { nome: "Recorte", descricao: "Ajuste de tamanho do papel" },
    { nome: "Dobradura", descricao: "Dobras para folders ou panfletos" },
  ];

  const entrega = [
    { nome: "Retirada na loja", descricao: "Grátis" },
    { nome: "Entrega local", descricao: "Disponível dentro do raio da loja" },
    { nome: "Entrega agendada", descricao: "Cliente escolhe data e hora" },
  ];

  // estado com as seleções
  const [selecionado, setSelecionado] = useState<Record<string, string>>({
    tipoPapel: "",
    tamanhoPapel: "",
    tipoImpressao: "",
    gramatura: "",
    acabamento: "",
    entrega: "",
  });


  // componente pra exibir as listas
  type Opcao = {
    nome: string;
    descricao?: string;
    dimensoes?: string;
  };

  type SecaoProps = {
    titulo: string;
    opcoes: Opcao[];
    chave: string;
    selecionado: Record<string, string>;
    setSelecionado: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  };

  const Secao = ({ titulo, opcoes, chave, selecionado, setSelecionado }: SecaoProps) => (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{titulo}</Text>

      {opcoes.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setSelecionado({ ...selecionado, [chave]: item.nome })}
          style={{
            backgroundColor: selecionado[chave] === item.nome ? "#cce5ff" : "#f2f2f2",
            borderRadius: 10,
            padding: 12,
            marginBottom: 6,
          }}
        >
          <Text style={{ fontWeight: "600" }}>{item.nome}</Text>
          <Text style={{ color: "#555" }}>{item.descricao || item.dimensoes}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );


  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>🖨️ Impressões</Text>

      <Secao titulo="Tipo de papel" opcoes={tipoPapel} chave="tipoPapel" selecionado={selecionado} setSelecionado={setSelecionado} />
      <Secao titulo="Tamanho do papel" opcoes={tamanhoPapel} chave="tamanhoPapel" selecionado={selecionado} setSelecionado={setSelecionado} />
      <Secao titulo="Tipo de impressão" opcoes={tipoImpressao} chave="tipoImpressao" selecionado={selecionado} setSelecionado={setSelecionado} />
      <Secao titulo="Gramatura" opcoes={gramatura} chave="gramatura" selecionado={selecionado} setSelecionado={setSelecionado} />
      <Secao titulo="Acabamento" opcoes={acabamento} chave="acabamento" selecionado={selecionado} setSelecionado={setSelecionado} />
      <Secao titulo="Entrega" opcoes={entrega} chave="entrega" selecionado={selecionado} setSelecionado={setSelecionado} />

      <View style={{ marginTop: 20, padding: 16, backgroundColor: "#e9ecef", borderRadius: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Resumo do pedido:</Text>
        {Object.entries(selecionado).map(([chave, valor]) => (
          <Text key={chave} style={{ color: "#333" }}>
            {chave}: {valor || "não selecionado"}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
