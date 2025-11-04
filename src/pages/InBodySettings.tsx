import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Activity, RefreshCw, Settings2 } from "lucide-react";

const InBodySettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [settings, setSettings] = useState({
    inbody_api_key: "",
    inbody_device_id: "",
    sync_enabled: false,
    last_sync: null as string | null,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings({
          inbody_api_key: data.inbody_api_key || "",
          inbody_device_id: data.inbody_device_id || "",
          sync_enabled: data.sync_enabled || false,
          last_sync: data.last_sync,
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "설정 불러오기 실패",
        description: "설정을 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user.id,
          inbody_api_key: settings.inbody_api_key,
          inbody_device_id: settings.inbody_device_id,
          sync_enabled: settings.sync_enabled,
        });

      if (error) throw error;

      toast({
        title: "설정 저장 완료",
        description: "InBody 설정이 성공적으로 저장되었습니다.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "저장 실패",
        description: "설정을 저장하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSyncNow = async () => {
    if (!settings.inbody_api_key || !settings.inbody_device_id) {
      toast({
        title: "동기화 불가",
        description: "API 키와 기기 ID를 먼저 설정해주세요.",
        variant: "destructive",
      });
      return;
    }

    setSyncing(true);
    try {
      // TODO: InBody API 연동 로직 구현
      // Edge function을 통해 InBody API 호출
      
      toast({
        title: "동기화 시작",
        description: "InBody 데이터를 가져오는 중입니다...",
      });

      // 임시: 동기화 시간 업데이트
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("user_settings")
          .update({ last_sync: new Date().toISOString() })
          .eq("user_id", user.id);
        
        setSettings(prev => ({ ...prev, last_sync: new Date().toISOString() }));
      }

      toast({
        title: "동기화 완료",
        description: "InBody 데이터가 업데이트되었습니다.",
      });
    } catch (error) {
      console.error("Error syncing:", error);
      toast({
        title: "동기화 실패",
        description: "데이터 동기화 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 md:pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            InBody 설정
          </h1>
          <p className="text-muted-foreground">
            InBody 기기와 연동하여 체성분 데이터를 자동으로 동기화하세요
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                <CardTitle>API 연동 설정</CardTitle>
              </div>
              <CardDescription>
                InBody API 키와 기기 ID를 입력하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API 키</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="InBody API 키를 입력하세요"
                  value={settings.inbody_api_key}
                  onChange={(e) =>
                    setSettings({ ...settings, inbody_api_key: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  InBody 관리자 포털에서 API 키를 발급받을 수 있습니다
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="device-id">기기 ID</Label>
                <Input
                  id="device-id"
                  placeholder="InBody 기기 ID를 입력하세요"
                  value={settings.inbody_device_id}
                  onChange={(e) =>
                    setSettings({ ...settings, inbody_device_id: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  연동하려는 InBody 기기의 고유 ID입니다
                </p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div className="space-y-1">
                  <Label htmlFor="sync-enabled" className="text-sm font-medium">
                    자동 동기화
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    측정 후 자동으로 데이터를 가져옵니다
                  </p>
                </div>
                <Switch
                  id="sync-enabled"
                  checked={settings.sync_enabled}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, sync_enabled: checked })
                  }
                />
              </div>

              <Button
                onClick={handleSaveSettings}
                disabled={loading}
                className="w-full"
              >
                {loading ? "저장 중..." : "설정 저장"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <CardTitle>데이터 동기화</CardTitle>
              </div>
              <CardDescription>
                InBody 기기에서 최신 측정 데이터를 가져옵니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.last_sync && (
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">마지막 동기화</p>
                  <p className="text-lg font-semibold">
                    {new Date(settings.last_sync).toLocaleString("ko-KR")}
                  </p>
                </div>
              )}

              <Button
                onClick={handleSyncNow}
                disabled={syncing || !settings.inbody_api_key || !settings.inbody_device_id}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "동기화 중..." : "지금 동기화"}
              </Button>

              {!settings.inbody_api_key || !settings.inbody_device_id ? (
                <p className="text-xs text-center text-muted-foreground">
                  동기화하려면 먼저 API 설정을 완료해주세요
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InBodySettings;
