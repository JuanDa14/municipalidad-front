'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RequestAttachmentState } from '@/interfaces/request-attachment';
import { axios } from '@/lib/axios';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { ServiceReceiptDetail } from '@/interfaces/service-receipt-detail';
import { QRDetail } from '@/app/(root)/_components/qr-detail';
import { Loader2 } from 'lucide-react';

interface ViewReceiptModalProps {
	children: React.ReactNode;
	receiptId: string;
}

interface ResponseReceiptDetail {
	receipt: ServiceReceipt;
	details: ServiceReceiptDetail[];
}

export const ViewReceiptModal = ({ children, receiptId }: ViewReceiptModalProps) => {
	const [receiptData, setReceiptData] = useState<ResponseReceiptDetail | null>(null);
	const [isMounted, setisMounted] = useState(true);

	const handleReceipt = useCallback(async () => {
		const getReceipt = async () => {
			if (receiptId) {
				try {
					const { data } = await axios.get(`/service-receipt/print/${receiptId}`);
					setReceiptData(data);
				} catch (error) {
					console.error('Error al obtener el recibo:', error);
					toast.error('Ocurrió un error al obtener el recibo');
				}
			}
		};

		getReceipt();
	}, [receiptId]);

	useEffect(() => {
		handleReceipt();
	}, [handleReceipt]);

	useEffect(() => {
		return () => {
			setisMounted(false);
		};
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				{receiptData ? (
					<QRDetail details={receiptData.details} receipt={receiptData.receipt} />
				) : (
					<div className='h-52 w-full'>
						<div className='h-full w-full flex items-center justify-center'>
							<Loader2 className='animate-spin' />
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};
