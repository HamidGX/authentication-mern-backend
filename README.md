# authentication-mern-backend

> [!NOTE]
> This is an example of a test application, there are still things that can be improved.

This is a API REST application that provides the user with the following functionalities:

1. Registration.
2. Authentication.
3. Account confirmation via email.
4. Password reset.

Frontend here: [authentication-mern-frontend](https://github.com/HamidGX/authentication-mern-frontend)

## Requirements

1. Node: Version 20.10.0 was used in this case.
2. Package Manager: You have the option to choose between NPM, Yarn, or other alternatives.

## Installation

```bash
yarn install
yarn dev
```

## Build

```bash
yarn build
```

## Dependencies

These are some of the dependencies used in the project, along with their respective versions:

```bash
"bcrypt": "5.1.1",
"cors": "2.8.5",
"dotenv": "16.4.5",
"express": "4.18.3",
"jsonwebtoken": "9.0.2",
"mongoose": "8.2.0",
"nodemailer": "6.9.11"
```

## devDependencies

These are some of the devDependencies used in the project, along with their respective versions:

```bash
"@types/bcrypt": "5.0.2",
"@types/cors": "2.8.17",
"@types/express": "4.17.21",
"@types/jsonwebtoken": "9.0.6",
"@types/nodemailer": "6.4.14",
"ts-node-dev": "2.0.0",
"typescript": "5.3.3"
```

## Get URI and API KEY

To ensure the application functions correctly, you need to obtain your own API KEY by registering on the following websites:

1. [Mailtrap.io](https://mailtrap.io/): Email Delivery Platform that delivers just in time. Great for dev teams.
2. [MongoDB](https://www.mongodb.com/): It is a NoSQL document-oriented database system, open-source. Sign up on MongoDB to create and manage your database, and obtain the necessary connection credentials.

## Environment Variables

To configure the necessary environment variables for the application to function, follow these steps:

1. At the root of the project, create a file named .env.

2. Open the .env file and then define the necessary environment variables following this format:

```javascript
//.env example
MONGO_URI = 'YOUR_MONGODB_URI'
CORS_WHITELIST = 'http://localhost:5173,http://localhost:4173' or URL Production
PORT = 4000
JWT_SECRET = example
FRONTEND_URL = http://localhost:5173 or URL Production
EMAIL_USER = userexample
EMAIL_PASS = passwordexample
EMAIL_HOST = smtp.mailtrap.io
EMAIL_PORT = 2525
```

## API Reference

#### User Register

This route will create the user account, an email will be sent for the user to confirm their password and be able to log in.

```bash
  Endpoint: GET /api/users/
  URL Example: http://localhost:4000/api/users/
  Body:
  {
    "name": "example",
    "email": "prueba@gmail.com",
    "password": "example" // The password is hashed automatically
  }
  Response:
  {
    "msg": "User created successfully"
  }
```

#### User Login

The user will be able to log in only if they have a created account and if it has already been confirmed.

```bash
  Endpoint: GET /api/users/login
  URL Example: http://localhost:4000/api/users/login
  Body:
  {
    "email": "example@gmail.com",
    "password": "example" // The password is hashed automatically
  }
  Response:
  {
    "_id": "6603dbe18fb0cad6de2a6828",
    "name": "example",
    "email": "example@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV",
    "msg": "User authenticated successfully"
  }
```

#### User Confirm Account with Token

This route will confirm the user's account by sending an email with the token so they can confirm their account.

```bash
  Endpoint: GET /api/users/confirm/{id}
  URL Example: http://localhost:4000/api/users/confirm/{id} //the id must be written without the { }
  Response:
  {
    "msg": "User confirmed successfully"
  }
```

#### User Forgot Password

This route will send an email to the user with a token so they can reset their password.

```bash
  Endpoint: GET /api/users/forgot-password/
  URL Example: http://localhost:4000/api/users/forgot-password/
  Body:
  {
    "email": "example@gmail.com"
  }
```

#### User Forgot Password Check Token

Validates if the entered token is valid.

```bash
  Endpoint: POST /api/users/forgot-password/
  URL Example: http://localhost:4000/api/users/forgot-password/{token}
```

#### User Forgot Password, Reset Password

If the token is valid, the user will be allowed to change their password.

```bash
  Endpoint: POST /api/users/forgot-password/
  URL Example: http://localhost:4000/api/users/forgot-password/{token}
  Body:
  {
    "password": "newpassword" // The password is hashed automatically
  }
  Response:
  {
    "msg": "Password has been changed successfully"
  }
```

## Author

Developed by [HamidGX](https://github.com/HamidGX)
