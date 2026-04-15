"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { calorieApi } from "@/lib/api";
import { useMealStore } from "@/stores/mealStore";
import { CalorieResult, ApiError } from "@/types";
import { CalorieInput } from "@/lib/validations";
import { MealForm } from "@/components/MealForm";
import { ResultCard } from "@/components/ResultCard";
import { NavBar } from "@/components/NavBar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CaloriesPage() {
  const { isAuthenticated } = useAuthGuard();
  const { saveSearchResult, lastResult } = useMealStore();
  const [isLoading, setIsLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  // Countdown timer for rate limit
  useEffect(() => {
    if (retryAfter === null || retryAfter <= 0) return;
    const interval = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [retryAfter]);

  async function handleSearch(data: CalorieInput) {
    setIsLoading(true);
    setRetryAfter(null);
    try {
      const result = await calorieApi.getCalories(data) as CalorieResult;
      saveSearchResult(result);
      toast.success("Calorie data found!");
    } catch (err) {
      const error = err as ApiError;
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Calorie Search</h1>
          <p className="text-muted-foreground mb-6">
            Search for any dish to get calorie information.
          </p>

          <MealForm onSubmit={handleSearch} isLoading={isLoading} />

          {/* Rate Limit Countdown */}
          {retryAfter !== null && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Rate limit reached. Please wait{" "}
                <span className="font-bold">{retryAfter}s</span> before trying
                again.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {lastResult && <ResultCard result={lastResult} />}
      </main>
    </div>
  );
}
