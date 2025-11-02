# Blog API

A RESTful API for a blog platform built with Node.js, Express, and MongoDB (Mongoose), secured with JWT (JSON Web Token).

## Core Technologies
* Node.js
* Express.js
* Mongoose (MongoDB)
* JSON Web Token (JWT) for Authentication
* Bcrypt.js

## Quick Start

1.  **Install Packages:**
    ```bash
    npm install
    ```
2.  **Create `.env` File:**
    Create a `.env` file in the root directory and add the following variables:
    ```
    MONGO_URI=mongodb+srv://... (Your Atlas connection string)
    JWT_SECRET=your_super_secret_key
    ```
3.  **Start the Server (Dev Mode):**
    ```bash
    npm run dev
    ```