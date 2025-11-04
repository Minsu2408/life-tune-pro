import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Dumbbell, Clock, Flame } from "lucide-react";
import { useState } from "react";

interface WorkoutRecord {
  id: number;
  name: string;
  duration: number;
  calories: number;
  type: string;
  date: string;
}

const Workout = () => {
  const [workouts] = useState<WorkoutRecord[]>([
    {
      id: 1,
      name: "러닝",
      duration: 30,
      calories: 250,
      type: "유산소",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "웨이트 트레이닝",
      duration: 45,
      calories: 180,
      type: "근력",
      date: "2024-01-15",
    },
    {
      id: 3,
      name: "요가",
      duration: 60,
      calories: 120,
      type: "스트레칭",
      date: "2024-01-14",
    },
  ]);

  const recommendedWorkouts = [
    { name: "아침 러닝", duration: 30, calories: 250, type: "유산소" },
    { name: "플랭크", duration: 15, calories: 80, type: "근력" },
    { name: "사이클링", duration: 45, calories: 320, type: "유산소" },
    { name: "필라테스", duration: 50, calories: 150, type: "스트레칭" },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "유산소":
        return "bg-accent";
      case "근력":
        return "bg-primary";
      case "스트레칭":
        return "bg-secondary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">운동 관리</h1>
            <p className="text-muted-foreground">운동 기록을 추가하고 관리하세요</p>
          </div>
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            운동 추가
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Workouts */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">최근 운동 기록</h2>
            {workouts.map((workout) => (
              <Card key={workout.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Dumbbell className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{workout.name}</h3>
                        <Badge className={getTypeColor(workout.type)}>{workout.type}</Badge>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{workout.duration}분</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Flame className="w-4 h-4" />
                            <span>{workout.calories} kcal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{workout.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommended Workouts */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">추천 운동</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">맞춤 운동 루틴</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendedWorkouts.map((workout, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{workout.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {workout.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span>{workout.duration}분</span>
                      <span>•</span>
                      <span>{workout.calories} kcal</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
