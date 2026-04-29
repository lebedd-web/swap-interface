# Swap Interface Frontend

[Peiko Website](https://peiko.space)

Production-ready crypto swap interface frontend built by Peiko.  
This project demonstrates a modern token swap UI with quote updates, route details, slippage controls, and transaction status states for Web3 products.

## What This Project Is

Swap Interface is a frontend project for teams building:

- crypto exchange platforms
- wallet applications
- Web3 dashboards
- DeFi products with token swap flows

The repository focuses on UI behavior and product-ready UX patterns for a swap journey.

## Key Features

- token pair selection and network selection
- real-time quote update flow
- slippage tolerance controls
- route and quote details panel
- recent swaps activity section
- responsive layout for desktop and mobile breakpoints

## Tech Stack

- Next.js
- TypeScript
- pnpm workspace

## Requirements

- Node.js 20+
- pnpm 10.4.1+

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create env file:

- `apps/web/.env`

## Run Web (dev)

```bash
pnpm dev:web
```

Default URL: [http://localhost:3000](http://localhost:3000)

## Run Web (production)

```bash
pnpm build:web
pnpm start:web
```
