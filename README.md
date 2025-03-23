# MyPage - MERN Authentication 🔐

🚀 **MyPage** is a secure user authentication system built using the **MERN Stack**.  
It provides full authentication features, including **email verification, password encryption, and reset functionality**.

## 🔹 Features

✅ **User Registration & Login**  
✅ **Email Verification via OTP** (sent to registered email)  
✅ **JWT-based Authentication**  
✅ **Secure Password Encryption using bcrypt.js**  
✅ **Forgot Password & Reset Functionality**  
✅ **Logout System**  

---

## 🛠 Tech Stack

### **Frontend:**
- **React + Vite** – Fast & optimized frontend  
- **Tailwind CSS** – Modern UI styling  
- **React Toastify** – Elegant toast notifications  
- **Axios** – API communication  

### **Backend:**
- **Node.js & Express.js** – Server-side logic  
- **MongoDB & Mongoose** – Database for storing user data  
- **jsonwebtoken (JWT)** – Secure authentication  
- **bcryptjs** – Encrypting user passwords  
- **Nodemailer & Brevo SMTP** – Sending OTP emails  

---

## ⚡ How It Works

### **1️⃣ User Registration**
- Users sign up by providing an email and password.
- Once registered, they can request OTP verification.

### **2️⃣ User Login**
- Users can log in after registration.
- After logging in, they can request an OTP to verify their email.

### **3️⃣ Email Verification**
- A verification OTP is sent to the registered email.
- Users must enter the OTP to complete their verification.

### **4️⃣ Forgot Password**
- Users can request a password reset via OTP sent to their email.
- OTP verification allows setting a new password.

### **5️⃣ Logout**
- JWT token is invalidated to log out users securely.

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/HarshMaurya04/MyPage_MERN-Auth.git
cd MyPage_MERN-Auth
```

### **2️⃣ Backend Setup**
```sh
cd server
npm install
npm start
```
📌 Server will start running on: http://localhost:4000 or http://localhost:3000

### **3️⃣ Frontend Setup**
```sh
cd client
npm install
npm run dev
```
📌 React app will run on: http://localhost:5173 (default Vite port)

---

## 📌 API Endpoints

### 🔹 Auth Routes (`/api/auth`)

| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| POST   | `/register`          | Register new user                        |
| POST   | `/login`             | User login                               |
| POST   | `/logout`            | Logout user and clear session            |
| POST   | `/send-verify-otp`   | Send OTP to registered email (after login) |
| POST   | `/verify-account`    | Verify account with OTP                  |
| GET    | `/is-auth`           | Check if user is authenticated           |
| POST   | `/send-reset-otp`    | Send OTP for password reset              |
| POST   | `/reset-password`    | Reset password via OTP                   |

### 🔹 User Routes (`/api/user`)

| Method | Endpoint   | Description               |
|--------|-----------|---------------------------|
| GET    | `/data`   | Get authenticated user data |


---

## 📩 Email Functionality

- **Brevo SMTP Server** is used for sending emails.
- **Nodemailer** is configured to send OTPs for verification and password reset.

---

## 🔒 Security Features

✅ **Password Hashing** – Uses **bcrypt.js** for strong encryption  
✅ **JWT Authentication** – Secure access with token-based authentication  
✅ **CORS** – Allows secure cross-origin requests  



