# Sustainability Dashboard

A full-stack application for tracking and managing sustainability initiatives.

## Project Structure

- `client/` - React frontend application
- `server/` - Express backend server

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then update the values in `.env` with your configuration.

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:3000

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The client will run on http://localhost:3001

## Features

- Sustainability Dashboard with metrics and charts
- Sustainability Backlog with drag-and-drop functionality
- Project tracking and management
- Data visualization
- Report generation

## API Endpoints

- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/download-report` - Download sustainability report
- `GET /api/backlog` - Get backlog items
- `POST /api/backlog` - Create new backlog item
- `PUT /api/backlog/:id` - Update backlog item
- `DELETE /api/backlog/:id` - Delete backlog item

## Development Notes

- The backend uses Express.js with MongoDB for data storage
- The frontend is built with React and Material-UI
- Session management is handled with express-session and connect-mongo
- CORS is configured to allow requests from the frontend application

## Troubleshooting

If you encounter any issues:

1. Ensure MongoDB is running
2. Check that all environment variables are set correctly
3. Verify that both frontend and backend servers are running
4. Check the browser console and server logs for error messages

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
