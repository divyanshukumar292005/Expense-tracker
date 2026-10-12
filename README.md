Expense Tracker 💰

A full-stack web application to manage personal expenses. Add, edit, delete, search, and track expenses through a simple and user-friendly interface.

🚀 Live Demo

- Frontend: [Add your deployed frontend URL here]
- Backend API: https://expense-tracker-divyanshu.onrender.com

✨ Features

- ➕ Add new expenses
- ✏️ Edit existing expenses
- 🗑️ Delete expenses
- 🔍 Search expenses
- 📊 View total expenses
- 💾 Store expense data in MongoDB
- 🔄 Persistent data after refreshing the page
- 🌐 Deployed frontend and backend

🛠️ Tech Stack

Frontend

- React
- Vite
- JavaScript
- CSS

Backend

- Node.js
- Express.js
- REST API

Database

- MongoDB Atlas
- Mongoose

Tools & Deployment

- Git & GitHub
- Render
- VS Code

📁 Project Structure

Expense-tracker/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── ...
├── server/
│   ├── server.js
│   ├── Expense.js
│   └── package.json
├── package.json
└── README.md

⚙️ Run Locally

1. Clone the repository

git clone https://github.com/diyanshukumar292005/Expense-tracker.git
cd Expense-tracker

2. Install frontend dependencies

npm install

3. Configure the backend

cd server
npm install

Create a ".env" file inside the "server" directory:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Replace the placeholder with your own MongoDB connection string. Never upload your ".env" file or database credentials to GitHub.

4. Start the backend

From the "server" directory, run:

node server.js

5. Start the frontend

Open a separate terminal in the project root and run:

npm run dev

Open the local URL displayed by Vite in your browser.

🔌 API Endpoint

GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id

The API supports retrieving, creating, updating, and deleting expenses.

🎯 Project Goal

This project was built to practise full-stack web development, REST API integration, database operations, and deploying a web application.

👨‍💻 Author

Divyanshu Kumar

- GitHub: "@diyanshukumar292005" (https://github.com/diyanshukumar292005)