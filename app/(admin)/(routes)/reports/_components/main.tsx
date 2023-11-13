'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ComboFilter from './combo-filter';
import { useState, useEffect, useCallback } from 'react';
import { axios } from '@/lib/axios';
import { GraficBar } from './grafic-bar';
import { GraficPie } from './grafic-pie';
import { TableReport } from './table-report';
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { RequestAttachment } from '@/interfaces/request-attachment';

interface MainProps {
	years: number[];
	months: number[];
}

export const Main = ({ years, months }: MainProps) => {
	const [year, setYear] = useState('');
	const [monthR, setMonthR] = useState('');
	const [yearR, setYearR] = useState('');

	const [chartDataBar, setchartDataBar] = useState<{ _id: string; total: number }[]>([]);
	const [chartDataPie, setchartDataPie] = useState<{ _id: string; total: number }[]>([]);

	const [serviceReport, setserviceReport] = useState<ServiceReceipt[]>([]);
	const [requestReport, setrequestReport] = useState<RequestAttachment[]>([]);

	const handleDataCharts = useCallback(async () => {
		if (year === '') return;
		const getDataCharts = async () => {
			const paramyear = {
				year: Number(year),
			};
			const charts = await axios.post(`/reports/monthsByYear`, paramyear);
			const data = charts.data;
			setchartDataPie(data.charts.RequestChart);
			setchartDataBar(data.charts.ServiceReceiptChart);
		};
		getDataCharts();
	}, [year]);

	useEffect(() => {
		handleDataCharts();
	}, [handleDataCharts]);

	const handleReports = useCallback(async () => {
		if ([monthR, yearR].includes('')) return;
		const getReports = async () => {
			const params = {
				year: Number(yearR),
				month: Number(monthR),
			};
			const { data } = await axios.post(`/reports/report`, params);
			const dataJson = data.data;

			setserviceReport(dataJson.serviceReport);
			setrequestReport(dataJson.requestReport);
		};
		getReports();
	}, [monthR, yearR]);

	useEffect(() => {
		handleReports();
	}, [handleReports]);

	return (
		<div>
			<Tabs defaultValue='graphic' className='w-full flex flex-col justify-center'>
				<TabsList className='flex gap-x-5 text-lg'>
					<TabsTrigger value='graphic'>Graficos</TabsTrigger>
					<TabsTrigger value='report'>Reporte</TabsTrigger>
				</TabsList>

				<TabsContent value='graphic'>
					<div className='w-full flex justify-center items-center flex-col  gap-y-10 p-5 px-24'>
						<ComboFilter years={years} setYear={setYear} setMonth={setMonthR}></ComboFilter>
						<div className=' w-full flex flex-col md:flex-row gap-x-10'>
							<GraficBar data={chartDataBar}></GraficBar>
							<GraficPie data={chartDataPie}></GraficPie>
						</div>
					</div>
				</TabsContent>

				<TabsContent value='report'>
					<div className='w-full flex flex-col gap-5 justify-center items-center mb-5'>
						<ComboFilter
							months={months}
							years={years}
							setYear={setYearR}
							setMonth={setMonthR}
							month
						/>
						<Tabs className='w-3/4' defaultValue='service'>
							<TabsList className='flex gap-x-5 text-lg'>
								<TabsTrigger value='service'>Servicios</TabsTrigger>
								<TabsTrigger value='request'>Solicitudes</TabsTrigger>
							</TabsList>
							<TabsContent value='service'>
								<TableReport dataservice={serviceReport} option={1}></TableReport>
							</TabsContent>
							<TabsContent value='request'>
								<TableReport datarequest={requestReport} option={2}></TableReport>
							</TabsContent>
						</Tabs>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
