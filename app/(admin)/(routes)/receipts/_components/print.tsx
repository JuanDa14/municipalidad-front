'use client';

import { ServiceReceipt } from '@/interfaces/service-receipt';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

interface ReceiptData {
	receipt: ServiceReceipt;
}

export const PrintComponent = () => {
	return (
		<div className='h-screen'>
			<PDFViewer width={'100%'} height={'100%'}>
				<Document>
					<Page size={'A5'} orientation='landscape'>
						<Text>pdf testing</Text>
					</Page>
				</Document>
			</PDFViewer>
		</div>
	);
};
