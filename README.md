# 🌾 AgriLinker Web Application

AgriLinker is a full-stack agricultural marketplace web application that connects **farmers directly with buyers**. It also supports **fertilizer suppliers**, an **admin panel**, and AI-powered features. The platform enables product listing, ordering, inquiries, reviews, and agricultural advice.

---

## 🏗️ Repository Structure

```
Agrilinker_Web_Application/
├── agrilinker-frontend/     # React.js frontend
├── backend/                 # Spring Boot backend
├── node_modules/            # Root-level Express.js proxy/chatbot server
├── package.json             # Root Node.js app (Express + Google Generative AI)
└── README.md
```

There are **three runnable services**:
1. **React frontend** (`agrilinker-frontend/`) — the user-facing UI
2. **Spring Boot REST API** (`backend/`) — runs on port `8081`
3. **Express.js server** (root `package.json`) — powers a chatbot using the Google Gemini API

---

## ⚙️ Key Technologies

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Tailwind CSS, Framer Motion |
| **Backend** | Spring Boot 3.5, Java 17, Maven |
| **Database** | MongoDB Atlas (via Spring Data MongoDB) |
| **Auth** | JWT (JJWT library) + Spring Security |
| **AI / LLM** | Groq API (llama-3.3-70b) via Spring AI, Google Gemini (frontend chatbot), HuggingFace (sentiment analysis) |
| **PDF** | OpenPDF (backend invoices), jsPDF (frontend) |
| **Charts** | Recharts |
| **Notifications** | Server-Sent Events (SSE) |
| **HTTP Client** | Axios |

---

## 🗂️ Frontend Structure (`agrilinker-frontend/src/`)

```
src/
├── App.js               # Route definitions for all roles
├── context/
│   ├── AuthContext.js       # JWT token + user stored in localStorage
│   ├── CartContext.js       # Shopping cart state
│   └── NotificationContext.js
├── components/
│   ├── farmer/             # Farmer dashboard, product CRUD, orders, inquiries, sales
│   ├── Fertilizers/        # Fertilizer list/add/edit
│   ├── Advisor/            # CropAdvisor (AI-based)
│   ├── Header, Footer, Marketplace, CartPage, CheckoutPage, ...
│   └── ChatBot.jsx          # AI chatbot widget
├── pages/
│   ├── admin/              # AdminDashboard, Analysis, Complaints, Inquiries, Settings
│   ├── fertilizers/        # FertilizerSupplierDashboard
│   ├── support/            # SupportPage, SupportHistory, ContactUs
│   ├── Landing.jsx, Login.jsx, Register.jsx, IntroHome.jsx
│   └── AccessDenied.jsx
├── api/                    # Axios instances (api.js, auth.js)
└── services/               # FertilizerService.js
```

**Routing uses role-based protection** via `ProtectedRoute` with roles: `BUYER`, `FARMER`, `FERTILIZERSUPPLIER`, `ADMIN`.

---

## 🗂️ Backend Structure (`backend/src/main/java/com/agrilinker/backend/`)

```
backend/
├── controller/          # 18 REST controllers
│   ├── AuthController       # /api/auth (login, register)
│   ├── ProductController    # /api/products
│   ├── OrderController      # /api/orders
│   ├── CartController       # /api/cart
│   ├── FertilizerController # /api/fertilizers
│   ├── ReviewController     # /api/reviews
│   ├── AdminController      # /api/admin
│   ├── CropAdvisorController# AI crop recommendations
│   ├── ChatController       # AI chat (Groq/llama)
│   ├── McqController        # Quiz/poll features
│   ├── SupportTicketController
│   ├── ContactInquiryController
│   └── ...
├── service/             # Business logic (interface + impl pattern)
├── model/               # MongoDB document models (User, Product, Order, Fertilizer, Review, ...)
├── repository/          # Spring Data MongoDB repositories
├── dto/                 # Request/Response DTOs
├── security/            # JWT filter, JwtUtil, CustomUserDetailsService
├── config/              # SecurityConfig, WebConfig (CORS)
├── notifications/       # SSE-based real-time notifications
└── util/                # OrderNumberGenerator
```

---

## 🔑 Core Domain Features

1. **Authentication** — Register/login with JWT; roles determine dashboard
2. **Marketplace** — Buyers browse and order farmer products
3. **Farmer Portal** — Add/manage products, view orders, respond to inquiries, track sales
4. **Fertilizer Supplier** — Manage fertilizer listings
5. **Cart & Checkout** — Add to cart → checkout → order confirmation → order history
6. **AI Crop Advisor** — Recommends crops based on inputs (Groq LLM via Spring AI)
7. **AI Chatbot** — Gemini-powered chat widget (Express.js server)
8. **Reviews & Sentiment** — Product reviews with HuggingFace sentiment analysis
9. **Admin Panel** — User management, inquiry handling, complaints, analytics, settings
10. **Support Tickets & Contact Inquiries** — With AI-assisted replies
11. **MCQ/Polls** — Farmer knowledge quizzes
12. **Notifications** — Real-time SSE push notifications
13. **Invoices/PDF** — Backend-generated invoices (OpenPDF)
