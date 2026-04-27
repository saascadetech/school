import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar, { menuItems } from "@/components/Sidebar";

// Mock the next navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/students",
}));

describe("Sidebar", () => {
  describe("Rendering", () => {
    it("renders the Sidebar component", () => {
      const { container } = render(<Sidebar />);
      expect(container).toBeDefined();
    });

    it("renders the school admin branding", () => {
      render(<Sidebar />);
      expect(screen.getByText("School Admin")).toBeInTheDocument();
    });

    it("renders all menu items from the menuItems array", () => {
      render(<Sidebar />);

      menuItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    it("renders the correct number of menu items", () => {
      render(<Sidebar />);
      const links = screen.getAllByRole("link");
      expect(links.length).toBe(menuItems.length);
    });
  });

  describe("Navigation Links", () => {
    it("renders links with correct href attributes", () => {
      render(<Sidebar />);
      const links = screen.getAllByRole("link");

      menuItems.forEach((item, index) => {
        expect(links[index]).toHaveAttribute("href", item.href);
      });
    });
  });

  describe("Active State", () => {
    it("highlights the active menu item based on pathname", () => {
      render(<Sidebar />);

      // The active item should have the indigo-600 background class
      const activeLink = screen.getByRole("link", { name: /students/i });
      expect(activeLink.closest("a")).toHaveClass("bg-indigo-600");
    });

    it("does not highlight inactive menu items", () => {
      render(<Sidebar />);

      // Dashboard should not be active when pathname is /students
      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      expect(dashboardLink.closest("a")).not.toHaveClass("bg-indigo-600");
    });
  });

  describe("Menu Items Data", () => {
    it("menuItems contains expected properties", () => {
      menuItems.forEach((item) => {
        expect(item).toHaveProperty("label");
        expect(item).toHaveProperty("href");
        expect(typeof item.label).toBe("string");
        expect(typeof item.href).toBe("string");
      });
    });

    it("menuItems contains all expected admin sections", () => {
      const expectedLabels = [
        "Dashboard",
        "Students",
        "Staff",
        "Fees",
        "Notices",
        "Classes",
        "Subjects",
        "Exams",
        "Homework",
        "Attendance",
        "Timetable",
        "Transport",
        "Reports",
        "Budget",
        "Leave",
        "Activity",
        "Settings",
        "Users",
      ];

      const actualLabels = menuItems.map((item) => item.label);
      expect(actualLabels).toEqual(expectedLabels);
    });
  });

  describe("Styling", () => {
    it("renders with correct sidebar structure", () => {
      render(<Sidebar />);

      // Should have an aside element
      const aside = document.querySelector("aside");
      expect(aside).toBeInTheDocument();
      expect(aside).toHaveClass(
        "w-56",
        "bg-white",
        "border-r",
        "border-gray-200",
      );
    });

    it("renders navigation with proper structure", () => {
      render(<Sidebar />);

      const nav = document.querySelector("nav");
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass("p-3", "space-y-1");
    });
  });

  describe("Icon", () => {
    it("renders the GraduationCap icon in the header", () => {
      render(<Sidebar />);

      // Check that the icon container exists
      const iconContainer = document.querySelector(".flex.items-center.gap-2");
      expect(iconContainer).toBeInTheDocument();
    });
  });
});
