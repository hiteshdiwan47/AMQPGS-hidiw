import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function DashboardChart({ data }) {

  return (
    <div style={{ width: "100%", height: 300 }}>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          {/* 🔥 GRID */}
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          {/* X AXIS */}
          <XAxis dataKey="name" stroke="#94a3b8" />

          {/* Y AXIS */}
          <YAxis stroke="#94a3b8" />

          {/* TOOLTIP */}
          <Tooltip 
            contentStyle={{ background: "#1e293b", border: "none" }}
          />

          {/* 🔥 LINE */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={1500}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}