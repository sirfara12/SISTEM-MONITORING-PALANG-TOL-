import React from "react";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "@/components/dashboard/dashboard";

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
  }),
}));

describe("Dashboard", () => {
  it("renders the dashboard component without crashing", () => {
    render(<Dashboard />);
    expect(screen.getByText("REAL-TIME MONITORING")).toBeInTheDocument();
    expect(screen.getByText("VEHICLES ENTERED")).toBeInTheDocument();
    expect(screen.getByText("VEHICLES EXITED")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
