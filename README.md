# Qnotes - Full Stack Project 📝

Qnotes is a full-stack project developed using the MERN stack (MongoDB, Express.js, React, and Node.js), featuring a multiple-role-based login system with Google SSO login, GitHub SSO login, and traditional username and password login. This application allows users to create and manage notes, assign tasks to others, and includes administrative features for user management.

## Technologies and Features 🚀

### Backend Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/) for authentication
- [JWT](https://jwt.io/) for token-based authentication
- Cookies and local storage for user sessions
- Middleware for request handling and security
- HTTPS for secure communication

### Frontend Stack

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for efficient API data fetching
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start) version 6

## To Run Instructions 🛠️

### 1. Clone the Repository

```bash
git clone https://github.com/rooneyrulz/qnotes.git
```

## 2. Environment Configuration

- Navigate to the `frontend` and `backend` folders.
- Rename the `.env.example` files to `.env` in both folders.
- Update the `.env` files with your specific values.

## 3. Install Dependencies

- Open a terminal in the `frontend` and `backend` folders separately.
- Run the following command in both folders to install dependencies:

npm install

## 4. Run MongoDB Container

To use MongoDB for your project, you can run it in a Docker container. If you don't have Docker installed, you can follow the installation instructions on the [official Docker website](https://docs.docker.com/get-docker/).

1. Navigate to the `backend` folder:

    ```bash
    cd backend
    ```

2. Run the following command to start the MongoDB container:

    ```bash
    docker-compose up -d
    ```

    - If you encounter any issues, make sure Docker is properly installed and running.

    - If you're using a cloud-based MongoDB or have MongoDB already installed on your system, you can skip this step.

## 5. Start Servers

Now that MongoDB is set up, you can start the servers for the backend and frontend.

### Backend Server

1. In the `backend` folder, run the following command to start the server:

    ```bash
    npm run start:server
    ```

### Frontend Server

2. In the `frontend` folder, run the following command to start the React app:

    ```bash
    npm start
    ```

    - You can run both servers simultaneously by checking the `package.json` file inside the `backend` folder.

## 6. Access the Application

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Qnotes application.

### Default Admin Credentials

- **Username:** admin
- **Password:** 12345678

Feel free to customize and expand upon these instructions based on your specific project details.

Wishing you happy coding! 🚀✨👩‍💻👨‍💻
