# QuizMaster 🎯

A modern, interactive quiz application built with React that allows users to test their knowledge across multiple categories.

## 🎨 Design

View the complete UI/UX designs on Figma:
[QuizMaster Figma Designs]https://www.figma.com/design/TLnCjwH7xuSB3MzaUyieKY/QuizMaster---UI-Designs?node-id=0-1&t=kRRcxLfqurnc0WR8-1

## 📱 Features

- **User Authentication**: Login and Sign up functionality
- **Multiple Categories**: Science, History, Geography, Sports, Movies, Music
- **Interactive Gameplay**: Timed questions with multiple choice answers
- **Score Tracking**: Real-time score calculation
- **Leaderboard**: Global rankings and competition
- **Responsive Design**: Works on mobile, tablet, and desktop

## 🛠️ Technologies Used

- **Frontend**: React.js
- **Styling**: CSS3
- **State Management**: React Context API / useState
- **Routing**: React Router v6
- **Storage**: LocalStorage for user data
- **Deployment**: Vercel

## 📂 Project Structure

```
quizmaster-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── AnswerOption.jsx
│   │   ├── ProgressBar.jsx
│   │   └── Timer.jsx
│   ├── pages/            # Main screen components
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Categories.jsx
│   │   ├── Gameplay.jsx
│   │   ├── Results.jsx
│   │   └── Leaderboard.jsx
│   ├── context/          # State management
│   ├── data/             # Quiz questions
│   │   └── questions.json
│   ├── styles/           # CSS files
│   ├── utils/            # Helper functions
│   ├── assets/           # Images and icons
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Hygue4/quizmaster-app.git
cd quizmaster-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📅 Development Timeline

**Week 1: Design & Setup** ✅

- Figma designs completed
- Project structure created
- GitHub repository initialized

**Week 2: Core Functionality** (In Progress)

- Component development
- Quiz logic implementation
- State management setup

**Week 3: Polish & Deploy**

- Testing and bug fixes
- Responsive design refinement
- Deployment to Vercel

## 🎯 Current Progress

- [x] Figma designs (6 screens completed)
- [x] GitHub repository setup
- [x] React project initialization
- [x] Folder structure created
- [x] Component development 
- [x] Quiz logic implementation
- [x] Routing setup
- [x] Styling
- [ ] Deployment

## 👤 Author

**Hygue Ndanyuzwe**

- GitHub: [@Hygue4](https://github.com/Hygue4/-quizmaster-app.git)
- ALX Software Engineering Program

## 📝 License

This project is part of the ALX Software Engineering Capstone Project.

## 🙏 Acknowledgments

- ALX Africa for the opportunity
- Figma community for design inspiration
- React documentation and community

---

**Status**: 🚧 Work in Progress | **Week**: 2/3 Complete
