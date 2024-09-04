# 📇 Contact Management API

Welcome to the **Contact Management API**, a RESTful API built using Express.js and Prisma ORM with a MySQL database. This API provides endpoints for managing users, contacts, and addresses.

## 📋 Table of Contents
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
  - [User Services](#user-services)
  - [Contact Services](#contact-services)
  - [Address Services](#address-services)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features
- User registration, login, and account management.
- Create, update, search, and delete contacts.
- Add, edit, view, and remove addresses associated with contacts.

## 🚀 Getting Started
To get a local copy of the project up and running, follow these simple steps.

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ilham-Faizal-Hamka/Contact-Management-NodeJs.git
   cd Contact-Management-NodeJs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   Ensure you have a MySQL database set up. You can use the provided Prisma schema to set up the database tables.

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

## ⚙️ Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your MySQL credentials.

## ▶️ Running the Application

To start the server, run:

```bash
npm start
```

The server will be running on `http://localhost:5000`.

## 📚 API Documentation

### **User Services**
| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| POST   | `/api/users`          | Register a new user       |
| POST   | `/api/users/login`    | Login a user              |
| PATCH  | `/api/users/:id`      | Update user information   |
| GET    | `/api/users/:id`      | Get user account details  |
| DELETE | `/api/users/logout`   | Logout user               |

### **Contact Services**
| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/api/contacts`           | Create a new contact       |
| PUT    | `/api/contacts/:contactId`| Edit an existing contact   |
| GET    | `/api/contacts/:id`       | Get specific contact       |
| GET    | `/api/contacts/`          | Search contacts            |
| DELETE | `/api/contacts/:id`       | Delete a contact           |

### **Address Services**
| Method | Endpoint                                      | Description                        |
|--------|-----------------------------------------------|------------------------------------|
| POST   | `/api/contacts/:contactId/addresses`          | Create a new address               |
| PUT    | `/api/contacts/:contactId/addresses/:addressId`| Update an address                  |
| GET    | `/api/contacts/:contactId/addresses/:addressId`| Get address of a specific contact  |
| DELETE | `/api/contacts/:contactId/addresses/:addressId`| Delete an address                  |

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.