"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import { calorieSchema, CalorieInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Autocomplete suggestions
const SUGGESTIONS = [
  "hyderabad dum biryani",
  "paneer butter masala",
  "egg fried rice",
  "butter chicken",
  "pizza",
  "french fries"
];

interface MealFormProps {
  onSubmit: (data: CalorieInput) => Promise<void>;
  isLoading: boolean;
}

export function MealForm({ onSubmit, isLoading }: MealFormProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<CalorieInput>({
    resolver: zodResolver(calorieSchema),
    mode: "onChange"
  });

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length < 2) {
      setFiltered([]);
      setShowSuggestions(false);
      return;
    }
    const results = SUGGESTIONS.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
    setShowSuggestions(results.length > 0);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion);
    setValue("dish_name", suggestion);
    setShowSuggestions(false);
  }

  const isSubmitDisabled = isLoading || !isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Dish Name with Autocomplete */}
      <div className="space-y-2" ref={wrapperRef}>
        <Label htmlFor="dish_name">Dish Name</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="dish_name"
            placeholder="e.g. chicken biryani, grilled salmon..."
            className="pl-9"
            value={query}
            {...register("dish_name")}
            onChange={(e) => {
              setQuery(e.target.value);
              setValue("dish_name", e.target.value);
            }}
          />
          {/* Dropdown */}
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-md">
              {filtered.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm hover:bg-accent capitalize transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs font-medium text-red-500 min-h-[16px]">{errors.dish_name?.message ?? ""}</p>
      </div>

      {/* Servings */}
      <div className="space-y-2">
        <Label htmlFor="servings">Number of Servings</Label>
        <Input
          id="servings"
          type="number"
          step="0.5"
          min="0.5"
          placeholder="e.g. 1, 1.5, 2"
          {...register("servings", { valueAsNumber: true })}
        />
        <p className="text-xs font-medium text-red-500 min-h-[16px]">{errors.servings?.message ?? ""}</p>
      </div>

      <Button type="submit" className="w-full border-2 border-primary" variant="default" disabled={isSubmitDisabled}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Looking up calories...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Get Calories
          </>
        )}
      </Button>
    </form>
  );
}
