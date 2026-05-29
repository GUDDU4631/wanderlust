````md
# WanderLust - Airbnb Clone

WanderLust is a full-stack Airbnb-inspired web application built with **Node.js**, **Express.js**, and **MongoDB**. Users can create accounts, become hosts, and create property listings with image uploads powered by **Cloudinary**.

---

## 🚀 Features

- User Authentication (Sign Up / Login / Logout)
- Host Registration
- Create, Edit, and Delete Listings
- Upload Property Images using Cloudinary
- MongoDB Database Integration
- Responsive UI
- Session & Flash Messages
- RESTful Routing
- MVC Project Structure

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Cloud Storage
- Cloudinary

### Authentication
- Passport.js
- Express Session

### Frontend
- EJS
- Bootstrap

---

## 📂 Project Structure

```bash
project-root/
│
├── models/
├── routes/
├── controllers/
├── views/
├── public/
├── utils/
├── middleware/
├── app.js
├── package.json
└── .env
````

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment Variables

Create a `.env` file in the root directory and add:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

DB_URL=your_mongodb_connection_string

SECRET=session_secret
```

---

## ▶️ Run the Project

```bash
node server.js
```

or for development:

```bash
node server.js
```

---

## 📸 Image Uploads

This project uses **Cloudinary** for storing listing images in the cloud.

---

## 🗄️ Database

MongoDB is used as the primary database for storing:

* User Information
* Listings
* Reviews
* Sessions

---

## 🔐 Authentication

Users can:

* Register an account
* Login securely
* Logout
* Become Hosts
* Manage their own listings

---

## 🌟 Future Improvements

* Map Integration
* Wishlist Feature
* Reviews & Ratings
* Admin Dashboard

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by GUDDU CHAUDHARY

```
```
