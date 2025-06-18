# 🤖 AI HireBooster

### AI-Powered Mock Interview Platform with Resume Analysis, Voice Interviews, Real-Time Evaluation & Performance Analytics

**AI HireBooster** is a full-stack AI mock interview platform that helps candidates practice realistic **Technical and HR interviews** based on their role, experience, skills, projects, and resume.

The platform analyzes an uploaded PDF resume, generates personalized interview questions using an LLM, conducts a voice-enabled timed interview, evaluates every answer across multiple dimensions, and produces a detailed performance dashboard with downloadable PDF reports.

The application also includes Google authentication, interview history, a credit-based usage system, and Razorpay payment integration.

website: https://ai-hire-booster.onrender.com/
---

## ✨ Highlights

* 📄 AI-powered PDF resume analysis
* 🎯 Role and experience-specific interview generation
* 💼 Technical and HR interview modes
* 🧠 GPT-4o-mini through OpenRouter
* 🎙️ Voice-enabled interview experience
* 🔊 AI interviewer text-to-speech
* 📝 Speech-to-text answer capture
* ⏱️ Difficulty-based question timers
* 📊 AI answer scoring and feedback
* 📈 Interactive performance analytics
* 📚 Complete interview history
* 📥 Downloadable PDF interview reports
* 🔐 Google authentication with Firebase
* 🍪 JWT-based authenticated backend sessions
* 💳 Razorpay payment integration
* 🪙 Credit-based interview system
* 📱 Responsive React interface
* ☁️ Frontend and backend deployment support

---

# 🎯 What Problem Does AI HireBooster Solve?

Traditional interview preparation usually involves reading lists of common questions or practicing without receiving meaningful feedback.

That creates several problems:

* Questions are not personalized to the candidate.
* Candidates do not know whether their answers are actually good.
* Communication and confidence are difficult to measure.
* Resume-specific questions are rarely practiced.
* Candidates cannot easily track improvement over multiple interviews.
* Practicing alone does not feel like a real interview.

AI HireBooster creates a more realistic practice environment.

Instead of simply displaying generic questions, the platform builds an interview around:

* target role
* years of experience
* interview type
* resume content
* technical skills
* projects

Every submitted answer is then evaluated by AI for:

1. **Confidence**
2. **Communication**
3. **Correctness**

The candidate receives immediate feedback and a complete analytics report after the interview.

---

# 🚀 Core Features

## 1. Google Authentication

Users can sign in using their Google account.

The frontend uses **Firebase Authentication** with the Google provider. After successful authentication, user information is sent to the backend, where the application creates or retrieves the corresponding MongoDB user.

The backend then creates a JWT-based session.

### Authentication flow

```text
User
   ↓
Google Sign-In
   ↓
Firebase Authentication
   ↓
React Frontend
   ↓
Express Authentication API
   ↓
Create / Find MongoDB User
   ↓
Generate JWT
   ↓
Store Session Cookie
```

New users receive **100 interview credits by default**.

---

# 2. Resume Upload & AI Resume Analysis

Candidates can optionally upload their resume before starting an interview.

Supported input:

```text
PDF resume
Maximum upload size: 5 MB
```

The backend processes the resume using:

* Multer for file upload
* `pdfjs-dist` for PDF parsing
* OpenRouter for LLM access
* GPT-4o-mini for structured resume analysis

The system extracts information such as:

```json
{
  "role": "Software Engineer",
  "experience": "3 years",
  "projects": [
    "AI Interview Platform",
    "Video Analytics Service"
  ],
  "skills": [
    "Node.js",
    "React",
    "MongoDB",
    "AWS"
  ]
}
```

The extracted information automatically enriches the interview configuration.

### Resume processing flow

```text
PDF Resume
     ↓
Multer Upload
     ↓
Temporary Server File
     ↓
pdfjs-dist
     ↓
Extract Text From Every Page
     ↓
Clean Resume Text
     ↓
GPT-4o-mini
     ↓
Structured Candidate Profile
     ↓
Role + Experience + Projects + Skills
```

The temporary resume file is removed after processing.

---

# 3. Personalized AI Question Generation

After interview setup, the application sends the candidate context to the AI model.

Input can contain:

```text
Role
Experience
Interview Mode
