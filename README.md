# 💰 Expense Management System

## 📝 Description

Expense Management System is a full-stack web application designed to help users track, manage, and analyze their personal income and expenses. It provides secure authentication, structured transaction management, filtering options, analytics, and data export features to support efficient financial management.

---

## 🚀 Features

- **User Authentication**
  - User registration and login
  - Email verification
  - JWT-based authentication
  - Password encryption using bcrypt
  - Forgot password with email-based reset

- **Transaction Management**
  - Add, edit, and delete transactions
  - Categorize transactions as income or expense
  - Search transactions using keywords
  - Filter transactions by date range
  - Filter by income, expense, or both

- **Analytics & Insights**
  - Weekly, monthly, and yearly transaction views
  - Custom date range filtering
  - Charts and graphs for financial analysis

- **Data Export**
  - Export filtered transactions to Excel
  - Automatic date-based file naming

- **Secure Configuration**
  - Environment variable-based configuration using `.env`

---

## 🛠️ Technologies Used

- **Frontend**
  - React.js
  - Bootstrap
  - Ant Design
  - CSS

- **Backend**
  - Node.js
  - Express.js
  - Nodemailer

- **Database**
  - MongoDB

- **Security**
  - bcrypt
  - JSON Web Tokens (JWT)

---

## ⚙️ Installation

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/Darshan2042/personal-expense-manager.git
cd personal-expense-manager
```

### **Step 2: Install Dependencies**

#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd server
npm install
```

### **Step 3: Environment Variables**

Create a `.env` file inside the `server/` directory:

```env
MONGO_URL=your_mongodb_connection_string
PORT=8080

BCRYPT_SALT=10
JWT_SECRETE_KEY=your_jwt_secret_key
EXPIRE_IN=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com

CLIENT_URL=http://localhost:3000

FAST2SMS_API_KEY=your_fast2sms_api_key
```

Create a `.env` file inside the `client/` directory:

```env
REACT_APP_API_URL=http://localhost:8080
```

### **Step 4: Run the Application**

#### Start Backend
```bash
cd server
npm start
```

#### Start Frontend
```bash
cd client
npm start
```

The application will run at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

---

## 🚀 Deployment

### **Live Demo**

- **Frontend:** https://fastidious-tapioca-4b63d5.netlify.app
- **Backend:** https://personal-expense-manager-owt6.onrender.com

### **Deployment Guides**

For detailed deployment instructions, see:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [QUICK-DEPLOY.md](QUICK-DEPLOY.md) - Quick deployment reference

---

## 📸 Screenshots 