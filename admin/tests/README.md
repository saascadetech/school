# Admin Dashboard Testing

## Overview

This directory contains tests for the admin dashboard, including:

- **Unit Tests**: Component tests using Vitest and React Testing Library
- **E2E Tests**: End-to-end tests using Playwright

## Setup

1. **Install dependencies**:

   ```bash
   cd admin
   npm install
   ```

2. **Install Playwright browsers** (for E2E tests):
   ```bash
   npx playwright install
   ```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Test Structure

```
admin/
├── tests/
│   ├── setup.ts           # Test setup and global mocks
│   ├── components/
│   │   └── Sidebar.test.tsx
│   └── integration/
│       └── login.test.ts
├── e2e/
│   ├── admin.spec.ts      # Main E2E test file
│   └── ...
├── vitest.config.ts
└── playwright.config.ts
```

## Writing Tests

### Component Tests

Use `@testing-library/react` for component tests:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sidebar from "@/components/Sidebar";

describe("Sidebar", () => {
  it("renders the sidebar", () => {
    render(<Sidebar />);
    expect(screen.getByText("School Admin")).toBeInTheDocument();
  });
});
```

### E2E Tests

Use Playwright's test structure:

```typescript
import { test, expect } from "@playwright/test";

test("my test", async ({ page }) => {
  await page.goto("/");
  // assertions...
});
```

## Notes

- The Vitest setup uses `happy-dom` for DOM simulation
- Next.js router is mocked in `setup.ts`
- Framer-motion is mocked to avoid animation complexity in tests
- E2E tests use the demo login flow for authentication
