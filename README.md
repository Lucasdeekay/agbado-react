# Overview

Agba-do is a marketplace platform that connects customers with trusted Nigerian artisans, service providers, and product sellers. The application serves as a comprehensive platform for booking services (like carpentry, plumbing, cleaning), purchasing authentic Nigerian products (crafts, clothing, jewelry), and managing provider profiles. Built as a full-stack TypeScript application, it features a React frontend with a Node.js/Express backend, using PostgreSQL for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Context API for cart state, TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Request Handling**: Express middleware for logging, error handling, and request parsing
- **Development**: Integrated Vite dev server for hot module replacement

## Data Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting
- **Type Safety**: Shared TypeScript types between frontend and backend via shared schema

## Key Domain Models
- **Users**: Customer and provider authentication with role-based access
- **Service Categories**: Organized service types with pricing and visual branding
- **Providers**: Business profiles with ratings, service areas, and portfolio images
- **Products**: Marketplace items with categories, pricing, and inventory
- **Cart System**: Session-based shopping cart with product management
- **Orders**: Transaction processing with order items and status tracking
- **Bookings**: Service appointment scheduling system

## Authentication & Authorization
- Session-based authentication using Express sessions
- Role differentiation between customers and service providers
- Provider verification system for trusted service delivery

## UI/UX Design Patterns
- Mobile-first responsive design with Tailwind breakpoints
- Consistent color theming using CSS custom properties
- Accessible UI components following ARIA guidelines
- Toast notifications for user feedback
- Modal dialogs for cart and search functionality

# External Dependencies

## Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and migrations

## UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Consistent icon system
- **Google Fonts**: Inter font family for typography

## Development Tools
- **Vite**: Fast build tool and development server
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation

## Payment Processing
- Infrastructure ready for payment gateway integration (payment method selection implemented)

## Geographic Services
- Nigerian state and city data for location-based provider matching
- Service area coverage for provider availability