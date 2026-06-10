"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrderStatusChart({ orders }) {

  const completed =
    orders.filter(
      (o) => o.order_status === "completed"
    ).length;

  const pending =
    orders.filter(
      (o) => o.order_status === "pending"
    ).length;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
  ];

  return (
    <div className="
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    rounded-3xl
    p-6">

      <h2 className="text-white text-xl font-bold mb-4">
        Order Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}