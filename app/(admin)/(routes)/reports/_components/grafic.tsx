"use client"
import { formatNumberToMonth, formatPrice } from "@/lib/format";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarGraphicProps {
  data: { _id: string; total: number }[];
}

export const Grafic = ({data}:BarGraphicProps) => {
    const [year, setyear] = useState('2000')
    	const formatData = data.map((item: { _id: string; total: number }) => {
        return {
          name: formatNumberToMonth(Number(item._id)),
          total: item.total,
        };
      });
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formatData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatPrice(value as number)}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
