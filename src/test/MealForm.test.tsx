import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MealForm } from "@/components/MealForm";

describe("MealForm", () => {
  it("renders dish name and servings inputs", () => {
    render(<MealForm onSubmit={vi.fn()} isLoading={false} />);
    expect(screen.getByLabelText(/dish name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of servings/i)).toBeInTheDocument();
  });

  it("shows validation error when submitted empty", async () => {
    render(<MealForm onSubmit={vi.fn()} isLoading={false} />);
    fireEvent.click(screen.getByRole("button", { name: /get calories/i }));
    await waitFor(() => {
      expect(screen.getByText(/dish name is required/i)).toBeInTheDocument();
    });
  });

  it("shows spinner when loading", () => {
    render(<MealForm onSubmit={vi.fn()} isLoading={true} />);
    expect(
      screen.getByText(/looking up calories/i)
    ).toBeInTheDocument();
  });
});
