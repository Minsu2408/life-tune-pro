import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Flame, Target, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "오늘 칼로리",
      value: "1,450",
      target: "2,000",
      unit: "kcal",
      progress: 72.5,
      icon: Flame,
      color: "text-accent",
    },
    {
      title: "운동 시간",
      value: "45",
      target: "60",
      unit: "분",
      progress: 75,
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "목표 달성률",
      value: "85",
      target: "100",
      unit: "%",
      progress: 85,
      icon: Target,
      color: "text-success",
    },
    {
      title: "체중 변화",
      value: "-2.3",
      target: "-5",
      unit: "kg",
      progress: 46,
      icon: TrendingUp,
      color: "text-secondary",
    },
  ];

  const weeklyData = [
    { day: "월", calories: 1800, workout: 30 },
    { day: "화", calories: 2100, workout: 45 },
    { day: "수", calories: 1950, workout: 60 },
    { day: "목", calories: 2200, workout: 40 },
    { day: "금", calories: 1850, workout: 50 },
    { day: "토", calories: 2300, workout: 75 },
    { day: "일", calories: 1450, workout: 45 },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">대시보드</h1>
          <p className="text-muted-foreground">오늘의 건강 상태를 확인하세요</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">
                        / {stat.target} {stat.unit}
                      </span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weekly Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>주간 칼로리 섭취</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.day}</span>
                      <span className="text-muted-foreground">{data.calories} kcal</span>
                    </div>
                    <Progress value={(data.calories / 2500) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>주간 운동 시간</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.day}</span>
                      <span className="text-muted-foreground">{data.workout} 분</span>
                    </div>
                    <Progress value={(data.workout / 90) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
