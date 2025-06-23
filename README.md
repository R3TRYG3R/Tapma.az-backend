# 🛍️ Tapma.az — Backend API

**Tapma.az** is a minimalist backend for a classified ads marketplace, built from scratch using **NestJS**, with a strong focus on security, architecture, and user experience.

## 🚀 Features

- 📌 User registration and JWT-based authentication
- 👤 Public and private user profiles
- 🖼️ Avatar support with auto-deletion of old files
- 📢 Ad management (up to 5 ads per user)
- 🖼️ Image upload for ads with secure replacement
- 🔍 Ad search and filtering by title
- 🛡️ Access restrictions (only the owner can modify ads)
- 🔒 Role-based access control (`user` / `admin`)
- 📎 Swagger API documentation
- 🐘 PostgreSQL via TypeORM
- 🐳 Docker and Docker Compose support

---

## 🧱 Tech Stack

- **NestJS** — scalable Node.js framework
- **PostgreSQL** — reliable relational database
- **TypeORM** — ORM for database operations
- **Swagger** — auto-generated API documentation
- **Multer** — file upload handling
- **class-validator** — DTO validation
- **bcrypt** — password hashing

---

## 📂 Project Structure

```bash
📦 src
 ┣ 📂app                # App module and global config
 ┣ 📂config             # Environment and database config
 ┣ 📂entities           # TypeORM entities (User, Ad)
 ┣ 📂features
 ┃ ┣ 📂ad               # Ad controller, service, module, DTOs
 ┃ ┣ 📂auth             # Auth controller, service, module, guards, strategies
 ┃ ┗ 📂users            # User controller, service, module, DTOs
 ┣ 📂shared
 ┃ ┣ 📂decorators       # Custom decorators
 ┃ ┗ 📂guards           # Role guards
 ┗ 📜main.ts            # Application entry point
```

---

## 📖 How It Works

This backend is a fully operational REST API designed for simplicity and clarity:

- Users register with email, password, and nickname. Passwords are securely hashed.
- Authenticated users can upload an avatar, which automatically replaces and deletes the previous file.
- Each user can create up to **5 ads**. Each ad can have one image.
- Uploaded images are stored locally and replaced safely on update.
- Ads can be **searched by title** using query parameters.
- Users can only update or delete **their own ads**, enforced with strict guards.
- Admins have extended access rights.
- All endpoints are **documented** via Swagger at `/api`.

---

## 🐳 Docker Setup

```bash
docker-compose up --build
```

Then open [http://localhost:3000/api](http://localhost:3000/api) to explore the Swagger documentation.

---

## ⚙️ Manual Setup (without Docker)

```bash
# Install dependencies
npm install

# Create a .env file from .env.example

# Start PostgreSQL and apply migrations (if any)

# Start the development server
npm run start:dev
```

---

## 🧪 Testing

✅ API tested via `curl` and Postman.\
✅ File uploads tested for both avatar and ad images.\
✅ Guard logic verified for ownership and roles.

Swagger preview:
<img width="1470" alt="Снимок экрана 2025-06-23 в 04 22 19" src="https://github.com/user-attachments/assets/22488d41-0af2-4b2e-b444-e3bf0af25aeb" />


---

## 👨‍💻 Author

Crafted with ❤️ by Ayxan Abbasov

