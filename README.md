# SynchroDocs-API

This is the backend for SynchroDocs, a collaborative online document editor. The backend is built with Node.js, Express, MongoDB, and Socket.io for real-time collaboration.

frontend: https://www.github.com/ujjwal-bh/synchrodocs-ui

## Features

- Real-time collaborative editing using Socket.io
- User authentication and authorization with JWT
- RESTful API for document management
- Document version history

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v12.x or later)
- npm (v6.x or later)
- MongoDB (v4.x or later)

### Steps

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

    The backend server should now be running on `http://localhost:5000`.

## API Endpoints

- **User Authentication**:
  - POST `/api/auth/register` - Register a new user
  - POST `/api/auth/login` - Authenticate a user

- **Document Management**:
  - GET `/api/documents` - Get all documents for the authenticated user
  - POST `/api/documents` - Create a new document
  - GET `/api/documents/:id` - Get a specific document by ID
  - PUT `/api/documents/:id` - Update a document by ID
  - DELETE `/api/documents/:id` - Delete a document by ID

## Dependencies

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (for authentication)
- Socket.io (for real-time collaboration)

## Contact

For any questions or issues, please open an issue in the repository or contact us at support@synchrodocs.com.
