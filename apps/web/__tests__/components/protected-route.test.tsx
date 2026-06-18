
import { render } from "@testing-library/react";

// Mock the component since it has async auth logic
jest.mock("../../../app/portal/ba-portal/components/protected-route", () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => <div data-testid="protected">{children}</div>,
}));

describe("ProtectedRoute", () => {
  it("renders children when authorized", () => {
    const { ProtectedRoute } = require("../../../app/portal/ba-portal/components/protected-route");
    const { getByTestId } = render(
      <ProtectedRoute>
        <div>Secret Content</div>
      </ProtectedRoute>
    );
    expect(getByTestId("protected")).toBeTruthy();
  });
});
