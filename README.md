# README.md

# My Node App

This project is a Node.js application that provides user registration and authentication functionalities using Express and MongoDB.

## Project Structure

```
my-node-app
├── controller
│   ├── addUserController.js  # Handles user addition
│   ├── authController.js      # Handles user authentication (login and registration)
├── db
│   └── connection.js          # Establishes connection to MongoDB
├── model
│   └── userModel.js           # Defines the user schema
├── routes
│   ├── user_routs.js          # Routes for user operations
│   └── auth_routs.js          # Routes for authentication operations
├── index.js                   # Entry point of the application
└── README.md                  # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-node-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Ensure MongoDB is running on your local machine or update the connection string in `db/connection.js`.

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

### User Registration

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "contact": "1234567890"
  }
  ```
- **Response:**
  - Success: 
    ```json
    {
      "message": "User registered successfully",
      "success": true
    }
    ```
  - Error:
    ```json
    {
      "message": "Error message",
      "success": false
    }
    ```

### User Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - Success:
    ```json
    {
      "message": "Login successful",
      "success": true,
      "token": "your_jwt_token"
    }
    ```
  - Error:
    ```json
    {
      "message": "Invalid credentials",
      "success": false
    }
    ```

## License

This project is licensed under the MIT License.