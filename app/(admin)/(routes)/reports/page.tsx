import { Metadata } from 'next';
import { Main } from './_components/main';

export const metadata: Metadata = {
	title: 'Reportes',
	description: 'Generated by create next app',
};

async function getYears() {
	const resp = await fetch(`${process.env.API_URL}/reports/years`, {
		cache: 'no-cache',
	});

	const data = await resp.json();

	return data;
}

const Page = async () => {
	const data = await getYears();

	return <Main years={data.years} months={data.months}></Main>;
};

export default Page;
