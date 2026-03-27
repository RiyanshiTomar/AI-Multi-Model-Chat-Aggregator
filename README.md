# 🤖 AI Multi-Model Chat Aggregator

A fault-tolerant **Express.js** backend that queries multiple AI model providers **concurrently** and returns all their responses in a single API call. One failing provider never blocks the others.

## ✨ Features

- **Multi-model support** — Groq (LLaMA 3), Mistral, OpenAI, HuggingFace
- **Concurrent requests** — all models are queried simultaneously using `Promise.allSettled`
- **Fault-tolerant** — if one provider fails, others still return their results
- **Secure** — API keys are server-side only, never exposed to the client
- **Clean REST API** — simple JSON request/response interface

## 🏗️ Project Structure

```
├── config/
│   └── env.js              # Centralized config & API key validation
├── controllers/
│   └── chatController.js   # Request handling and Promise.allSettled logic
├── routes/
│   └── chatRoutes.js       # Express route definitions
├── services/
│   └── aiService.js        # Individual provider integrations
├── .env.example            # Template for environment variables
├── server.js               # Express app entry point
└── package.json
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RiyanshiTomar/AI-Multi-Model-Chat-Aggregator.git
cd AI-Multi-Model-Chat-Aggregator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your API keys. You need **at least one** to get started.

| Key | Provider | Free Tier |
|---|---|---|
| `GROQ_API_KEY` | [Groq Console](https://console.groq.com/) | ✅ Yes |
| `MISTRAL_API_KEY` | [Mistral AI](https://console.mistral.ai/) | ✅ Yes |
| `OPENAI_API_KEY` | [OpenAI Platform](https://platform.openai.com/api-keys) | ❌ Paid |
| `HUGGINGFACE_API_KEY` | [HuggingFace](https://huggingface.co/settings/tokens) | ✅ Yes |

### 4. Start the server

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

Server runs on **http://localhost:5000** by default.

---

## 📡 API Endpoints

### `GET /health`
Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "AI Multi-Model Chat Aggregator API is running"
}
```

---

### `POST /api/chat`
Send a prompt to one or more AI models concurrently.

**Request Body:**
```json
{
  "prompt": "What is the capital of France?",
  "models": ["groq", "mistral"]
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `prompt` | `string` | ✅ | The message/question to send |
| `models` | `string[]` | ✅ | List of providers: `groq`, `mistral`, `openai`, `huggingface` |

**Success Response:**
```json
{
  "success": true,
  "prompt": "What is the capital of France?",
  "responses": [
    {
      "model": "groq",
      "status": "success",
      "data": "The capital of France is Paris."
    },
    {
      "model": "mistral",
      "status": "success",
      "data": "Paris is the capital of France."
    }
  ]
}
```

**Error Response (per model):**
```json
{
  "model": "openai",
  "status": "error",
  "message": "OPENAI_API_KEY is not configured securely on the server"
}
```

> A failed model returns `"status": "error"` in its entry — the overall request still succeeds for other models.

---

## 🧪 Quick Test with PowerShell

```powershell
# Health check
Invoke-RestMethod http://localhost:5000/health

# Query Groq + Mistral concurrently
$body = '{"prompt": "Explain recursion in one sentence.", "models": ["groq", "mistral"]}'
Invoke-RestMethod -Uri http://localhost:5000/api/chat -Method POST -Body $body -ContentType 'application/json'
```

## 🔒 Security Notes

- **Never commit your `.env` file** — it's in `.gitignore`
- All API keys are loaded server-side via `dotenv` and never returned to clients
- Use `.env.example` as the template — it contains no real secrets

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **HTTP Client**: Axios
- **AI SDK**: OpenAI SDK (used for Groq + Mistral via compatible base URLs)
- **Config**: dotenv

## 📄 License

MIT
