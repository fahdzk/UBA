
# UBA SaaS Platform

Brand Ambassador Union platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, Clerk, Stripe, and Resend.

## Quick Start

\`\`\`bash
# 1. Install dependencies
pnpm install

# 2. Start local database
docker-compose up -d

# 3. Set up environment
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your keys

# 4. Generate Prisma client & run migrations
pnpm db:generate
pnpm db:migrate

# 5. Seed database
pnpm db:seed

# 6. Start dev server
pnpm dev
\`\`\`

## Project Structure

\`\`\`
UBA/
├── apps/web/              # Next.js 15 app
│   ├── app/
│   │   ├── (marketing)/   # Public pages
│   │   ├── portal/        # Portal pages
│   │   │   ├── ba-portal/
│   │   │   ├── agency-portal/
│   │   │   ├── lawyer-portal/
│   │   │   └── admin-portal/
│   │   └── api/           # API routes
│   └── ...
├── packages/
│   ├── db/                # Prisma schema & client
│   ├── billing/           # Stripe integration
│   ├── security/          # RBAC, rate limiting, CSRF
│   ├── email/             # Resend email templates
│   └── auth/              # Clerk auth helpers
└── ...
\`\`\`

## Portals

- **BA Portal** - Brand ambassadors browse jobs, file complaints, manage membership
- **Agency Portal** - Agencies post jobs, review applications, manage profile
- **Lawyer Portal** - Lawyers manage legal cases
- **Admin Portal** - Full platform management

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL + Prisma
- **Auth:** Clerk
- **Payments:** Stripe
- **Email:** Resend
- **Deployment:** Vercel
