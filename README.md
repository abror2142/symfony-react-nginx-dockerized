<h1 align="center">📝 Tasks Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" />
  <img src="https://img.shields.io/badge/docker-ready-blue.svg" />
  <img src="https://img.shields.io/badge/backend-symfony-6e64f8.svg" />
  <img src="https://img.shields.io/badge/frontend-react-61dafb.svg" />
  <img src="https://img.shields.io/badge/proxy-nginx-brightgreen.svg" />
</p>

<p align="center">
  🚀 A simplest task management application built with <strong>Symfony</strong>, <strong>React</strong>, <strong>Nginx</strong>, and fully <strong>Dockerized</strong> for smooth deployment and emphasizing containerization of technologies.
</p>

---

## ✨ Features

✅ Task creation, editing, and deletion  
✅ User-friendly React frontend  
✅ Symfony backend, API Platform
✅ Reverse proxy with Nginx  
✅ Easy-to-use Docker setup  

---

## 🏗️ Project Structure

📦 tasks-app
 - ┣ 📂 symfony          # Symfony API backend
 - ┣ 📂 react            # React frontend
 - ┣ 📂 nginx            # Nginx reverse proxy config
 - ┣ 📄 compose.yaml
 - ┗ 📄 README.md

---

## ⚙️ Technologies Used

| Layer       | Technology |
|-------------|------------|
| Frontend    | React, Vite, TailwindCSS |
| Backend     | Symfony, Doctrine ORM, API Platform |
| Reverse Proxy | Nginx |
| Database    | PostgreSQL |
| DevOps      | Docker, Docker Compose |

---

## 🛠️ Build & Run Your App

### 1. Clone the repository
```bash
git clone https://github.com/abror2142/symfony-react-nginx-dockerized
cd symfony-react-nginx-dockerized
```

### 2. Environment Configuration
Create your .env files for both backend and frontend (examples are provided):

`cp env.example .env`


`cp symfony/.env.dev symfony/.env`

Update environment variables as needed.

### 📦 Docker Compose

`docker compose up`


Visit `http://localhost:80`


Enjoy and Customize as much as you want!

---

🙌 Acknowledgements
- [Symfony](https://symfony.com/)
- [React](https://react.dev/)
- [Docker](https://www.docker.com/)
- [Nginx](https://nginx.org/)
- And many more...

