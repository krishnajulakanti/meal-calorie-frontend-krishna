# Meal Calorie Counter

A production-ready Next.js frontend for the Meal Calorie Count Generator API. Users can register, log in, search for any dish, and get detailed calorie and macronutrient breakdowns powered by the USDA FoodData Central database.

## Live Demo

## Screenshots

## Tech Stack

| Layer            | Technology                      |
| ---------------- | ------------------------------- |
| Framework        | Next.js 14+ (App Router)        |
| Language         | TypeScript                      |
| Styling          | Tailwind CSS + shadcn/ui        |
| State Management | Zustand with persist middleware |
| Form Validation  | React Hook Form + Zod           |
| Package Manager  | pnpm                            |

## Features

- User registration and login with JWT authentication
- Calorie and macronutrient Search for any dish via USDA FoodData Central
- Macro progress bars for visual breakdown
- Meal search history stored in Zustand (persisted in localStorage)
- Dashboard with stats — total searches, average calories, last search
- Autocomplete suggestions for common dishes
- Rate limit countdown timer on 429 responses
- Full error handling for all API error codes (400, 401, 403, 404, 409, 422, 429, 500)
- Dark / Light mode toggle
- Fully responsive — mobile, tablet, desktop
- Guarded routes — unauthenticated users redirected to /login

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   └── calories/page.tsx
├── components/
│   ├── AuthForm.tsx
│   ├── MealForm.tsx
│   ├── ResultCard.tsx
│   ├── MealHistoryTable.tsx
│   ├── NavBar.tsx
│   ├── ThemeToggle.tsx
│   └── ui/
├── hooks/
│   └── useAuthGuard.ts
├── lib/
│   ├── api.ts
│   └── validations.ts
├── stores/
│   ├── authStore.ts
│   └── mealStore.ts
└── types/
    └── index.ts
```

## Setup Instructions

### Prerequisites

- Node.js v18+
- pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/krishnajulakanti/meal-calorie-frontend-krishna.git
cd meal-calorie-frontend-krishna

# Install dependencies
pnpm install

# Create environment file
.env.example
.env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable                 | Value                     |
| ------------------------ | ------------------------- |
| NEXT_PUBLIC_API_BASE_URL | https://xpcc.devb.zeak.io |

## Trade-offs and Decisions taken

- **AuthForm shared component** — single component handles both login and register via a `mode` prop, reducing duplication
- **Zustand over Context API** — simpler boilerplate, built-in persist middleware for localStorage, better devtools support
- **Meal history in localStorage** — as the backend has no endpoint to store search history, so localStorage via Zustand persist has been configured
- **Autocomplete from static list** — no dedicated autocomplete API available; static suggestions improve UX without extra API calls
- **react-hook-form** — used react-hook-form directly with shadcn primitives (Input, Label, Button) to avoid dependency issues with the updated shadcn CLI

## API Reference

Base URL: `https://xpcc.devb.zeak.io`

| Method | Endpoint           | Auth         | Description              |
| ------ | ------------------ | ------------ | ------------------------ |
| POST   | /api/auth/register | No           | Register new user        |
| POST   | /api/auth/login    | No           | Login, receive JWT       |
| POST   | /api/get-calories  | Bearer token | Get calorie + macro data |
