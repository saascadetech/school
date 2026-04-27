/// <reference types="vitest" />
import { beforeAll, afterAll, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return React.createElement("a", { href }, children);
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => React.createElement("div", props, children),
    button: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => React.createElement("button", props, children),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Global test timeout
vi.setConfig({
  testTimeout: 10000,
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Global teardown
afterAll(() => {
  vi.clearAllMocks();
});
