# Personal Portfolio

This is a full-stack personal portfolio application built with Next.js for the frontend and a Node.js/Express.js backend. It showcases my projects and blog posts, and it includes a dashboard for managing content.

## Live Demo

The live version of this application is deployed on Vercel. You can view it here:

[https://hamad-phi.vercel.app/](https://hamad-phi.vercel.app/)

## Features

- **Project Showcase:** Display a list of projects with details, including descriptions, technologies used, and links to live demos and source code.
- **Blog:** A personal blog to share articles and tutorials.
- **Dashboard:** A protected area for managing projects and blog posts (create, edit, delete).
- **Authentication:** User authentication with JWT to secure the dashboard.
- **Responsive Design:** The application is fully responsive and works on all devices.

## Technologies Used

### Frontend

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications.
- [Axios](https://axios-http.com/) - Promise-based HTTP client.
- [Bun](https://bun.sh/) - JavaScript runtime and package manager.

### Backend

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [Express.js](https://expressjs.com/) - Web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
- [PostgreSQL](https://www.postgresql.org/) - Open-source relational database.
- [JSON Web Tokens (JWT)](https://jwt.io/) - For securing the API.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Bun](https://bun.sh/docs/installation)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/hamadismail/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Set up the backend:**

   - Navigate to the `server` directory:
     ```sh
     cd server
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Set up your `.env` file by copying the example:
     ```sh
     cp .env.example .env
     ```
   - Add your PostgreSQL database URL to the `.env` file:
     ```
     DATABASE_URL="postgresql://user:password@host:port/database"
     ```
   - Apply database migrations:
     ```sh
     npx prisma migrate dev
     ```
   - Start the server:
     ```sh
     npm run dev
     ```

3. **Set up the frontend:**

   - Navigate to the `client` directory:
     ```sh
     cd ../client
     ```
   - Install dependencies:
     ```sh
     bun install
     ```
   - Set up your `.env.local` file by copying the example:
     ```sh
     cp .env.local.example .env.local
     ```
   - Add the backend API URL to the `.env.local` file:
     ```
     NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
     ```
   - Start the development server:
     ```sh
     bun dev
     ```

The application should now be running at `http://localhost:3000`.

## API Endpoints

The backend exposes the following REST API endpoints:

- `POST /api/v1/auth/login` - Authenticate a user and get a JWT.
- `GET /api/v1/blogs` - Get all blog posts.
- `GET /api/v1/blogs/:id` - Get a single blog post.
- `POST /api/v1/blogs` - Create a new blog post (protected).
- `PUT /api/v1/blogs/:id` - Update a blog post (protected).
- `DELETE /api/v1/blogs/:id` - Delete a blog post (protected).
- `GET /api/v1/projects` - Get all projects.
- `GET /api/v1/projects/:id` - Get a single project.
- `POST /api/v1/projects` - Create a new project (protected).
- `PUT /api/v1/projects/:id` - Update a project (protected).
- `DELETE /api/v1/projects/:id` - Delete a project (protected).

## Deployment

This application is deployed on [Vercel](https://vercel.com/). The `client` directory is deployed as a Next.js application, and the `server` directory is deployed as a Vercel serverless function.

The `vercel.json` files in both the `client` and `server` directories are configured for this deployment setup.
