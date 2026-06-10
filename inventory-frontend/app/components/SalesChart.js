"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesChart({ sales }) {

  // CHART DATA
  const data = sales.map((sale, index) => ({
    name: `Sale ${index + 1}`,
    revenue: Number(sale.total_price),
  }));

  return (

    <div className="mt-0 rounded-xl bg-transparent">

      <ResponsiveContainer width="100%" height={190}>

        <AreaChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(91, 141, 239, 0.18)"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#bac8e8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#bac8e8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#071633",
              border: "1px solid rgba(82, 151, 255, 0.35)",
              borderRadius: "8px",
              color: "#fff",
            }}
            cursor={{ stroke: "rgba(78, 194, 255, 0.25)" }}
          />

          <defs>
            <linearGradient id="salesGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4cc9ff" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#5b5fff" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <Area
            dataKey="revenue"
            type="monotone"
            stroke="#48c8ff"
            strokeWidth={3}
            fill="url(#salesGlow)"
            dot={{ r: 4, fill: "#66e3ff", stroke: "#0b1b43", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#ffffff", stroke: "#48c8ff", strokeWidth: 3 }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}
