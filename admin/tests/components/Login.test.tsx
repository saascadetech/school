import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLogin from "@/app/(auth)/login/page";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Eye: () => <span data-testid="eye-icon">Eye</span>,
  EyeOff: () => <span data-testid="eye-off-icon">EyeOff</span>,
  GraduationCap: () => (
    <span data-testid="graduation-cap-icon">GraduationCap</span>
  ),
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock Next.js router
const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: mockReplace,
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("AdminLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the login page correctly", () => {
      render(<AdminLogin />);

      expect(screen.getByText("School Admin")).toBeInTheDocument();
      expect(
        screen.getByText("Sign in to manage your school"),
      ).toBeInTheDocument();
    });

    it("renders email and password inputs", () => {
      render(<AdminLogin />);

      const emailInput = screen.getByPlaceholderText("admin@school.com");
      const passwordInput = screen.getByPlaceholderText("Enter your password");

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it("renders the sign in button", () => {
      render(<AdminLogin />);

      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    it("renders the quick demo login button", () => {
      render(<AdminLogin />);

      expect(screen.getByText("Quick Demo Login")).toBeInTheDocument();
    });

    it("renders the forgot password link", () => {
      render(<AdminLogin />);

      expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    });

    it("renders the footer text", () => {
      render(<AdminLogin />);

      expect(
        screen.getByText("Powered by School Management System"),
      ).toBeInTheDocument();
    });

    it("renders the graduation cap icon", () => {
      render(<AdminLogin />);

      expect(screen.getByTestId("graduation-cap-icon")).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("updates email state when typing", () => {
      render(<AdminLogin />);

      const emailInput = screen.getByPlaceholderText("admin@school.com");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });

      expect(emailInput).toHaveValue("test@example.com");
    });

    it("updates password state when typing", () => {
      render(<AdminLogin />);

      const passwordInput = screen.getByPlaceholderText("Enter your password");
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(passwordInput).toHaveValue("password123");
    });

    it("toggles password visibility when clicking the eye button", () => {
      render(<AdminLogin />);

      const passwordInput = screen.getByPlaceholderText("Enter your password");
      expect(passwordInput).toHaveAttribute("type", "password");

      const eyeButton = screen.getByTestId("eye-icon").parentElement;
      fireEvent.click(eyeButton!);

      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("shows alert when login without credentials", async () => {
      const alertMock = vi.fn();
      vi.stubGlobal("alert", alertMock);

      render(<AdminLogin />);

      const signInButton = screen.getByText("Sign In");
      fireEvent.click(signInButton);

      expect(alertMock).toHaveBeenCalledWith("Please enter email and password");
    });
  });

  describe("Demo Login", () => {
    it("quick demo login stores admin data in localStorage and navigates", () => {
      const localStorageMock = {
        setItem: vi.fn(),
        getItem: vi.fn(),
        removeItem: vi.fn(),
      };
      vi.stubGlobal("localStorage", localStorageMock);

      render(<AdminLogin />);

      const demoButton = screen.getByText("Quick Demo Login");
      fireEvent.click(demoButton);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "adminToken",
        "dummy-token",
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "adminUser",
        expect.stringContaining('"id":"1"'),
      );
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  describe("API Login", () => {
    it("calls API with correct credentials on login", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ accessToken: "test-token" }),
      });

      render(<AdminLogin />);

      const emailInput = screen.getByPlaceholderText("admin@school.com");
      const passwordInput = screen.getByPlaceholderText("Enter your password");

      fireEvent.change(emailInput, { target: { value: "admin@school.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      const signInButton = screen.getByText("Sign In");
      fireEvent.click(signInButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          "http://localhost:3001/api/auth/login",
          expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "admin@school.com",
              password: "password123",
            }),
          }),
        );
      });
    });

    it("shows error alert on failed login", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Invalid credentials" }),
      });

      const alertMock = vi.fn();
      vi.stubGlobal("alert", alertMock);

      render(<AdminLogin />);

      const emailInput = screen.getByPlaceholderText("admin@school.com");
      const passwordInput = screen.getByPlaceholderText("Enter your password");

      fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

      const signInButton = screen.getByText("Sign In");
      fireEvent.click(signInButton);

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith("Invalid credentials");
      });
    });

    it("shows loading state during login", async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ accessToken: "test-token" }),
                }),
              100,
            ),
          ),
      );

      render(<AdminLogin />);

      const emailInput = screen.getByPlaceholderText("admin@school.com");
      const passwordInput = screen.getByPlaceholderText("Enter your password");

      fireEvent.change(emailInput, { target: { value: "admin@school.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      const signInButton = screen.getByText("Sign In");
      fireEvent.click(signInButton);

      expect(screen.getByText("Signing in...")).toBeInTheDocument();
    });
  });
});
