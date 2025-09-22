# Product Search Backend Application 

TypeScript Node.js Express API for product search functionality.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Setup Instructions

- Clone this repository
- `cd backend`
- `npm install`
- `npm run dev` # Dev mode with auto-restart
- `npm run build` # Prepare build
- `npm start` # start app in production mode

### Project structure
```
backend/
├── src/
│   ├── types/           # TypeScript interfaces
│   ├── services/        # Business logic layer
│   ├── controllers/     # Route handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── dist/                # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

### Features

- Search Filtering: Case-insensitive product name matching
- Response Consistency: Standardized JSON responses
- Error Handling: Proper HTTP status codes and error messages
- Request Debouncing: Client-side optimization ready
- Performance: 5000 ms artificial delay for demo purposes

### API Endpoints

#### Search Products
- `GET /api/products?search=term` - Search products by name

#### Parameters
- `search` query string: Product name to search for

#### Response
```
{
  "success": true,
  "data": "products": [
    {
      "id": 1,
      "name": "Laptop Pro",
      "category": "Electronics",
      "price": 1200
    }
  ]
}
```