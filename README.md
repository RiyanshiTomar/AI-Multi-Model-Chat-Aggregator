# 🤖 AI Multi-Model Chat Aggregator

A professional, fault-tolerant **Next.js + Express.js** application that allows you to compare responses from multiple AI models side-by-side in real-time.

## 🏗️ Project Structure

```
├── backend/              # Express.js Server
│   ├── services/        # AI Integrations
│   ├── controllers/     # Request Logic
│   └── server.js        # Entry Point
├── frontend/             # Next.js Frontend (Tailwind + TypeScript)
│   ├── components/      # UI Components
│   └── app/             # Next.js App Router
└── package.json         # Root scripts for easy management
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)

### 2. Quick Installation

```bash
# Clone the repository
git clone https://github.com/RiyanshiTomar/AI-Multi-Model-Chat-Aggregator.git
cd AI-Multi-Model-Chat-Aggregator

# Install all dependencies (Root, Backend, and Frontend)
npm run install:all
```

### 3. Environment Setup

Create a `.env` file in the **`backend/`** directory (using `backend/.env.example` as a template):

```env
PORT=5000
GROQ_API_KEY=your_key
MISTRAL_API_KEY=your_key
AZURE_OPENAI_API_KEY=your_key
AZURE_OPENAI_ENDPOINT=https://...
AZURE_OPENAI_DEPLOYMENT=...
```

### 4. Run the Project

You can run both parts from the root directory:

**Start Backend:**
```bash
npm run dev:backend
```

**Start Frontend:**
```bash
npm run dev:frontend
```

Open **[http://localhost:3000](http://localhost:3000)** to start chatting!

---

## ✨ Features

- **Concurrent Comparisons** — Query Groq, Mistral, and Azure OpenAI simultaneously.
- **Markdown Rendering** — Support for headers, lists, and code blocks.
- **Fault-Tolerant** — One failing provider never blocks the others.
- **Enterprise-Ready** — Integrated with Azure OpenAI Service.

## 📄 License

MIT
