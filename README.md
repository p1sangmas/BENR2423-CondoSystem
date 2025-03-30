# Condo Management System

This is a RESTful API for managing a condominium system. It includes features for user authentication, visitor management, and more. The system is built using Node.js, Express, MongoDB, and JWT for authentication.

## Features

- **Login as Owner or Security**: Authenticate users based on their roles.
- **Register Owner**: Allows security personnel to register new owners.
- **Check-in Visitor**: Enables owners or security personnel to check in visitors.
- **View Visitors**: Retrieve a list of all visitors.
- **Change Visitor Pass Number**: Allows security personnel to update a visitor's pass number.
- **Check-out Visitor**: Enables security personnel to delete a visitor's record.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas or a local MongoDB instance

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd BENR2423-assignment-CondoSystem
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB:
   - Update the `uri` variable in [`index.js`](index.js) with your MongoDB connection string.

4. Start the server:
   ```bash
   node index.js
   ```

5. The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

- **Login as Owner**
  ```http
  POST /loginOwner
  Content-Type: application/json
  {
      "idNumber": "string",
      "password": "string"
  }
  ```

- **Login as Security**
  ```http
  POST /loginSecurity
  Content-Type: application/json
  {
      "idNumber": "string",
      "password": "string"
  }
  ```

### Owner Management

- **Register Owner**
  ```http
  POST /registerOwner
  Content-Type: application/json
  Authorization: Bearer <token>
  {
      "role": "owner",
      "name": "string",
      "idNumber": "string",
      "email": "string",
      "password": "string",
      "phoneNumber": "string"
  }
  ```

### Visitor Management

- **Check-in Visitor**
  ```http
  POST /checkinVisitor
  Content-Type: application/json
  Authorization: Bearer <token>
  {
      "role": "visitor",
      "name": "string",
      "idNumber": "string",
      "documentType": "string",
      "gender": "string",
      "birthDate": "YYYY-MM-DD",
      "age": "number",
      "documentExpiry": "YYYY-MM-DD",
      "company": "string",
      "TelephoneNumber": "string",
      "vehicleNumber": "string",
      "category": "string",
      "ethnicity": "string",
      "photoAttributes": "string",
      "passNumber": "string"
  }
  ```

- **View Visitors**
  ```http
  GET /viewVisitor
  Authorization: Bearer <token>
  ```

- **Change Visitor Pass Number**
  ```http
  POST /changePassNumber
  Content-Type: application/json
  Authorization: Bearer <token>
  {
      "savedidNumber": "string",
      "newpassNumber": "string"
  }
  ```

- **Check-out Visitor**
  ```http
  POST /checkoutVisitor
  Content-Type: application/json
  Authorization: Bearer <token>
  {
      "name": "string",
      "idNumber": "string"
  }
  ```

## Dependencies

- [Express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [MongoDB](https://www.npmjs.com/package/mongodb): MongoDB driver for Node.js.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Library for hashing passwords.
- [JSON Web Token (JWT)](https://www.npmjs.com/package/jsonwebtoken): Library for token-based authentication.

## Notes

- Ensure that the `privatekey` in [`index.js`](index.js) is kept secure and not exposed in production.
- Replace the hardcoded JWT tokens in [`client.http`](client.http) with dynamically generated tokens during testing.
