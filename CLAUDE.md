# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

`findapp-sys` is the NestJS REST API backend for a mobile app that helps users discover, save, and organise restaurants and places. Core domain concepts:

- **Restaurants** — searchable place data (name, location, cuisine, hours, etc.)
- **Favourites** — a user's saved restaurants
- **Collections** — user-curated lists of places (e.g. "Date Night Spots", "Cheap Eats")
- **Reactions** — per-user likes and dislikes on places
- **Users & Groups** — personal profiles; support for solo users and group outings

**Database: PostgreSQL** — chosen for its relational structure, which suits the interconnected domain (users, groups, collections, restaurants).
**ORM: Prisma** — schema-first, auto-generates TypeScript types, beginner-friendly, good for both learning and production.

## Learning Mode — How to Work With the Developer

This project is a structured learning exercise. The developer is a **frontend engineer learning backend development**. These rules override default behaviour and apply to every interaction:

1. **Never write code unprompted.** Only produce code when the developer explicitly asks (e.g. "write the code", "show me the implementation"). Otherwise, explain, guide, and ask.
2. **Explain before everything.** For each concept or step, explain *what* it is, *why* it exists, and *how* it fits into the bigger picture. Use frontend analogies where helpful (e.g. "a NestJS Module is like a React Context boundary — it groups related things together and controls what's shared outside").
3. **One step at a time.** Break work into small, numbered steps. Do not move to the next step until the developer confirms understanding or says to continue.
4. **Present choices, not decisions.** When there is more than one valid approach (e.g. database choice, folder structure, auth strategy), list the options with their trade-offs and let the developer decide.
5. **Plain language first.** Define any backend/NestJS jargon before using it. Never assume the developer knows terms like "guard", "pipe", "interceptor", "DTO", or "decorator" without explaining them.
6. **No over-engineering.** Recommend the simplest solution for the current step. Do not introduce abstractions, patterns, or packages unless they are actually needed right now.

## Commands

```bash
# Install dependencies
npm install

# Run in development (watch mode — restarts on file save)
npm run start:dev

# Build for production
npm run build

# Run unit tests
npm test

# Run a single test file
npx jest src/path/to/file.spec.ts

# Run e2e tests
npm run test:e2e

# Lint and auto-fix
npm run lint

# Type-check without emitting files
npx tsc --noEmit
```

## Architecture

NestJS v11 scaffolded with the default CLI template. Entry point: `src/main.ts`.

```
src/
  main.ts           # Bootstraps the NestJS app (like index.tsx in React)
  app.module.ts     # Root module — imports all feature modules
  app.controller.ts # Default health-check route
  app.service.ts    # Default service wired to the controller
test/
  app.e2e-spec.ts   # End-to-end tests (supertest against the live server)
```

As modules are added, each domain area (restaurants, users, collections, etc.) will live in its own folder under `src/` following the NestJS pattern:

```
src/restaurants/
  restaurants.module.ts
  restaurants.controller.ts   # handles HTTP routes
  restaurants.service.ts      # business logic
  restaurants.entity.ts       # database model (once DB is chosen)
  dto/                        # Data Transfer Objects — shapes for request/response bodies
```

## TypeScript Config Notes

- `noImplicitAny` is **off** — types can be inferred loosely while learning, but explicit types are still preferred
- `strictNullChecks` is **on** — null/undefined must be handled explicitly
- `emitDecoratorMetadata` and `experimentalDecorators` are **on** — required for NestJS decorators (`@Controller`, `@Injectable`, etc.)
- No path aliases configured yet; use relative imports for now

