# SmartLearn LMS | AI-Powered Learning Management System

SmartLearn is a high-fidelity, responsive web application for a modern Learning Management System (LMS). It supports role-based access for Students and Teachers, interactive class materials, assignments, auto-scored quizzes, and Gemini AI features.

## 🚀 Key Features

*   **Authentication & Roles:** Secure Login & Register with password hashing and JWT authentication. Separate Student and Teacher dashboards.
*   **Course & Lesson Modules:** Upload lessons, attach PDF reading notes and lecture videos.
*   **Assignments & Grading:** Students submit files; teachers download submissions, add grades, and review feedback comments.
*   **Auto-Scoring Quizzes:** Students complete multiple-choice questionnaires and view scoring cards instantly.
*   **AI Quiz Generator:** Teachers paste lecture text and prompt Gemini API to automatically build 5 relevant multiple-choice questions.
*   **AI Notes Summarizer:** Teachers generate bulleted summaries of reading materials using Gemini.
*   **AI Study Assistant:** Students chat with an AI chatbot grounded on the lessons' note files.

---

## 🛠️ Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS v3, Lucide Icons, Axios.
*   **Backend:** Node.js, Express, Multer (file uploads), JWT, bcryptjs, pdf-parse.
*   **Database:** MongoDB via Mongoose **(with a zero-install local JSON-file fallback)**.

---

## 💾 Local JSON-File Database Fallback

To make this project extremely convenient for final-year college demonstrations, the backend is built with an **automatic database fallback mechanism**:
1. It attempts to connect to a local MongoDB server (`mongodb://localhost:27017/smartlearn`).
2. If MongoDB is not running or unavailable, it **gracefully falls back** to storing data in local JSON files in the `/backend/data/` folder.
3. The mock database fully replicates Mongoose model queries (`find`, `findOne`, `create`, `findByIdAndUpdate`, and `populate`). **No MongoDB installation is strictly required to run the demo!**

---

## 🤖 Gemini API Key Configuration

To enable the live AI features, add your Gemini API Key in the backend `.env` file:
1. Open [backend/.env](file:///C:/Users/SAKSHAM%20PATEL/.gemini/antigravity-ide/scratch/smartlearn/backend/.env)
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Google Gemini API Key.
3. *If no key is configured, the application will gracefully use mock generated responses, preventing any crashes during offline presentations.*

---

## 💻 Installation & Quick Start

### 1. Install Dependencies
Make sure you run the install command inside the workspace folder.
*   **Backend:** `cd backend && npm install`
*   **Frontend:** `cd frontend && npm install`

### 2. Start Servers
At the root of the project, run the startup script:
*   Double-click the [run-dev.bat](file:///C:/Users/SAKSHAM%20PATEL/.gemini/antigravity-ide/scratch/smartlearn/run-dev.bat) runner file on Windows, or execute:
    ```bash
    ./run-dev.bat
    ```

*   **Frontend UI:** [http://localhost:3000](http://localhost:3000)
*   **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 🎓 Demo Flow Suggestion
1.  **Register a Teacher Account** (select "Teacher" join role card in registration).
2.  **Create a New Course** in the catalog dashboard.
3.  **Add a Lesson:** Upload a mock lecture video and a notes PDF file. Click **AI Summarize** to view the bulleted summary.
4.  **Create a Quiz:** Use the **AI Quiz Generator** by pasting lecture notes to instantly build 5 MCQs. Save the quiz.
5.  **Create an Assignment** with instructions and a due date.
6.  **Register a Student Account** in a new window.
7.  **Enroll in the Course** from the catalog.
8.  **Study:** Go to the lessons tab, download the PDF, watch the video, and view the AI notes summary.
9.  **Ask AI:** Open the **AI Assistant** chat, select the course context, and ask a question.
10. **Assessments:** Complete the quiz to see auto-scoring and reviews. Upload a file to submit the assignment.
11. **Grading:** Log back into the Teacher account, navigate to the assignment submissions, review the student's work, and save their grade. Log back as student to verify grades.
