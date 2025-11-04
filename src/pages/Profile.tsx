import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Ruler, Weight, Calendar, Target } from "lucide-react";

const Profile = () => {
  const userInfo = {
    name: "김건강",
    email: "health@example.com",
    age: 28,
    gender: "남성",
    height: 175,
    currentWeight: 72.3,
    targetWeight: 70,
    goal: "체중 감량",
    startDate: "2024-01-01",
  };

  const achievements = [
    { title: "일주일 연속 기록", icon: "🔥" },
    { title: "첫 목표 달성", icon: "🎯" },
    { title: "100km 달리기", icon: "🏃" },
    { title: "30일 챌린지", icon: "💪" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">프로필</h1>
          <p className="text-muted-foreground">개인 정보와 건강 목표를 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" defaultValue={userInfo.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" defaultValue={userInfo.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">나이</Label>
                    <Input id="age" type="number" defaultValue={userInfo.age} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">성별</Label>
                    <Input id="gender" defaultValue={userInfo.gender} disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Body Stats */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>신체 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center space-x-2 mb-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">키</span>
                  </div>
                  <p className="text-2xl font-bold">{userInfo.height} cm</p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center space-x-2 mb-2">
                    <Weight className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">현재 체중</span>
                  </div>
                  <p className="text-2xl font-bold">{userInfo.currentWeight} kg</p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">목표 체중</span>
                  </div>
                  <p className="text-2xl font-bold">{userInfo.targetWeight} kg</p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">시작일</span>
                  </div>
                  <p className="text-lg font-semibold">{userInfo.startDate}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Label className="mb-2 block">건강 목표</Label>
                <Badge className="bg-gradient-primary">{userInfo.goal}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>달성 배지</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <span className="font-medium text-sm">{achievement.title}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline">취소</Button>
          <Button className="bg-gradient-primary shadow-glow">저장하기</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
