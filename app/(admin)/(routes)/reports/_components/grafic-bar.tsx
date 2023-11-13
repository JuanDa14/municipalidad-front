'use client';

import { formatNumberToMonth, formatPrice } from '@/lib/format';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

interface BarGraphicProps {
	data: { _id: string; total: number }[];
}

export const GraficBar = ({ data }: BarGraphicProps) => {
	const formatData = data.map((item: { _id: string; total: number }) => {
		return {
			name: formatNumberToMonth(Number(item._id)),
			total: item.total,
		};
	});

	const maxObject = formatData.reduce(
		(maxItem, currentItem) => {
			return currentItem.total > maxItem.total ? currentItem : maxItem;
		},
		{ name: '', total: 0 }
	);

	return (
		<div className='w-full md:w-3/4'>
			<div className='p-3 border shadow-md mb-2 '>
				<h1>Mes con mas solicitudes :</h1>
				<h2 className=' font-semibold'>
					{maxObject.name} con {formatPrice(maxObject.total)}
				</h2>
			</div>
			<h1>Ingresos por servicios mensuales</h1>
			<hr className='mb-5' />
			<ResponsiveContainer width='100%' height={500}>
				<BarChart data={formatData}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						dataKey='name'
						stroke='#888888'
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						stroke='#888888'
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => formatPrice(value as number)}
					/>
					<Tooltip />
					<Legend />
					<Bar dataKey='total' fill='#adfa1d' radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
