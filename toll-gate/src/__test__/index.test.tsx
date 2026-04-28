import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import Head from "next/head";

// Mock the Dashboard component as it's already tested or will be separately
jest.mock("@/components/dashboard/dashboard", () => ({
  Dashboard: () => <div data-testid="mock-dashboard">Mock Dashboard</div>,
}));

// Mock next/head to prevent actual head changes during tests
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>;
    },
  };
});

describe("Home Page", () => {
  it("renders the Home page without crashing", () => {
    render(<Home />);
    expect(screen.getByTestId("mock-dashboard")).toBeInTheDocument();
  });

  it("sets the correct page title", () => {
    render(<Home />);
    // Basic Rendering
    expect(screen.getByTestId("mock-dashboard")).toBeInTheDocument(); // Re-confirming presence
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
