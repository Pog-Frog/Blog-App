# Next.js Blog App with Express.js and MongoDB

This is a simple blog application built with Next.js, Express.js, and MongoDB. The application allows users to create, read, update, and delete blog posts.

## Getting Started

To get started with this application, follow these steps:

1. Clone this repository using `git clone https://github.com/your-username/nextjs-blog-app.git`.
2. Install dependencies by running `npm install` in both the root directory and the `client` directory.
3. Start the development server by running `npm run dev`.
4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Installation

1. Clone this repository
    
    ```
    git clone https://github.com/username/repo-name.git
    ```
    
2. Install dependencies
    
    ```
    cd repo-name
    npm install
    ```
    
3. Set environment variables
    
    ```
    Create a .env file in the root directory with the following variables:
    MONGODB_URI=<your-mongodb-uri>
    ```
    
4. Start the development server by running `npm run dev`.

## Project Structure

The project is structured as follows:

- `client/`: The Next.js client-side code.
- `server/`: The Express.js server-side code.
- `shared/`: Shared code between the client and server.

## Technologies Used

- **Next.js:** A React framework for server-side rendering and static site generation.
- **Express.js:** A Node.js framework for building web applications and APIs.
- **MongoDB:** A NoSQL database used to store blog posts.
- **Mongoose:** A Node.js library used to interact with MongoDB.
- **Styled Components:** A CSS-in-JS library used to style the application.

## Features

The application includes the following features:

- User authentication using JWT tokens
- CRUD operations for blog posts
- Search functionality for blog posts
- Pagination for blog posts

## Contributing

Contributions are always welcome! If you would like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push your branch to your fork.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
