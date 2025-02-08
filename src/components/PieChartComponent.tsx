import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "@mui/material";

interface Stockholder {
  firstName: string;
  lastName: string;
  participation: number;
}

interface Props {
  data: Stockholder[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function PieChartComponent({ data }: Props) {
  const chartData = data.map((p, index) => ({
    name: `${p.firstName} ${p.lastName}`,
    value: p.participation,
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