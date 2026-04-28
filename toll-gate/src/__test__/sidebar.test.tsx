import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "@/components/sidebar/sidebar";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
    });
  });

  it("renders the sidebar component without crashing", () => {
    render(<Sidebar />);
    expect(screen.getByText("TOLL GATE")).toBeInTheDocument();
    expect(screen.getByText("SYSTEM STATUS")).toBeInTheDocument();
    expect(screen.getByText("ONLINE")).toBeInTheDocument();
  });

  it("displays navigation links", () => {
    render(<Sidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Management")).toBeInTheDocument();
  });

  it("highlights 'Dashboard' link when on the home path", () => {
    render(<Sidebar />);
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveClass("active");
  });

  it("highlights 'Analytics' link when on the analytics path", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/analytics",
    });
    render(<Sidebar />);
    const analyticsLink = screen.getByText("Analytics").closest("a");
    expect(analyticsLink).toHaveClass("active");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Sidebar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
