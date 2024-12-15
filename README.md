# Talkspace Assignment

This is a full-stack image upload application built with Next.js, TypeScript, and Prisma. The app allows users to upload images, set an expiration time, and generate temporary shareable links. Expired images are automatically cleaned up.

## Features

- Upload images with expiration time.
- Generate a shareable link for each image.
- Automatically delete expired images from the database and file system.

## Tech Stack

- **Frontend**: Next.js (React), Material-UI
- **Backend**: Next.js API Routes, Multer for file uploads
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript

## Notes to TalkSpace from Ruti

- I prefer to use the main page.tsx as a central part of the file structure, rendering the initial page. This approach makes the project easier to maintain, as it keeps all UI components neatly organized under the components folder.
- I follow a similar structure for the pages/\* directory. I believe that API logic should be well-organized and modular, which is why I handle API-related functionality in small, manageable files within api-utils. The pages/api directory simply routes to the correct functions.
- I make a conscious effort to separate UI from state logic. This separation results in a cleaner codebase and enhances maintainability. For example, I use custom hooks to manage state in components like ImageDisplay and ImageUpload, ensuring that UI components are focused on rendering and interaction.

## Note on Image Storage in Production

In a true deployed project, images would not be served directly from the public folder, as it would not be a secure or scalable solution. Instead, I would store the images as blobs on a separate server or cloud storage for better performance, scalability, and security. The generated URL for each image would be stored in the database.

## Getting Started

### Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (18.x or above)
- **PostgreSQL** (installed and running on your local machine or a remote instance)
- **Prisma CLI**: If Prisma CLI is not installed globally, you can install it by running:

  ```bash
  npm install -g prisma
  ```

# Database URL for connecting to PostgreSQL

Create a .env and save the DATABASE_URL
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

```bash
npx prisma generate
npx prisma migrate deploy
```
