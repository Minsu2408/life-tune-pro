import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Coffee, Salad, Moon } from "lucide-react";
import { useState } from "react";

interface MealRecord {
  id: number;
  mealType: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

const Diet = () => {
  const [meals] = useState<MealRecord[]>([
    {
      id: 1,
      mealType: "아침",
      foods: ["현미밥", "계란후라이", "김치", "시금치나물"],
      calories: 450,
      protein: 18,
      carbs: 65,
      fat: 12,
      time: "08:00",
    },
    {
      id: 2,
      mealType: "점심",
      foods: ["닭가슴살 샐러드", "고구마", "방울토마토"],
      calories: 520,
      protein: 35,
      carbs: 48,
      fat: 15,
      time: "12:30",
    },
    {
      id: 3,
      mealType: "저녁",
      foods: ["연어구이", "퀴노아", "브로콜리"],
      calories: 480,
      protein: 32,
      carbs: 42,
      fat: 18,
      time: "18:00",
    },
  ]);

  const dailyGoals = {
    calories: 2000,
    protein: 100,
    carbs: 200,
    fat: 60,
  };

  const totalNutrients = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case "아침":
        return Coffee;
      case "점심":
        return Salad;
      case "저녁":
        return Moon;
      default:
        return Salad;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">식단 관리</h1>
            <p className="text-muted-foreground">오늘의 식사를 기록하고 영양소를 추적하세요</p>
          </div>
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            식사 추가
          </Button>
        </div>

        {/* Nutrition Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                칼로리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{totalNutrients.calories}</span>
                  <span className="text-sm text-muted-foreground">/ {dailyGoals.calories} kcal</span>
                </div>
                <Progress
                  value={(totalNutrients.calories / dailyGoals.calories) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                단백질
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{totalNutrients.protein}</span>
                  <span className="text-sm text-muted-foreground">/ {dailyGoals.protein}g</span>
                </div>
                <Progress
                  value={(totalNutrients.protein / dailyGoals.protein) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                탄수화물
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{totalNutrients.carbs}</span>
                  <span className="text-sm text-muted-foreground">/ {dailyGoals.carbs}g</span>
                </div>
                <Progress
                  value={(totalNutrients.carbs / dailyGoals.carbs) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                지방
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{totalNutrients.fat}</span>
                  <span className="text-sm text-muted-foreground">/ {dailyGoals.fat}g</span>
                </div>
                <Progress
                  value={(totalNutrients.fat / dailyGoals.fat) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">오늘의 식사</h2>
          {meals.map((meal) => {
            const Icon = getMealIcon(meal.mealType);
            return (
              <Card key={meal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{meal.mealType}</h3>
                        <span className="text-sm text-muted-foreground">{meal.time}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{meal.calories} kcal</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {meal.foods.map((food, index) => (
                        <Badge key={index} variant="outline">
                          {food}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">단백질</p>
                        <p className="font-semibold">{meal.protein}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">탄수화물</p>
                        <p className="font-semibold">{meal.carbs}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">지방</p>
                        <p className="font-semibold">{meal.fat}g</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Diet;
