import React from "react";
import { render, screen } from "@testing-library/react";
import AnalyticsPage from "@/pages/analytics";
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

// Mock all Recharts components
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-area-chart">{children}</div>
  ),
  Area: () => <div data-testid="mock-area"></div>,
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="mock-bar"></div>,
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-line-chart">{children}</div>
  ),
  Line: () => <div data-testid="mock-line"></div>,
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-pie-chart">{children}</div>
  ),
  Pie: () => <div data-testid="mock-pie"></div>,
  Cell: () => <div data-testid="mock-cell"></div>,
  XAxis: () => <div data-testid="mock-xaxis"></div>,
  YAxis: () => <div data-testid="mock-yaxis"></div>,
  CartesianGrid: () => <div data-testid="mock-cartesian-grid"></div>,
  Tooltip: () => <div data-testid="mock-tooltip"></div>,
  Legend: () => <div data-testid="mock-legend"></div>,
}));

describe("Analytics Page", () => {
  it("renders the Analytics page without crashing", () => {
    render(<AnalyticsPage />);
    expect(screen.getByText("DATA ANALYTICS")).toBeInTheDocument();
    expect(screen.getByText("Traffic insights and system performance metrics")).toBeInTheDocument();
    expect(screen.getByText("Peak Hour")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<AnalyticsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
