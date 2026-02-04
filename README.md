# vdesk-api
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=61DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

> [IMPORTANT]
> This is a sub-module of the **[Virtual Front Desk Main Repository](https://github.com/soroqn1/v-desk-main)**

---

### 🛠️ Architecture Highlights
- **Layered Pattern:** Controllers for logic, Models for DB abstraction, and Middleware for security.
- **ORM-driven:** Fully typed Sequelize models with migrations and seeders.
- **RESTful API:** Predictable resource-based routing.
- **CORS-enabled:** Ready for frontend integration.

---

### ⛓️ API Overview

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/session` | New session token | No |
| `GET` | `/api/tasks` | Get worksheet tasks | No |
| `POST` | `/api/task/:id/answer` | Submit task answer | **Yes** |

---