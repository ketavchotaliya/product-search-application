# Product Search Backend Application

Angular App for with real-time product search functionality using NgRx state management.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular (v16)
- Git

### Setup Instructions

- Clone this repository
- `cd frontend`
- `npm install`
- `npm start` OR `ng serve` # Dev mode with auto-restart
- `ng build` # Prepare build

### Project structure

```
frontend/src/app/
├── models/              # TypeScript interfaces
│   └── product.model.ts
├── services/            # HTTP services
│   └── product.service.ts
├── store/               # NgRx state management
│   ├── app.state.ts     # Application state interface
│   ├── product.actions.ts   # Redux actions
│   ├── product.reducer.ts   # State reducer
│   ├── product.selectors.ts # State selectors
│   └── index.ts         # Barrel exports
├── app.component.ts     # Main component
├── app.component.html   # Main template
├── app.component.css    # Component styles
└── app.module.ts        # Root module
```

### Features

1. Real-time Search

   - 300ms debouncing to prevent excessive API calls
   - Automatic search as user types
   - Previous request cancellation using RxJS switchMap

2. State Management (NgRx)

   - Centralized state for products, loading, and errors
   - Predictable state updates through actions and reducers
   - Dev tools integration for debugging

3. User Experience
   - Loading indicators during API calls
   - Error handling with user-friendly messages
   - Search suggestions for better discoverability
   - Responsive design for mobile and desktop

### Data Flow
```
User Input → Debouncing → HTTP Request → NgRx Action → Reducer → State Update → UI Update
```
