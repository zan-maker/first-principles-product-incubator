# First-Principles Product Incubator

> An innovation workspace that guides product, engineering, and design teams from ideation to validated MVP.

## Overview

The **First-Principles Product Incubator** is a structured web application that helps teams systematically move from raw ideas to validated products. It integrates four proven innovation and strategy frameworks into a seamless, guided workflow:

1. **Problem & Opportunity Framing** — Define the initiating tension with root cause analysis
2. **MIT First Principles Decomposition** — Break problems down to fundamental truths using the 3I Model
3. **Design Thinking Framework** — Build deep user empathy and generate creative solutions
4. **Theory of Constraints** — Identify and optimize system bottlenecks
5. **Lean Startup Evaluation** — Validate assumptions through MVP experiments

## Core Philosophy

Every complex problem has fundamental truths underneath the assumptions. This workspace helps teams strip away conventional thinking, understand users deeply, find system constraints, and validate hypotheses with real experiments — all in one integrated flow.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui + Radix Primitives
- **Styling**: Tailwind CSS 4
- **Database**: SQLite + Prisma ORM
- **State Management**: Zustand
- **Animations**: Framer Motion
- **AI Integration**: z-ai-web-dev-sdk (AI-powered analysis assistant)

## Features

### Phase 1: Problem & Opportunity Framing
- Entry point classification (Problem / Opportunity / Situation)
- Observable tension identification with evidence
- 5 Whys root cause analysis
- Multi-dimensional consequence mapping (strategic, cultural, financial)
- Auto-generated problem statements

### Phase 2: MIT First Principles
- **Master the System** — System understanding assessment with observations, relationships, and non-obvious insights
- **Fire Hose Test** — 3I prioritization model (Important, Impactful, Irreversible) with audit items
- **Think Like a Founder** — Three-column decomposition (Facts, Assumptions, Next Steps) with test design

### Phase 3: Design Thinking Framework
- **Empathize** — Full empathy map (Think/Feel, Hear, See, Say/Do, Pains, Gains) with persona development
- **Define** — POV statements and How Might We (HMW) generation
- **Ideate** — Crazy 8s rapid ideation framework

### Phase 4: Theory of Constraints
- **Five Focusing Steps** — Identify, Exploit, Subordinate, Elevate, Repeat
- Current Reality Tree (undesirable effects + causal mapping)
- Evaporating Cloud conflict resolution
- Buffer management with warning signals

### Phase 5: Lean Startup Evaluation
- Hypothesis management with testable statements
- 10 experiment types (Landing Page, Concierge MVP, Wizard of Oz, etc.)
- Build-Measure-Learn loop visualization
- MVP definition canvas with success criteria
- Validation status tracking (Validated / Invalidated / Inconclusive)

### AI-Powered Analysis
- Context-aware AI assistant for each framework phase
- Structured analysis with insights, suggestions, risks, and next steps
- Available throughout the workspace via floating chat panel

## Getting Started

### Prerequisites
- Node.js 18+ or Bun runtime
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/first-principles-product-incubator.git
cd first-principles-product-incubator

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local

# Initialize the database
bun run db:push

# Start the development server
bun run dev
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="file:./db/custom.db"
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── projects/            # Project CRUD endpoints
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── phases/
│   │   │           ├── route.ts
│   │   │           └── [phaseId]/route.ts
│   │   └── ai/
│   │       └── analyze/route.ts  # AI analysis endpoint
│   ├── layout.tsx
│   ├── page.tsx                 # Main SPA entry
│   └── globals.css
├── components/
│   ├── phases/
│   │   ├── problem-statement-phase.tsx
│   │   ├── first-principles-phase.tsx
│   │   ├── design-thinking-phase.tsx
│   │   ├── toc-phase.tsx
│   │   └── lean-startup-phase.tsx
│   ├── app-sidebar.tsx
│   ├── dashboard-view.tsx
│   ├── project-workspace.tsx
│   ├── phase-stepper.tsx
│   ├── ai-chat-panel.tsx
│   ├── new-project-dialog.tsx
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── db.ts                   # Prisma client
│   ├── store.ts                # Zustand state
│   └── utils.ts
└── hooks/
prisma/
└── schema.prisma
```

## Database Schema

- **Project** — Top-level innovation project with name, description, and status
- **ProjectPhase** — Individual framework phase with phase type, status, and JSON data

## Usage Workflow

1. **Create a Project** — Define your challenge or opportunity
2. **Frame the Problem** — Use root cause analysis to understand the real tension
3. **Apply First Principles** — Decompose the problem, challenge assumptions, prioritize with the 3I model
4. **Design Think** — Build empathy maps, define POV statements, generate creative solutions
5. **Find Constraints** — Identify system bottlenecks and plan optimization
6. **Validate with MVPs** — Design experiments, test assumptions, and iterate through Build-Measure-Learn loops

## Framework Credits

This application is built on established innovation and strategy frameworks:

- **MIT First Principles** — Originating from MIT's engineering culture, emphasizing deep system understanding, focused prioritization, and assumption decomposition
- **Design Thinking** — Based on methodologies from Stanford d.school, IDEO, and Google Ventures Design Sprint
- **Theory of Constraints (TOC)** — Developed by Eliyahu M. Goldratt, focused on identifying and managing system bottlenecks
- **Lean Startup** — Based on Eric Ries's methodology for validated learning and rapid experimentation

## License

MIT License — feel free to use, modify, and distribute.
