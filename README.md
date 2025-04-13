# WhatsApp Clone 💬

A real-time chat application built with the **MERN stack**, featuring **role-based messaging** for special interest-based groups like the *Cricket Community*.

---

## 🌐 Live Preview

[[Demo Video Link for now]](https://drive.google.com/file/d/1dfKacmrbttGCwC8vMlZG7BiXli0dSy_4/view?usp=sharing)

---

## 🚀 Tech Stack

### Backend
- Node.js & Express.js – RESTful API
- MongoDB – NoSQL database
- Socket.IO – Real-time messaging
- JWT – Secure authentication
- Cloudinary – Profile image uploads
- Bcrypt – Password hashing

### Frontend
- React.js – UI Library
- Chakra UI – Component styling
- Styled Components – Additional CSS-in-JS styling
- React Router – Routing
- Socket.IO Client – Real-time communication
- Axios – API requests

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Cloudinary account

---

## 🔐 Environment Variables

### Backend (.env)
PORT=5000  
DB_URI=&lt;your_mongodb_uri&gt;  
JWT_SECRET=&lt;your_jwt_secret&gt;  
JWT_EXPIRE=5d  
COOKIE_EXPIRE=5  
NODE_ENV=development  
CLOUDINARY_CLOUD_NAME=&lt;your_cloudinary_cloud_name&gt;  
CLOUDINARY_API_KEY=&lt;your_cloudinary_api_key&gt;  
CLOUDINARY_API_SECRET=&lt;your_cloudinary_api_secret&gt;  
FRONTEND_URL=http://localhost:3000  

### Frontend (client/.env)
REACT_APP_PROJECT_URL=http://localhost:5000

---

## 🛠 Installation

### Backend Setup
```bash
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

---

## 💻 Running the App

### Run Backend
```bash
npm run dev
```

### Run Frontend
```bash
cd client
npm start
```

### Run Both (Optional)
Use a tool like `concurrently`:
```bash
npm install -g concurrently
concurrently "npm run dev" "cd client && npm start"
```

---

## 📁 Folder Structure

```
root/
│
├── client/               # React frontend
├── controllers/          # Route handlers
├── models/               # Mongoose schemas
├── routes/               # API routes
├── middleware/           # Auth & error middleware
├── sockets/              # Real-time logic
├── config/               # DB and cloud configs
└── server.js             # Main server entry
```

---

## ✨ Features

- JWT-based Auth with Cookies  
- 1-on-1 and Group Chats  
- Role-based restrictions in “Cricket Community”  
- Profile picture uploads (Cloudinary)  
- Interest-based access control  
- Typing indicators  
- Real-time updates using Socket.IO  

---

## 🧠 Role-Based Chat Control (Cricket Community)

### Interest Selection
During signup, users choose an interest:
- "Playing Cricket" 🏏
- or "Watching Cricket" 📺

### Group Logic
- All users are added to **Cricket Community**
- Only **players** can send messages

### Enforcement
- **Frontend**: Input box is disabled for watchers
- **Backend**: Messages from watchers are rejected

### Key Implementation Details
- `isSpecialGroup` flag in chat model
- `canType()` & `isTypingAllowed()` functions in frontend
- `sendSingleMessage` controller enforces final check in backend

---

## 📸 Demo

https://drive.google.com/file/d/1dfKacmrbttGCwC8vMlZG7BiXli0dSy_4/view?usp=sharing

---

## 👨‍💻 Author

**Sai Ritesh Domakuntla**  
🔗 [Portfolio](https://sairiteshd.vercel.app)  
🐱 [GitHub](https://github.com/sairiteshdomakuntla)  
💼 [LinkedIn](https://linkedin.com/in/sai-ritesh-domakuntla)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

---

## 📬 Contact

For any questions, feel free to reach out via [contact form](https://sairiteshd.vercel.app/#contact)
