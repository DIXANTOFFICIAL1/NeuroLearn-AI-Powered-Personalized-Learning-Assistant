<div align="center">

# 🎓 NeuroLearn AI
### AI-Powered Personalized Learning Assistant

An intelligent full-stack educational platform that leverages Artificial Intelligence to provide personalized tutoring, concept explanations, quiz generation, learning roadmaps, career guidance, and progress tracking all in one unified application.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![Groq](https://img.shields.io/badge/AI-Groq_API-6E56CF?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📖 Overview

NeuroLearn AI is a modern AI-powered learning platform designed to make education more personalized, interactive, and efficient. Instead of relying on multiple websites for tutoring, quizzes, learning roadmaps, and career guidance, NeuroLearn AI combines all these capabilities into a single intelligent application.

The platform uses **React.js** for the frontend, **Node.js + Express.js** for the backend, **Groq AI API** to generate fast, context-aware educational responses, and **MongoDB Atlas** for persistent storage of learning statistics and recent activity.

---

# ✨ Key Features

- 🤖 AI Tutor for instant question answering
- 📚 AI-powered topic explanations
- 📝 Dynamic quiz generation
- 🛣️ Personalized learning roadmap generation
- 💼 AI Career Guidance
- 📊 Dashboard with activity and usage statistics
- 💾 Persistent statistics and activity using MongoDB
- 🔄 Reset learning progress functionality
- ⚡ Fast AI responses using Groq API
- 🎨 Responsive and modern user interface
- 🧩 20+ reusable React components
- 🔄 Modular and scalable architecture

---

# 🏗️ System Architecture

The application follows a **Three-Tier Architecture**:

```text
Users
   │
   ▼
React Frontend
   │
   ▼
Node.js + Express Backend
   │
   ├──────────────► Groq AI API
   │                    │
   │                    ▼
   │              AI Generated Content
   │
   └──────────────► MongoDB Atlas
                        │
                        ▼
              Persistent Statistics
              & Recent Activity
```

The frontend communicates with the backend through RESTful APIs. The backend handles AI requests through Groq and stores learning statistics and recent activity in MongoDB.

---

# 🚀 Technology Stack

## Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Axios
- React Router

## Backend
- Node.js
- Express.js
- RESTful APIs
- Mongoose

## AI
- Groq API

## Database
- MongoDB Atlas

## Development Tools
- Git
- GitHub
- VS Code
- Postman

---

# 📂 Project Structure

```text
NeuroLearn-AI/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AnswerReveal.jsx
│   │   │   ├── CareerSkillTags.jsx
│   │   │   ├── ClearResultButton.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── CopyAllButton.jsx
│   │   │   ├── CopyButton.jsx
│   │   │   ├── DifficultyBadge.jsx
│   │   │   ├── DownloadButton.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── InputClearButton.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── PrimaryButton.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── QuestionProgress.jsx
│   │   │   ├── QuizScoreCard.jsx
│   │   │   ├── RegenerateButton.jsx
│   │   │   ├── SectionNav.jsx
│   │   │   └── SuggestionChips.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Career.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Explain.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── Roadmap.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   │   └── Stats.js
│   ├── services/
│   │   └── aiService.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│   └── README.md
│
├── assets/
│   ├── architecture.png
│   ├── dashboard.png
│   ├── quiz.png
│   ├── roadmap.png
│   └── career.png
│
├── .gitignore
├── LICENSE
└── README.md
```
---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/DIXANTOFFICIAL1/NeuroLearn-AI-Powered-Personalized-Learning-Assistant.git
cd NeuroLearn-AI-Powered-Personalized-Learning-Assistant
```

---

## Install Frontend

```bash
cd client
npm install
npm run dev
```

---

## Install Backend

Open a new terminal:

```bash
cd server
npm install
npm start
```

---

# 🔐 Environment Variables

### Backend

Create a `.env` file inside the `server` directory.

```env
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
```

### Frontend

Create a `.env` file inside the `client` directory.

```env
VITE_API_URL=your_backend_api_url
```

### Environment Variable Details

- `GROQ_API_KEY` → Used for AI response generation
- `MONGODB_URI` → Used to connect the backend to MongoDB Atlas
- `VITE_API_URL` → Specifies the backend API URL used by the React frontend

**Never commit your `.env` files or expose your API keys publicly.**

---

# 🌐 Deployment

NeuroLearn AI is deployed using a full-stack cloud architecture.

### Frontend — Vercel

https://neurolearn-ai-powered-personalized.vercel.app/

The React frontend is hosted on **Vercel**.

### Backend — Render

https://neurolearn-backend-hism.onrender.com/

The Node.js + Express backend is hosted on **Render**.

### Database — MongoDB Atlas

MongoDB Atlas provides persistent storage for:

- Learning statistics
- Recent activity
- Dashboard progress data

### AI — Groq API

Groq API powers the AI-generated responses across the learning modules.

### Deployment Architecture

```text
React Frontend
      │
      ▼
   Vercel
      │
      ▼
Node.js + Express Backend
      │
      ├──────────────► Groq API
      │
      └──────────────► MongoDB Atlas
```

---

# 💻 Usage

Open the live application:

https://neurolearn-ai-powered-personalized.vercel.app/

Select any module such as:

- AI Tutor
- Explain Topic
- Quiz Generator
- Roadmap Planner
- Career Guidance
- Dashboard

Enter your query and receive AI-generated responses.

The Dashboard tracks activity across all modules and stores statistics and recent activity persistently in MongoDB.

The application also provides a **Reset** option that allows users to clear their learning statistics and recent activity and start again.

---

# 📊 Dashboard & Persistence

NeuroLearn AI includes a dashboard that tracks learning activity across all major modules.

The dashboard displays:

- 🤖 AI Tutor usage
- 💡 Explain usage
- 📝 Quiz attempts
- 🗺️ Roadmap activity
- 💼 Career guidance activity
- 📈 Overall learning progress
- 📌 Recent activity history
- 💾 Persistent data using MongoDB

Statistics and recent activity are stored in MongoDB so they remain available after restarting the backend server.

The Dashboard also provides a **Reset** option that allows users to clear their learning statistics and recent activity and start again.

---

# 📸 Screenshots

## Dashboard

![Dashboard](./assets/dashboard.png)

---

## AI Tutor

![Tutor](./assets/tutor.png)

---

## Quiz Generator

![Quiz](./assets/quiz.png)

---

## Learning Roadmap

![Roadmap](./assets/roadmap.png)

---

## Career Guidance

![Career](./assets/career.png)

---

# 🔄 Application Workflow

1. User selects a module.
2. User enters a topic, role, or question.
3. React frontend sends a request to the Express backend.
4. Backend processes the request.
5. Backend communicates with the Groq AI API.
6. Groq generates the requested AI content.
7. Backend returns the response to the frontend.
8. React displays the generated content.
9. Module usage statistics and recent activity are updated.
10. Statistics and activity are persisted in MongoDB.
11. Dashboard retrieves and displays the stored learning data.

---

# 📌 Modules

| Module | Description |
|---------|-------------|
| AI Tutor | Answers academic questions using AI |
| Explain | Generates simplified explanations |
| Quiz Generator | Creates topic-based quizzes |
| Roadmap Planner | Builds structured learning paths |
| Career Guidance | Provides career recommendations and role guidance |
| Dashboard | Displays statistics, progress, tips, and recent activity |

---

# 🧩 Reusable Components

NeuroLearn AI uses a component-based React architecture with **20+ reusable components**.

Examples include:

- `SuggestionChips.jsx`
- `LoadingState.jsx`
- `ErrorMessage.jsx`
- `CopyButton.jsx`
- `DownloadButton.jsx`
- `ProgressBar.jsx`
- `QuizScoreCard.jsx`
- `QuestionProgress.jsx`
- `AnswerReveal.jsx`
- `DifficultyBadge.jsx`
- `CareerSkillTags.jsx`
- `SectionNav.jsx`
- `ConfirmDialog.jsx`
- `InputClearButton.jsx`
- `RegenerateButton.jsx`

These components help keep the application modular, reusable, and easier to maintain.

---

# 🎯 Project Highlights

- Full-Stack AI Application
- Component-Based React Architecture
- 5 AI-Powered Learning Modules
- RESTful API Design
- Groq AI Integration
- MongoDB Atlas Integration
- Mongoose-Based Database Integration
- Persistent Learning Statistics
- Persistent Recent Activity
- Dashboard Progress Tracking
- Reset Progress Functionality
- 20+ Reusable React Components
- Responsive UI
- Modular Backend
- Scalable Project Structure

---

# 🌍 SDG Alignment

This project contributes to:

### **SDG 4 – Quality Education**

NeuroLearn AI promotes accessible, personalized, and technology-driven education by helping learners understand concepts, assess knowledge, plan learning paths, and explore career opportunities.

---

# 🔮 Future Scope

- User Authentication
- User-Specific Learning Profiles
- Voice-Based AI Tutor
- AI Resume Builder
- Coding Compiler
- Placement Interview Preparation
- Advanced Learning Analytics
- Mobile Application
- Multi-language Support
- Cloud Deployment
- Gamification and Achievement Badges

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Dixant Soni**

- 🎓 B.Tech CSE (AI & Data Science)
- Indian Institute of Information Technology Manipur
- Passionate about Software Engineering, Artificial Intelligence, and Full-Stack Development

### GitHub

https://github.com/DIXANTOFFICIAL1

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

**Building intelligent solutions for smarter learning. 🚀**

</div>
