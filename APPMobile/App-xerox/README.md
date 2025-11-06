# 👋 Bem-vindo ao projeto LVxerox

Este é o repositório oficial do app LVxerox, desenvolvido com React Native e Expo.  
Aqui você encontra tudo o que precisa para abrir, editar e rodar o projeto localmente no seu computador.

---

## 🚀 Como rodar o projeto no seu PC

1. **Baixe o projeto**

   - Faça o download do código-fonte (ou clone pelo GitHub, se preferir):  
     ```bash
     git clone https://github.com/seu-usuario/LVxerox.git
     ```
   - Depois, entre na pasta do projeto:
     ```bash
     cd App-xerox
     ```

2. **Instale o Node.js e o Expo**

   - Se ainda não tiver o Node.js, baixe em:  
     👉 https://nodejs.org/  
   - Em seguida, instale o Expo CLI globalmente:
     ```bash
     npm install -g expo-cli
     ```

3. **Instale as dependências do projeto**

   No diretório do projeto, rode:
   ```bash
   npm install
   ```

4. **Inicie o app**

   ```bash
   npx expo start
   ```

   Isso abrirá o Expo Developer Tools no seu navegador.  
   Lá você pode escolher como executar o app:

   - 📱 No celular: escaneie o QR Code com o aplicativo Expo Go  
     (disponível na App Store e Google Play).  
   - 💻 No emulador Android: clique em “Run on Android device/emulator”  
     (requer Android Studio configurado)  
   - 🍎 No simulador iOS: clique em “Run on iOS simulator”  
     (disponível apenas no macOS)  
   - 🌐 No navegador: clique em “Run in web browser” para testar a versão web.

---

## 🧩 Estrutura do projeto

O código principal está dentro do diretório **app**, e segue o padrão de  
roteamento baseado em arquivos do Expo Router.

```
App-xerox/
│
├── app/               # Telas principais do app
├── assets/            # Imagens, ícones e logos
├── scr/components/    # Componentes reutilizáveis
├── package.json       # Dependências e scripts
└── index.tsx            # Ponto de entrada do aplicativo
```

---

## 🔁 Reiniciar o projeto do zero

Se quiser limpar tudo e começar um app novo a partir desse template, use:
```bash
npm run reset-project
```

Esse comando move o código atual para o diretório **app-example/**  
e cria uma nova pasta **app/** em branco, pronta para começar.

---

## 📚 Recursos úteis

- 📖 Documentação do Expo: https://docs.expo.dev/
- 🧠 Guia do React Native: https://reactnative.dev/docs/getting-started
- 💬 Comunidade do Expo no Discord: https://chat.expo.dev
- 🐙 Expo no GitHub: https://github.com/expo/expo

---

## 💡 Dica

Se o app não abrir automaticamente ou aparecer erro de conexão no Expo Go,  
verifique se o celular e o PC estão na mesma rede Wi-Fi.
