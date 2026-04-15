"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { NavBar } from "@/components/NavBar";
import { MealHistoryTable } from "@/components/MealHistoryTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Search, Flame, Utensils, Clock } from "lucide-react";

export default function DashboardPage() {
  const { isAuthenticated } = useAuthGuard();
  const user = useAuthStore((state) => state.user);
  const history = useMealStore((state) => state.history);

  if (!isAuthenticated) return null;

  const totalSearches = history.length;
  const avgCalories =
    totalSearches > 0
      ? Math.round(
        history.reduce((sum, item) => sum + item.total_calories, 0) /
        totalSearches
      )
      : 0;
  const lastSearch = history[0]?.dish_name ?? "None yet";

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Total Searches
              </CardDescription>
              <CardTitle className="text-3xl">{totalSearches}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Avg Calories
              </CardDescription>
              <CardTitle className="text-3xl">
                {avgCalories > 0 ? `${avgCalories} kcal` : "—"}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last Search
              </CardDescription>
              <CardTitle className="text-lg capitalize truncate">
                {lastSearch}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Meal History */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Searches</h2>
          <MealHistoryTable />
        </div>
      </main>
    </div>
  );
}
