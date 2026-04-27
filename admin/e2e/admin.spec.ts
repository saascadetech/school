import { test, expect } from "@playwright/test";

// Helper to do demo login
async function demoLogin(page: any) {
  await page.goto("/login");
  await page.click("text=Quick Demo Login");
  await page.waitForURL("/");
}

test.describe("Admin Dashboard E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL (configured in playwright.config.ts)
    await page.goto("/");
  });

  test.describe("Navigation", () => {
    test("should display the sidebar with all menu items", async ({ page }) => {
      // Check for main menu items in sidebar
      await expect(page.getByText("School Admin")).toBeVisible();
      await expect(page.getByText("Dashboard")).toBeVisible();
      await expect(page.getByText("Students")).toBeVisible();
      await expect(page.getByText("Staff")).toBeVisible();
      await expect(page.getByText("Fees")).toBeVisible();
      await expect(page.getByText("Notices")).toBeVisible();
    });

    test("should navigate to students page when clicking Students menu item", async ({
      page,
    }) => {
      await page.click("text=Students");
      await expect(page).toHaveURL("/students");
    });

    test("should navigate to staff page when clicking Staff menu item", async ({
      page,
    }) => {
      await page.click("text=Staff");
      await expect(page).toHaveURL("/staff");
    });

    test("should navigate to fees page when clicking Fees menu item", async ({
      page,
    }) => {
      await page.click("text=Fees");
      await expect(page).toHaveURL("/fees");
    });

    test("should navigate to notices page when clicking Notices menu item", async ({
      page,
    }) => {
      await page.click("text=Notices");
      await expect(page).toHaveURL("/notices");
    });

    test("should highlight the active menu item", async ({ page }) => {
      // Click on Students
      await page.click("text=Students");

      // The Students link should have active styling (bg-indigo-600)
      const studentsLink = page.locator('a[href="/students"]');
      await expect(studentsLink).toHaveClass(/bg-indigo-600/);
    });
  });

  test.describe("Dashboard Page", () => {
    test("should load the dashboard page at root URL", async ({ page }) => {
      await expect(page).toHaveURL("/");
    });

    test("should display dashboard content", async ({ page }) => {
      // Check that the page has loaded properly
      await expect(page.locator("aside")).toBeVisible();
    });
  });

  test.describe("Login Flow", () => {
    test("should have a login page at /login", async ({ page }) => {
      await page.goto("/login");
      await expect(page).toHaveURL(/\/login/);
    });

    test("should show login form elements", async ({ page }) => {
      await page.goto("/login");

      // Check for login form elements
      await expect(page.getByText("School Admin").first()).toBeVisible();
      await expect(
        page.getByText("Sign in to manage your school"),
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
      await expect(page.getByText("Quick Demo Login")).toBeVisible();
      await expect(page.getByText("Forgot Password?")).toBeVisible();
    });

    test("should login with demo credentials", async ({ page }) => {
      await demoLogin(page);

      // Should be redirected to dashboard
      await expect(page).toHaveURL("/");
      await expect(page.getByText("School Admin")).toBeVisible();
    });

    test("should show validation when submitting empty form", async ({
      page,
    }) => {
      await page.goto("/login");

      // Click Sign In without entering credentials
      await page.click("text=Sign In");

      // Should show alert (based on the current implementation)
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain("Please enter email and password");
        await dialog.dismiss();
      });
    });

    test("should toggle password visibility", async ({ page }) => {
      await page.goto("/login");

      // Password should be hidden initially
      const passwordInput = page.locator('input[type="password"]');
      await expect(passwordInput).toBeVisible();

      // Click the eye icon to show password
      await page.click('button[type="button"]'); // Eye/EyeOff button

      // Password should now be visible as text
      const textInput = page.locator('input[type="text"]');
      await expect(textInput).toBeVisible();
    });
  });

  test.describe("Authenticated Navigation", () => {
    test.beforeEach(async ({ page }) => {
      await demoLogin(page);
    });

    test("should navigate to all main pages when authenticated", async ({
      page,
    }) => {
      const pages = ["/students", "/staff", "/fees", "/notices", "/classes"];

      for (const path of pages) {
        await page.goto(path);
        await expect(page.locator("aside")).toBeVisible();
        await expect(page.getByText("School Admin")).toBeVisible();
      }
    });

    test("should maintain login state across page navigation", async ({
      page,
    }) => {
      // Login
      await demoLogin(page);

      // Navigate to a different page
      await page.goto("/students");
      await expect(page).toHaveURL("/students");

      // Navigate to another page
      await page.goto("/staff");
      await expect(page).toHaveURL("/staff");

      // Should still be authenticated (sidebar visible)
      await expect(page.locator("aside")).toBeVisible();
    });
  });

  test.describe("Page Structure", () => {
    test.beforeEach(async ({ page }) => {
      await demoLogin(page);
    });

    test("should have consistent sidebar on all pages", async ({ page }) => {
      const pages = [
        "/",
        "/students",
        "/staff",
        "/fees",
        "/notices",
        "/classes",
      ];

      for (const path of pages) {
        await page.goto(path);
        await expect(page.locator("aside")).toBeVisible();
        await expect(page.getByText("School Admin")).toBeVisible();
      }
    });

    test("should have proper responsive layout", async ({ page }) => {
      // Set a standard desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto("/");

      // Sidebar should be visible at desktop size
      await expect(page.locator("aside")).toBeVisible();
    });
  });

  test.describe("Menu Items", () => {
    test.beforeEach(async ({ page }) => {
      await demoLogin(page);
    });

    const menuItems = [
      { name: "Dashboard", href: "/" },
      { name: "Students", href: "/students" },
      { name: "Staff", href: "/staff" },
      { name: "Fees", href: "/fees" },
      { name: "Notices", href: "/notices" },
      { name: "Classes", href: "/classes" },
      { name: "Subjects", href: "/subjects" },
      { name: "Exams", href: "/exams" },
      { name: "Homework", href: "/homework" },
      { name: "Attendance", href: "/attendance" },
      { name: "Timetable", href: "/timetable" },
      { name: "Transport", href: "/transport" },
      { name: "Reports", href: "/reports" },
      { name: "Budget", href: "/budget" },
      { name: "Leave", href: "/leave" },
      { name: "Activity", href: "/activity" },
      { name: "Settings", href: "/settings" },
      { name: "Users", href: "/users" },
    ];

    test.each(menuItems)(
      "should navigate to $name page",
      async ({ page }, item) => {
        await page.click(`text=${item.name}`);
        await expect(page).toHaveURL(item.href);
      },
    );
  });
});
