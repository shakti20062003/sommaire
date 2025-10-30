# 🧠 Sommaire

**Sommaire** is an AI-powered PDF summarization web application built using **Next.js**, **Clerk Authentication**, and **PostgreSQL**.  
It allows users to upload PDF documents, generate concise summaries using **OpenAI** and **Gemini APIs**, and manage all summaries within a modern, responsive dashboard.

🔗 **Live Demo:** [https://sommaire-tau-tan.vercel.app](https://sommaire-tau-tan.vercel.app)

---

## 🚀 Features

- 🔐 **User Authentication** — Secure login and session handling with Clerk.
- 📄 **PDF Upload** — Seamless document upload and parsing pipeline.
- 🤖 **AI Summarization** — Uses OpenAI API for primary summarization and Gemini API as a fallback.
- 💾 **Persistent Storage** — PostgreSQL database to store users, files, and summaries.
- 🎨 **Beautiful UI** — Modern rose-gray-orange themed gradients using Tailwind CSS.
- ⚙️ **Robust Error Handling** — Fallback logic and rate-limiting management.
- 🖼️ **Profile Integration** — Displays user’s Clerk profile image in the footer instead of text branding.
- ☁️ **Deployed on Vercel** — Fast, scalable, and globally accessible.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL |
| **Authentication** | Clerk |
| **AI Models** | OpenAI API, Gemini API |
| **Deployment** | Vercel |
| **Other Tools** | UploadThing, ESLint, Prettier |

---

## 🛠️ Getting Started

### 1. Prerequisites
Make sure you have:
- Node.js ≥ 18
- npm / pnpm / yarn / bun
- PostgreSQL installed and running
- API keys for OpenAI, Gemini, and Clerk

---
## 💡 How It Works

- User logs in via Clerk.
- Uploads a PDF document.
- The app sends the content to OpenAI for summarization.
- If OpenAI API fails (rate limit or error), it automatically switches to Gemini API.
- The summary is stored in PostgreSQL and displayed in the user’s dashboard.
- Users can view, download, and manage summaries anytime.

## 👤 Author

Shakti Prasad Barik
📧 Email: shaktiprasadbarik0490@gmail.com
🌐 GitHub: https://github.com/shakti20062003


