"use client";

import { useMealStore } from "@/stores/mealStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export function MealHistoryTable() {
  const { history, clearHistory } = useMealStore();

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No searches found. Search for a meal...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive gap-2"
          onClick={clearHistory}
        >
          <Trash2 className="h-4 w-4" />
          Clear History
        </Button>
      </div>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dish</TableHead>
                <TableHead>Servings</TableHead>
                <TableHead>Cal/Serving</TableHead>
                <TableHead>Total Calories</TableHead>
                <TableHead>Protein</TableHead>
                <TableHead>Carbs</TableHead>
                <TableHead>Fat</TableHead>
                <TableHead>Searched At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium capitalize">
                    {item.dish_name}
                  </TableCell>
                  <TableCell>{item.servings}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {item.calories_per_serving} kcal
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{item.total_calories} kcal</Badge>
                  </TableCell>
                  <TableCell>
                    {item.macronutrients_per_serving.protein}g
                  </TableCell>
                  <TableCell>
                    {item.macronutrients_per_serving.carbohydrates}g
                  </TableCell>
                  <TableCell>
                    {item.macronutrients_per_serving.total_fat}g
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {new Date(item.searched_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
