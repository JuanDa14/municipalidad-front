import { QRDetail } from '@/app/(root)/_components/qr-detail';
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { ServiceReceiptDetail } from '@/interfaces/service-receipt-detail';

interface PrintIdProps {
	params: {
		id: string;
	};
}

interface responseDetail {
	receipt: ServiceReceipt;
	details: ServiceReceiptDetail[];
}

async function getReceipt(id: string): Promise<responseDetail> {
	const resp = await fetch(`${process.env.API_URL}/service-receipt/print/${id}`, {
		cache: 'no-cache',
	});

	const data = await resp.json();
	return data;
}
const PageDetail = async ({ params }: PrintIdProps) => {
	const data = await getReceipt(params.id);
	return <QRDetail details={data.details} receipt={data.receipt} />;
};

export default PageDetail;
