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
📦src
 ┣ 📂entities           # TypeORM entities (User, Ad)
 ┣ 📂features
 ┃ ┣ 📂auth             # Registration, login, auth guards
 ┃ ┣ 📂ads              # CRUD and business logic for ads
 ┃ ┗ 📂users            # CRUD and business logic for users
 ┣ 📂common             # Guards, decorators, constants
 ┗ 📜main.ts            # Entry point
```

---

## 📸 API Examples

### 🔑 Register

```http
POST /auth/register
```

```json
{
  "email": "test@example.com",
  "password": "123456",
  "nickname": "Ayxan"
}
```

### 📢 Create Ad

```http
POST /ads
Authorization: Bearer {token}
```

```json
{
  "title": "PlayStation 5",
  "description": "Brand new console with two controllers"
}
```

### 🔍 Search Ads

```http
GET /ads?search=playstation
```

---

## 🐳 Docker Setup

```bash
docker-compose up --build
```

Open [http://localhost:3000/api](http://localhost:3000/api) for Swagger documentation.

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
✅ Role and access validations verified.

---

## 👨‍💻 Author

Crafted with ❤️ by Ayxan Abbasov ([@ayxanabbasov](mailto\:ayxanabbasov535@gmail.com))

---

## 📄 License

MIT — [LICENSE](./LICENSE)

