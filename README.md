# Trip Planner

A full-stack web application for planning and managing trips with their destinations.

## 📋 Overview

Trip Planner allows users to create and manage trips along with their associated destinations. The application provides an intuitive interface for trip management with features like searching, sorting, and filtering of trips and destinations.

## ✨ Features

### Trip Management
- Create new trips with name, description, date range, and participant count
- View a list of all trips
- Search trips by name or date
- Sort trips by name or date
- Update trip details
- Delete trips

### Destination Management
- Add destinations to trips with name, number of nights, and activities
- View destinations associated with a specific trip
- Search destinations by name
- Update destination details
- Delete destinations

### User Interface
- Responsive design using Mantine UI components
- Modal forms for creating and updating data
- Empty state handling with appropriate messages and actions
- Loading indicators during data fetching

## 🏗️ Project Structure

### Backend
The backend follows a modular architecture with:
- Controllers for handling HTTP requests
- Services for business logic
- Models for data structure
- Middleware for request processing
- Database layer with Drizzle ORM

### Frontend
The frontend is built with:
- React for UI components
- TypeScript for type safety
- Vite for fast development
- Mantine UI for component styling
- React Router for navigation

## 🔄 API Routes

### Trip Routes

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| GET | /api/trip | Get all trips | 200, 500 |
| POST | /api/trip | Create a new trip | 201, 400, 500 |
| GET | /api/trip/:id | Get trip by ID | 200, 404, 500 |
| PUT | /api/trip/:id | Update a trip | 200, 404, 400, 500 |
| DELETE | /api/trip/:id | Delete a trip | 200, 404, 500 |
| GET | /api/trip/name/:name | Find trips by exact name | 200, 400, 500 |
| GET | /api/trip/namecontains/:namecontains | Find trips by name substring | 200, 400, 500 |
| GET | /api/trip/date/:date | Find trips by date (YYYY-MM-DD) | 200, 400, 500 |

### Destination Routes

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| GET | /api/destination | Get all destinations | 200, 500 |
| POST | /api/destination | Create a new destination | 201, 400, 500 |
| GET | /api/destination/:id | Get destination by ID | 200, 404, 500 |
| PUT | /api/destination/:id | Update a destination | 200, 404, 400, 500 |
| DELETE | /api/destination/:id | Delete a destination | 200, 404, 500 |
| GET | /api/destination/name/:name | Find destinations by exact name | 200, 400, 500 |
| GET | /api/destination/namecontains/:namecontains | Find destinations by name substring | 200, 400, 500 |
| GET | /api/destination/trip/:tripid | Get destinations by trip ID | 200, 404, 500 |

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- npm or yarn

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/trip-planner.git
   cd trip-planner/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. Run database migrations
   ```bash
   npm run migrate
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

## 🧪 Testing

### Backend Testing with Postman
1. Import the included Postman collection
2. Set up environment variables in Postman
3. Execute the collection to run all tests

### Manual Testing Steps
1. Create a trip using the "Create Trip" request
2. Verify the trip was created using "Get All Trips"
3. Create a destination for the trip using "Create Destination" (using the trip ID)
4. Test searching trips and destinations
5. Test updating and deleting operations

## 📊 Data Relationships
- Each trip can have multiple destinations (one-to-many relationship)
- Destinations belong to a single trip (enforced by foreign key constraint)
- When a trip is deleted, all associated destinations are automatically deleted (cascade delete)

## 🛠️ Technologies Used

### Backend
- Node.js, Express, TypeScript
- Drizzle ORM, PostgreSQL
- OpenAPI/Swagger for API documentation

### Frontend
- React, TypeScript, Vite
- Mantine UI component library
- React Router for navigation
- Auto-generated TypeScript API client

### Development Tools
- ESLint and Prettier for code formatting
- Postman for API testing

## 📝 License
MIT

## 👥 Contributing
Contributions, issues, and feature requests are welcome!
