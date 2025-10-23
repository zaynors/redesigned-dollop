# Somali Diaspora News Network

## Overview

The Somali Diaspora News Network is a content management system (CMS) and news publication platform designed to serve the Somali community worldwide. The application enables administrators to create, edit, and publish news articles while providing readers with a professional, news-focused reading experience. The platform features a rich text editor for content creation, article categorization, and RSS feed support for content syndication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- shadcn/ui component library (Radix UI primitives with Tailwind styling)
- Design system inspired by professional news outlets (BBC News, The Guardian, Reuters)
- Custom brand color (#408bd8 - Somali flag blue) as primary accent throughout the interface
- Typography system using Merriweather/Libre Baskerville for headlines and Inter/Source Sans Pro for body text
- Tailwind CSS for utility-first styling with custom theme configuration

**Content Editing**
- TiptapEditor for rich text content creation with WYSIWYG capabilities
- Support for text formatting (bold, italic, headings, lists)
- Text alignment and color customization
- HTML code editing capability for advanced users

**State Management Strategy**
- Server state managed by TanStack Query with caching and automatic refetching disabled (staleTime: Infinity)
- Form state handled by React Hook Form with Zod validation
- Local component state using React hooks
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- RESTful API design pattern for article CRUD operations
- Custom middleware for request logging and JSON response capture

**API Endpoints**
- `GET /api/articles` - Retrieve all articles
- `GET /api/articles/published` - Retrieve only published articles
- `GET /api/articles/:id` - Retrieve article by ID
- `GET /api/articles/slug/:slug` - Retrieve article by URL slug
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update existing article
- `DELETE /api/articles/:id` - Delete article
- `GET /rss.xml` - RSS feed generation

**Data Validation**
- Zod schema validation for article creation and updates
- Input sanitization using sanitize-html library to prevent XSS attacks
- Custom error messages using zod-validation-error for user-friendly feedback

**Development vs Production**
- In-memory storage (MemStorage) for development and testing
- Database storage configured for production via Drizzle ORM
- Environment-based configuration switching

### Data Storage Solutions

**Database Schema**
- PostgreSQL as the primary database (configured via Neon Database serverless driver)
- Drizzle ORM for type-safe database operations and schema management
- Single `articles` table with the following structure:
  - `id`: UUID primary key
  - `title`: Article headline
  - `slug`: URL-friendly identifier (unique)
  - `content`: HTML rich text content
  - `excerpt`: Short summary for previews
  - `author`: Author name
  - `category`: Article category (World, Politics, Culture, Business, Technology, Community)
  - `featuredImage`: Optional image URL
  - `published`: Boolean publication status
  - `publishedAt`: Publication timestamp (nullable)
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last modification timestamp

**Storage Abstraction**
- IStorage interface allows swapping between in-memory and database implementations
- MemStorage class provides in-memory article storage for development
- Database migrations managed through Drizzle Kit

### Authentication and Authorization

**Current Implementation**
- No authentication system implemented
- Admin panel is publicly accessible (suitable for internal/development use)
- Future consideration: Authentication should be added before production deployment

**Design Consideration**
- The architecture supports adding authentication middleware to protect admin routes
- User session management would integrate with the existing Express middleware chain

### External Dependencies

**Third-Party Services**
- Neon Database: Serverless PostgreSQL hosting (via `@neondatabase/serverless`)
- Google Fonts: Typography loading (Merriweather, Inter)

**Content Delivery**
- RSS feed generation using the `feed` library for content syndication
- Featured images stored as URLs (external hosting required)

**UI Component Libraries**
- Radix UI: Accessible, unstyled component primitives
- Lucide React: Icon system
- TipTap: Extensible rich text editor framework
- date-fns: Date formatting utilities

**Development Tools**
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)
- TypeScript for type checking across client and server
- PostCSS with Autoprefixer for CSS processing

**Build and Deployment**
- esbuild for server code bundling
- Vite for client-side bundling and optimization
- Static asset serving in production mode