<!-- Banner visual (pode ser substituído por uma imagem do seu projeto) -->
<h1 align="center">
  <img src="https://user-images.githubusercontent.com/99999999/your-banner-here.png" alt="HelpDesk-Chamados" width="60" />
  <br>HelpDesk-Chamados
</h1>

<p align="center">
  <b>Aplicação web para gestão interna de chamados (Helpdesk)</b> <br>
  <i>Frontend moderno com React, Vite e TailwindCSS</i>
</p>

---

## 🚀 Sobre o Projeto

O **HelpDesk-Chamados** é uma plataforma intuitiva para controle e resolução de chamados internos, permitindo que colaboradores abram solicitações, acompanhem o andamento e os administradores gerenciem e resolvam demandas com agilidade.

> **Demonstração:** _Adicione aqui um link ou GIF do projeto em funcionamento para valorizar ainda mais!_

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)** — Biblioteca para interfaces reativas.
- **[Vite](https://vitejs.dev/)** — Bundler rápido para desenvolvimento moderno.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para segurança e produtividade.
- **[TailwindCSS](https://tailwindcss.com/)** — Estilização por classes utilitárias.
- **[Axios](https://axios-http.com/)** — Requisições HTTP elegantes.
- **[React Router DOM](https://reactrouter.com/)** — Roteamento SPA.

---

## 🖼️ Principais Funcionalidades

### 👤 Usuário Comum
- Cadastro e login seguro.
- Abertura de chamados, com seleção de **prioridade** e **descrição detalhada**.
- Visualização de todos os seus chamados, com status e datas.
- Filtros inteligentes por título, data, prioridade e status.

### 🛡️ Administrador
- Acesso a todos os chamados da plataforma.
- Filtros avançados: título, data, prioridade, resolvidos/não resolvidos.
- Marcação de chamados como resolvidos com apenas um clique.

---

## 📂 Estrutura do Projeto

```
src/
 ┣ components/  # Componentes reutilizáveis da interface
 ┣ hooks/       # Hooks customizados (lógica compartilhada)
 ┣ services/    # Integração e regras de negócio
 ┣ apis/        # Configuração das APIs (ex: axios instances)
 ┣ App.tsx      # Composição principal da aplicação
 ┗ main.tsx     # Entry point
```

---

## ⚙️ Arquitetura

Este repositório é responsável pelo **frontend**. O backend RESTful está disponível em:  
➡️ [@vitoinacio/HelpDesk-Chamados-Backend](https://github.com/vitoinacio/HelpDesk-Chamados-Backend)

A comunicação se dá via **API REST** (Axios), promovendo desacoplamento e escalabilidade.

---

## 📦 Principais Dependências

```json
"dependencies": {
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.2",
  "tailwindcss": "^4.1.8",
  "@tailwindcss/vite": "^4.1.8",
  "axios": "^1.9.0"
}
```

<details>
<summary><strong>Veja todas as dependências</strong></summary>

```json
"devDependencies": {
  "@eslint/js": "^9.25.0",
  "@types/react": "^19.1.2",
  "@types/react-dom": "^19.1.2",
  "@vitejs/plugin-react": "^4.4.1",
  "eslint": "^9.25.0",
  "typescript": "~5.8.3",
  "vite": "^6.3.5"
}
```
</details>

---

## 🧑‍💻 Como Rodar Localmente

1. **Clone o projeto:**
   ```bash
   git clone https://github.com/vitoinacio/HelpDesk-Chamados.git
   cd HelpDesk-Chamados
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **(Opcional) Configure e inicie também o [backend](https://github.com/vitoinacio/HelpDesk-Chamados-Backend) para uso completo.**

---

## 💡 Diferenciais e Destaques

- **UI moderna** e totalmente responsiva.
- **Filtros dinâmicos** para busca eficiente de chamados.
- **Arquitetura escalável:** separação clara entre frontend e backend.
- **Código limpo e modular** (componentização e hooks).
- **Pronto para produção** com build otimizado via Vite.

---

## 👤 Autor

Desenvolvido com 💙 por [@vitoinacio](https://github.com/vitoinacio)  
Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/seu-linkedin)!

---

<p align="center">
  <img src="https://img.shields.io/badge/feito%20com-React-blue?style=for-the-badge&logo=react" alt="Feito com React" />
  <img src="https://img.shields.io/badge/styled%20by-TailwindCSS-38bdf8?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/build%20by-Vite-646cff?style=for-the-badge&logo=vite" alt="Vite" />
</p>
