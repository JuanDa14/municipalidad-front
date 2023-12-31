import { ServiceReceipt } from '@/interfaces/service-receipt';
import { ServiceReceiptDetail } from '@/interfaces/service-receipt-detail';
import dynamic from 'next/dynamic';

const PrintComponent = dynamic(() => import('../../_components/print'), {
	ssr: false,
});

interface PrintIdProps {
	params: {
		Id: string;
	};
}

interface ResponseDetail {
	receipt: ServiceReceipt;
	details: ServiceReceiptDetail[];
}

async function getReceipt(id: string): Promise<ResponseDetail> {
	const resp = await fetch(`${process.env.API_URL}/service-receipt/print/${id}`, {
		cache: 'no-cache',
	});

	const data = await resp.json();
	return data;
}

const pagePrint = async ({ params }: PrintIdProps) => {
	const data = await getReceipt(params.Id);

	return <PrintComponent receipt={data.receipt} detail={data.details} />;
};

export default pagePrint;
