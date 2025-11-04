import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Activity, Target, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-health.jpg";

const Index = () => {
  const features = [
    {
      icon: Activity,
      title: "운동 관리",
      description: "맞춤형 운동 루틴과 실시간 칼로리 추적으로 효과적인 운동을 도와드립니다",
    },
    {
      icon: Target,
      title: "목표 설정",
      description: "개인별 건강 목표를 설정하고 단계별로 달성해 나가세요",
    },
    {
      icon: TrendingUp,
      title: "진행 상황 추적",
      description: "체중, 체지방률 등 주요 건강 지표의 변화를 한눈에 확인하세요",
    },
    {
      icon: Heart,
      title: "식단 관리",
      description: "영양소 분석과 칼로리 계산으로 균형잡힌 식단을 유지하세요",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero -z-10" />
        <div
          className="absolute inset-0 opacity-10 -z-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              건강한 삶을 위한
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                스마트한 선택
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              운동, 식단, 건강 지표를 한 곳에서 관리하고
              <br />
              목표를 달성하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
                  시작하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  프로필 설정
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              모든 기능을 한 곳에서
            </h2>
            <p className="text-lg text-muted-foreground">
              건강 관리에 필요한 모든 도구를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            오늘부터 건강한 습관을 시작하세요
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            무료로 시작하고 언제든지 목표를 변경할 수 있습니다
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
              무료로 시작하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
