"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { useContentStore } from "@/lib/content-store";

const COLORS = ["#3b82f6", "#e5e7eb", "#60a5fa", "#93c5fd"];

export default function Analytics() {
  const { items } = useContentStore();
  const [watchData, setWatchData] = useState([
    { name: "Watched", value: 0 },
    { name: "Unwatched", value: 0 }
  ]);
  const [platformData, setPlatformData] = useState<Array<{ name: string, value: number }>>([]);

  useEffect(() => {
    if (!items.length) return;

    // Calculate watch progress
    const watched = items.filter(item => item.watched).length;
    const total = items.length;
    setWatchData([
      { name: "Watched", value: watched },
      { name: "Unwatched", value: total - watched }
    ]);

    // Calculate platform distribution
    const platforms = items.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const platformStats = Object.entries(platforms).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round((count / total) * 100)
    })).sort((a, b) => b.value - a.value);

    setPlatformData(platformStats);
  }, [items]);

  if (!items.length) {
    return (
      <div className="space-y-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">No content yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Add some content to see your analytics</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Watch Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={watchData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {watchData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: '#111827'
                  }}
                />
                <Legend 
                  formatter={(value) => <span className="text-gray-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Platform Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {platformData.map((platform, index) => (
            <div key={platform.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{platform.name}</span>
                <span className="text-gray-600">{platform.value}%</span>
              </div>
              <Progress 
                value={platform.value} 
                className="h-2 bg-gray-100"
                style={{
                  '--progress-background': COLORS[index % COLORS.length]
                } as React.CSSProperties}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}