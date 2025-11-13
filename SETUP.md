# Website Visualizations - Setup Guide

This document provides step-by-step instructions for setting up and running the website visualizations project.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm installed (for local development)

## Setup Instructions

### 1. Start the MongoDB Database

Skip it if you have a MongoDB database running on your system.

Run the following command from the project root directory to start the MongoDB container:

```bash
docker compose up -d mongodb
```

This will start a MongoDB instance with the following configuration:

- Port: 27017
- Username: root
- Password: Asdfgh123
- Database: courtreserve

### 2. Set Up the Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Copy the example environment file to create your .env file:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies (if running locally):

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

   The server will be available at http://localhost:4000/graphql

### 3. Set Up the Client

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Copy the example environment file to create your .env file:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies (if running locally):

   ```bash
   yarn install
   ```

4. Start the client:

   ```bash
   yarn dev
   ```

   The client will be available at http://localhost:3000

## Using Docker Compose (Full Stack)

To run the entire application stack (MongoDB, Server, Client, and Nginx) using Docker Compose:

```bash
docker compose up -d
```

This will start:

- MongoDB on port 27017
- Server on port 4000
- Client on port 3000
- Nginx on port 80 (acting as a reverse proxy)

## Accessing the Application

- Web Application: http://localhost:3000 (or http://localhost when using Nginx)
- GraphQL API: http://localhost:4000/graphql (or http://localhost/graphql when using Nginx)
