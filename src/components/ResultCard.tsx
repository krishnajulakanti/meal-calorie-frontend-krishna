"use client";

import { CalorieResult } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ResultCardProps {
  result: CalorieResult;
}

interface MacroBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

function MacroBar({ label, value, max, color }: MacroBarProps) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}g</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function ResultCard({ result }: ResultCardProps) {
  const per = result.macronutrients_per_serving;
  const total = result.total_macronutrients;
  const maxMacro = Math.max(per.protein, per.carbohydrates, per.total_fat);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 flex-wrap">
          
          <div>
            <CardTitle className="capitalize text-xl">
              {result.dish_name}
            </CardTitle>
          </div>

          <Badge variant="outline" className="shrink-0">
            {result.source}
          </Badge>

        </div>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Calorie Summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          
          <div className="bg-muted rounded-lg p-4">
            <p className="text-2xl font-bold text-primary">
              {result.calories_per_serving}
            </p>
            <p className="text-xs text-muted-foreground mt-1">kcal / serving</p>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <p className="text-2xl font-bold text-primary">{result.servings}</p>
            <p className="text-xs text-muted-foreground mt-1">servings</p>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <p className="text-2xl font-bold text-primary">
              {result.total_calories}
            </p>
            <p className="text-xs text-muted-foreground mt-1">total kcal</p>
          </div>
          
        </div>

        <Separator />

        {/* Macro Bars Per Serving */}
        <div>
          <h4 className="text-sm font-semibold mb-4">
            Macronutrients per Serving
          </h4>
          <div className="space-y-3">
            <MacroBar
              label="Protein"
              value={per.protein}
              max={maxMacro}
              color="bg-blue-500"
            />
            <MacroBar
              label="Carbohydrates"
              value={per.carbohydrates}
              max={maxMacro}
              color="bg-amber-500"
            />
            <MacroBar
              label="Total Fat"
              value={per.total_fat}
              max={maxMacro}
              color="bg-rose-500"
            />
            {per.fiber !== undefined && (
              <MacroBar
                label="Fiber"
                value={per.fiber}
                max={maxMacro}
                color="bg-green-500"
              />
            )}
            {per.sugars !== undefined && (
              <MacroBar
                label="Sugars"
                value={per.sugars}
                max={maxMacro}
                color="bg-pink-500"
              />
            )}
            {per.saturated_fat !== undefined && (
              <MacroBar
                label="Saturated Fat"
                value={per.saturated_fat}
                max={maxMacro}
                color="bg-orange-500"
              />
            )}
          </div>
        </div>

        {/* Total Macros — only if more than 1 serving */}
        {result.servings > 1 && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-semibold mb-3">
                Total Macronutrients ({result.servings} servings)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Protein", value: total.protein },
                  { label: "Carbs", value: total.carbohydrates },
                  { label: "Fat", value: total.total_fat },
                  ...(total.fiber !== undefined
                    ? [{ label: "Fiber", value: total.fiber }]
                    : []),
                  ...(total.sugars !== undefined
                    ? [{ label: "Sugars", value: total.sugars }]
                    : []),
                  ...(total.saturated_fat !== undefined
                    ? [{ label: "Sat. Fat", value: total.saturated_fat }]
                    : []),
                ].map((macro) => (
                  <div
                    key={macro.label}
                    className="bg-muted rounded-lg p-3 text-center"
                  >
                    <p className="text-lg font-semibold">{macro.value}g</p>
                    <p className="text-xs text-muted-foreground">
                      {macro.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
