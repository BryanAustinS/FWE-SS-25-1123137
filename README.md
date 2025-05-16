# Trip Planner

By Bryan Austin Suharta (1123137)

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
- API Key
- Database URL from Supabase

### How to get the API Key
1. Go to unsplash.com
2. Log in or create a new account
3. Click the burger menu on the right side and click Developers/API or go to unsplash.com/developers
4. Open "Your apps"
5. Click "New Application" and accept the API Use and Guidelines
6. Write in your application name and description
    Example: 
    FWE Trip Planning App

    An app to plan trip
7. Scroll down and copy both Access Key and Secret Key
8. Back in the IDE, create a new .env file in root and paste in the API Keys like this:
   ```bash
    UNSPLASH_ACCESS_KEY="ACCESS_KEY"
    UNSPLASH_SECRET_KEY="SECRET_KEY"
   ```

### How to get the Database URL
1. Go to supabase.com
2. Log in using Github or create a new account
3. Create a new Organization or click an existing one
4. Create a New Project and type in the name and password

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://code.fbi.h-da.de/bryanaustin.suharta/FWE-SS-25-1123137.git
   cd FWE-SS-25-1123137/backend
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
    https://bryanaustin.postman.co/workspace/Bryan-Austin's-Workspace~3591a0af-516f-4c27-89ed-7e6f5b66beb6/collection/44118307-beabb353-c46c-4df0-b759-26c86a173d9e?action=share&creator=44118307
2. Execute the collection to run all tests

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

