import React from "react";
import { render, screen } from "@testing-library/react";
import ManagementPage from "@/pages/management";
import Head from "next/head";

// Mock next/head
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>;
    },
  };
});

describe("Management Page", () => {
  it("renders the Management page without crashing", () => {
    render(<ManagementPage />);
    expect(screen.getByText("DATA MANAGEMENT")).toBeInTheDocument();
    expect(screen.getByText("Manage RFID cards and export system logs")).toBeInTheDocument();
    expect(screen.getByText("Total Cards")).toBeInTheDocument();
    expect(screen.getByText("RFID CARD REGISTRY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search by UID or owner name...")).toBeInTheDocument();
    expect(screen.getByText("Add Card")).toBeInTheDocument();
  });

  it("displays initial card data", () => {
    render(<ManagementPage />);
    expect(screen.getByText("RFID-4521")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Active Cards")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ManagementPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
