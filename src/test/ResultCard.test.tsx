import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultCard } from "@/components/ResultCard";
import { CalorieResult } from "@/types";

const mockResult: CalorieResult = {
  dish_name: "chicken biryani",
  servings: 2,
  calories_per_serving: 290,
  total_calories: 580,
  macronutrients_per_serving: {
    protein: 18.4,
    total_fat: 9.2,
    carbohydrates: 32.1,
    fiber: 1.8,
    sugars: 2.1,
    saturated_fat: 2.5,
  },
  total_macronutrients: {
    protein: 36.8,
    total_fat: 18.4,
    carbohydrates: 64.2,
    fiber: 3.6,
    sugars: 4.2,
    saturated_fat: 5.0,
  },
  source: "USDA FoodData Central",
  matched_food: {
    name: "Chicken biryani",
    fdc_id: 168139,
    data_type: "Survey (FNDDS)",
    published_date: "2019-04-01",
  },
};

describe("ResultCard", () => {
  it("renders dish name in the card title", () => {
    render(<ResultCard result={mockResult} />);
    const title = document.querySelector("[data-slot='card-title']");
    expect(title?.textContent?.toLowerCase()).toContain("chicken biryani");
  });

  it("displays calorie summary — per serving and total", () => {
    render(<ResultCard result={mockResult} />);
    expect(screen.getByText("290")).toBeInTheDocument();
    expect(screen.getByText("580")).toBeInTheDocument();
  });

  it("displays macronutrients per serving section", () => {
    render(<ResultCard result={mockResult} />);
    expect(
      screen.getByText(/macronutrients per serving/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/protein/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/carbohydrates/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/total fat/i).length).toBeGreaterThan(0);
  });
});
