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

DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

run
npx prisma generate
npx prisma migrate deploy
