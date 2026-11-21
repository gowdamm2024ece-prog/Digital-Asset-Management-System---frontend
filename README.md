
# Digital Asset Management System – Frontend

The frontend of the Digital Asset Management System is built using React and Vite. It uses Redux Toolkit for state management and integrates with the Spring Boot backend through REST APIs secured using JWT authentication.

## 1. Technology Stack

- React
- Vite
- JavaScript
- Redux Toolkit – State Management
- Tailwind CSS – Styling
- Axios – API Communication
- React Router – Client-side Routing
- JWT – Authentication

## 2. Prerequisites

Ensure the following are installed:

- Node.js
- npm
- Git

Verify your installations:

```bash
node -v
npm -v
```

## 3. Clone the Repository

Clone the frontend repository:

```bash
git clone <repository-url>
```

Navigate to the frontend project directory:

```bash
cd Digital-Asset-Management-System---frontend
```

## 4. Environment Configuration

Before running the application, configure the environment variables.

### Step 1: Create the `.env` file

Locate the `.env.example` file in the frontend project directory.

Copy or rename `.env.example` to `.env`.

```text
Digital-Asset-Management-System---frontend/
├── .env.example
├── .env
├── package.json
├── vite.config.js
└── src/
```

### Step 2: Configure Environment Variables

Open the newly created `.env` file and replace the placeholder values with the correct backend url.

Ensure that the backend API URL points to your running Spring Boot backend.

**Important:**

- Do not upload your actual `.env` file to GitHub.
- Ensure `.env` is included in `.gitignore`.
- Keep `.env.example` updated whenever new environment variables are introduced.

## 5. Install Dependencies

Navigate to the frontend project directory and execute:

```bash
npm install
```

This installs all the dependencies specified in `package.json`.

## 6. Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

Once the server starts, Vite will display a local development URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to access the application.

## 7. JWT Authentication and API Communication

The frontend uses JWT (JSON Web Token) authentication to communicate securely with the Spring Boot backend.

### Authentication Flow

1. The user enters their login credentials through the frontend.
2. The frontend sends the credentials to the backend authentication API.
3. The backend validates the credentials and generates a JWT upon successful authentication.
4. The frontend receives the JWT from the backend and stores it according to the application's authentication implementation.
5. For subsequent authenticated API requests, the frontend retrieves the stored JWT and includes it in the HTTP Authorization header.
6. The backend validates the JWT and grants access based on the authenticated user's role and permissions.

### JWT Authorization Header

The frontend sends the token with subsequent protected API requests using the following format:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Example API Request

```javascript
axios.get("/api/endpoint", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

**Note:** The actual token storage mechanism and API request configuration are implemented in the frontend application. The example above illustrates the authorization header format.

## 8. State Management Using Redux Toolkit

The application uses Redux Toolkit to manage global application state.

Redux helps maintain and share application data across different components without unnecessary prop drilling.

It is used for managing application state such as:

- Authenticated user information
- Authentication state
- Other shared application data

The Redux store provides a centralized approach to managing state across the application.

## 9. Important Notes

- Ensure the Spring Boot backend is running before using the frontend.
- Verify that the backend API URL is correctly configured in `.env`.
- Make sure the backend CORS configuration allows the frontend origin.
- Ensure JWT tokens are included in subsequent protected API requests.
- Keep `.env.example` updated whenever new environment variables are introduced.
- Never commit actual `.env` files or sensitive credentials to GitHub.
- Use the configured login endpoint to authenticate before accessing protected functionalities.

