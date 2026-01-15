import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, MousePointerClick, TrendingUp, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  viewsTrend: number;
  clicksTrend: number;
  topLinks: { label: string; clicks: number }[];
  dailyStats: { date: string; views: number; clicks: number }[];
}

interface AnalyticsDashboardProps {
  userId: string;
}

const AnalyticsDashboard = ({ userId }: AnalyticsDashboardProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    totalClicks: 0,
    viewsTrend: 0,
    clicksTrend: 0,
    topLinks: [],
    dailyStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("7d");

  useEffect(() => {
    fetchAnalytics();
  }, [userId, timeRange]);

  const fetchAnalytics = async () => {
    if (!userId) return;

    try {
      // Calculate date range
      const now = new Date();
      let startDate: Date | null = null;
      let prevStartDate: Date | null = null;

      if (timeRange === "7d") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        prevStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      } else if (timeRange === "30d") {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        prevStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      }

      // Current period stats
      let query = supabase
        .from("analytics")
        .select("*")
        .eq("user_id", userId);

      if (startDate) {
        query = query.gte("created_at", startDate.toISOString());
      }

      const { data: currentData } = await query;

      // Previous period stats for trend
      let prevQuery = supabase
        .from("analytics")
        .select("*")
        .eq("user_id", userId);

      if (prevStartDate && startDate) {
        prevQuery = prevQuery
          .gte("created_at", prevStartDate.toISOString())
          .lt("created_at", startDate.toISOString());
      }

      const { data: prevData } = await prevQuery;

      // Calculate stats
      const currentViews = currentData?.filter(e => e.event_type === "view").length || 0;
      const currentClicks = currentData?.filter(e => e.event_type === "click").length || 0;
      const prevViews = prevData?.filter(e => e.event_type === "view").length || 0;
      const prevClicks = prevData?.filter(e => e.event_type === "click").length || 0;

      const viewsTrend = prevViews > 0 ? ((currentViews - prevViews) / prevViews) * 100 : 0;
      const clicksTrend = prevClicks > 0 ? ((currentClicks - prevClicks) / prevClicks) * 100 : 0;

      // Top links
      const linkClicks = currentData?.filter(e => e.event_type === "click" && e.link_label) || [];
      const linkCounts: Record<string, number> = {};
      linkClicks.forEach(click => {
        const label = click.link_label || "Unknown";
        linkCounts[label] = (linkCounts[label] || 0) + 1;
      });
      const topLinks = Object.entries(linkCounts)
        .map(([label, clicks]) => ({ label, clicks }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5);

      // Daily stats (last 7 days)
      const dailyStats: { date: string; views: number; clicks: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split("T")[0];
        const dayViews = currentData?.filter(e => 
          e.event_type === "view" && 
          e.created_at.startsWith(dateStr)
        ).length || 0;
        const dayClicks = currentData?.filter(e => 
          e.event_type === "click" && 
          e.created_at.startsWith(dateStr)
        ).length || 0;
        dailyStats.push({
          date: date.toLocaleDateString("en-US", { weekday: "short" }),
          views: dayViews,
          clicks: dayClicks,
        });
      }

      setAnalytics({
        totalViews: currentViews,
        totalClicks: currentClicks,
        viewsTrend,
        clicksTrend,
        topLinks,
        dailyStats,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    trend, 
    color 
  }: { 
    icon: typeof Eye; 
    label: string; 
    value: number; 
    trend: number; 
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        {trend !== 0 && (
          <div className={`flex items-center gap-1 text-xs ${
            trend > 0 ? "text-green-400" : "text-red-400"
          }`}>
            {trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(trend).toFixed(0)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading analytics...
      </div>
    );
  }

  const maxDaily = Math.max(...analytics.dailyStats.map(d => Math.max(d.views, d.clicks)), 1);

  return (
    <div className="space-y-4">
      {/* Time Range Selector */}
      <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
        <TabsList className="grid grid-cols-3 w-full bg-white/5">
          <TabsTrigger value="7d" className="text-xs">7 Days</TabsTrigger>
          <TabsTrigger value="30d" className="text-xs">30 Days</TabsTrigger>
          <TabsTrigger value="all" className="text-xs">All Time</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Eye}
          label="Profile Views"
          value={analytics.totalViews}
          trend={analytics.viewsTrend}
          color="bg-blue-500/20 text-blue-400"
        />
        <StatCard
          icon={MousePointerClick}
          label="Link Clicks"
          value={analytics.totalClicks}
          trend={analytics.clicksTrend}
          color="bg-purple-500/20 text-purple-400"
        />
      </div>

      {/* Mini Chart */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Last 7 Days</span>
        </div>
        <div className="flex items-end gap-1 h-20">
          {analytics.dailyStats.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 h-14 items-end">
                <div
                  className="flex-1 bg-blue-500/60 rounded-t"
                  style={{ height: `${(day.views / maxDaily) * 100}%`, minHeight: day.views > 0 ? "4px" : "0" }}
                />
                <div
                  className="flex-1 bg-purple-500/60 rounded-t"
                  style={{ height: `${(day.clicks / maxDaily) * 100}%`, minHeight: day.clicks > 0 ? "4px" : "0" }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{day.date}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded bg-blue-500/60" />
            Views
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded bg-purple-500/60" />
            Clicks
          </div>
        </div>
      </div>

      {/* Top Links */}
      {analytics.topLinks.length > 0 && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <MousePointerClick className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Top Links</span>
          </div>
          <div className="space-y-2">
            {analytics.topLinks.map((link, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground truncate">{link.label}</span>
                <span className="text-sm font-medium text-foreground">{link.clicks}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {analytics.totalViews === 0 && analytics.totalClicks === 0 && (
        <div className="text-center py-4 text-muted-foreground text-sm">
          <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
          No analytics data yet. Share your profile to start tracking!
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
