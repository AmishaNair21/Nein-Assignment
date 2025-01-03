# Restaurant Table Booking System

## Key Features

- **User-Friendly Booking Interface**
  - Two-column layout with visual elements
  - Real-time form validation
  - Intuitive date and time selection

- **Advanced Validation**
  - Zod schema validation for all inputs
  - Contact number validation (10 digits)
  - Guest limit enforcement (1-10 guests)
  - Future date validation

- **Booking Management**
  - MongoDB integration for data persistence
  - Prevents double bookings
  - Booking confirmation system
  - Automated time slot management


- **Time Slot Availability (In Progress)**
   - I have not completed the availabilty time slot management functionality.
 
## Tech Stack

- **Frontend**
  - Next.js 15 (App Router)
  - TypeScript
  - TailwindCSS
  - Zod for validation
  - React Hooks

- **Backend**
  - MongoDB
  - Mongoose
  - Next.js API Routes




  ## Setup Instructions

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server
```bash
npm run dev
```