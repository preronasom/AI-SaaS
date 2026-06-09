# ⚡ Quick AI — AI-Powered Content Generation SaaS

A full-stack SaaS application that lets users generate AI-powered content (articles, background removals, and more) with a clean dashboard to track all creations.

🔗 **Live Demo:** [https://quickai-6c95b2.netlify.app](https://quickai-6c95b2.netlify.app)

---

## ✨ Features

- ✍️ **AI Article Writer** — Generate high-quality, engaging articles on any topic
- #️⃣ **Blog Title Generator** — Find the perfect catchy title for your blog posts
- 🖼️ **AI Image Generation** — Create stunning visuals powered by Cloudinary
- 🧹 **Background Removal** — Effortlessly remove backgrounds from images
- ✂️ **Object Removal** — Remove unwanted objects from images seamlessly
- 📄 **Resume Reviewer** — Get your resume reviewed by AI to improve your chances
- 📊 **User Dashboard** — Track all your past creations in one place
- 🔐 **Authentication** — Secure sign up / sign in via Clerk
- 👤 **Account Management** — Profile and security settings powered by Clerk

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Lucide React (icons)
- Axios
- React Hot Toast

**Backend**
- Node.js
- Express.js
- PostgreSQL

**Auth**
- Clerk

**AI / APIs**
- Groq API (article, blog & resume generation)
- Cloudinary (image generation & background removal)

**Deployment**
- Frontend → Netlify
- Database → Neon (PostgreSQL)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database (e.g. Neon / Supabase / local)
- Clerk account
- OpenAI API key

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/quick-ai-saas.git
cd quick-ai-saas

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Variables

Create a `.env` in `/server`:

```env
DATABASE_URL=your_neon_postgresql_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env` in `/client`:

```env
VITE_BASE_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Run Locally

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm run dev
```

---

## 📸 Screenshots

<img width="1877" height="882" alt="Screenshot 2026-06-09 220035" src="https://github.com/user-attachments/assets/da88c31f-d55c-4d19-a429-e7a081e4a12a" />
<img width="1920" height="892" alt="Screenshot 2026-06-09 214637" src="https://github.com/user-attachments/assets/2bc3141d-87fd-4945-b84d-199537e44c30" />
<img width="1920" height="898" alt="Screenshot 2026-06-09 214617" src="https://github.com/user-attachments/assets/1ca3088c-f961-4acb-8cee-6bf41dc7d625" />
<img width="1920" height="874" alt="Screenshot 2026-06-09 214551" src="https://github.com/user-attachments/assets/3888bfc8-880d-4a7f-854e-58dc1a2c7a6b" />
<img width="1920" height="906" alt="Screenshot 2026-06-09 214506" src="https://github.com/user-attachments/assets/e2a0e8b2-39cf-48d2-a197-ee4314ea9ea2" />
<img width="1920" height="890" alt="Screenshot 2026-06-09 214422" src="https://github.com/user-attachments/assets/e0bc7222-fa83-4739-9527-613cbe237ff2" />
<img width="1912" height="886" alt="Screenshot 2026-06-05 202504" src="https://github.com/user-attachments/assets/254b681b-8189-4ffc-914d-06252ffd7205" />

---

## 📄 License

MIT License — feel free to use and modify.

---

## 🙋‍♂️ Author

Built by Prerona Som — connect with me on [LinkedIn][(https://linkedin.com/in/your-profile)](https://www.linkedin.com/in/prerona-som/)
