import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "@mui/material";
import Ownership from "../pages/Dashboard"

// interface Stockholder {
//   id: number;
//   name: string;
// }

interface Enterprise {
  id: number;
  name: string;
}

interface Ownership {
  id: number;
  stockholder: number;
  stockholder_name: string;
  enterprise: Enterprise;
  enterprise_name: string;
  percentage: number;
}

interface Props {
  data: Ownership[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function PieChartComponent({ data }: Props) {
  const chartData = data.map((p, index) => ({
    name: `${p.stockholder_name}`,
    value: p.percentage,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Card sx={{ padding: 2 }}>
      <PieChart width={300} height={300}>
        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Card>
  );
}