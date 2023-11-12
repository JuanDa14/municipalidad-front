
"use client";
import { formatNumberToMonth, formatPrice } from "@/lib/format";
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip,Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


interface PieGraphicProps {
  data: { _id: string; total: number }[];
}
export const GraficPie = ({data}:PieGraphicProps) => {
    const formatData = data.map((item: { _id: string; total: number }) => {
      return {
        name: formatNumberToMonth(Number(item._id)),
        value: item.total,
      };
    });
    const maxObject = formatData.reduce(
      (maxItem, currentItem) => {
        return currentItem.value > maxItem.value ? currentItem : maxItem;
      },
      { name:'',value: 0}
    );

  return (
    <div>
      <div className="p-3 border shadow-lg mb-2">
        <h1>Mes con mas solicitudes :</h1>
        <h2 className=" font-semibold">{maxObject.name} con {maxObject.value} salicitudes</h2>
      </div>
      <div>
        <h1>Solicitudes por mes</h1>
        <hr />
        <ResponsiveContainer width="100%" height={350}>
          <PieChart width={500} height={400}>
            <Pie
              data={formatData}
              cx="50%"
              cy="50%"
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {formatData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "10px" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
