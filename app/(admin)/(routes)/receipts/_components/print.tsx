'use client';

import { ServiceReceipt } from '@/interfaces/service-receipt';
import { Page, Text, View, Document, Image, PDFViewer } from '@react-pdf/renderer';
import { ServiceReceiptDetail } from '@/interfaces/service-receipt-detail';
import { formatoWithZeros } from '@/lib/utils';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import { NumerosALetras } from '@/lib/numbers-to-words-es';
import qrCode from 'qrcode';

interface responseDetail {
	receipt: ServiceReceipt;
	detail: ServiceReceiptDetail[];
}

const PrintComponent = ({ receipt, detail }: responseDetail) => {
	const generateQRCode = async (text: string): Promise<any> => {
		try {
			const qrImage = await qrCode.toDataURL(text);
			return qrImage;
		} catch (error) {
			console.error('Error al generar el código QR:', error);
			return null;
		}
	};
	const dater = new Date(receipt.paymentDate);
	return (
		<div className='h-screen'>
			<PDFViewer width={'100%'} height={'100%'}>
				<Document>
					<Page size={'A6'} orientation='landscape'>
						<View
							style={{
								paddingVertical: 20,
								fontSize: 10,
								paddingHorizontal: 30,
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								{/* aca es el primer bloque */}
								<View
									style={{
										flexDirection: 'column',
										width: 200,
										textAlign: 'center',
									}}
								>
									<View>
										<Text>MUNICIPALIDAD CENTRO POBLADO</Text>
										<Text>&ldquo;SAN MART&Iacute;N DE PORRES&ldquo;</Text>
										<Text style={{ paddingVertical: -10 }}>______________________</Text>
									</View>
									<View style={{ fontSize: 6, marginTop: -10 }}>
										<Text>Calle: Puno S/N-Plaza de Armas</Text>
										<Text>DISTRITO SAN JOS&Eacute; - PROV. DE PACASMAYO</Text>
										<Text>R.U.C. 20226960172</Text>
									</View>
								</View>

								<View>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<Text>Total S/. {receipt.amount}</Text>
										<Text>Nº {formatoWithZeros(receipt.autoIncrement)}</Text>
									</View>
									<View
										style={{
											backgroundColor: '#000000',
											color: '#ffffff',
											padding: 5,
											alignItems: 'center',
											borderRadius: 3,
											marginTop: 5,
										}}
									>
										<Text>RECIBO DE INGRESOS</Text>
										<Text>{receipt.service.name.toUpperCase()}</Text>
									</View>
								</View>
							</View>

							<View
								style={{
									paddingTop: 10,
									fontSize: 8,
									flexDirection: 'row',
									borderBottom: 1,
								}}
							>
								<View style={{ width: '70%', alignItems: 'flex-start' }}>
									<Text> Usuario: {receipt.client.name}</Text>
									<Text>Dirección: {receipt.client.address}</Text>
								</View>
								<View style={{ width: '30%', alignItems: 'flex-end' }}>
									<Text>Fecha: {receipt.paymentDate}</Text>
								</View>
							</View>
							<View
								style={{
									marginTop: 10,
									border: 1,
									padding: 5,
									borderRadius: 5,
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										marginBottom: 5,
										borderBottom: 1,
										fontSize: 7,
									}}
								>
									<View style={{ width: '70%' }}>
										<Text>Servicio</Text>
									</View>
									<View
										style={{
											width: '30%',
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										{Number(receipt.months) > 0 && (
											<Text style={{ marginLeft: 30 }}>Mes</Text>
										)}
										{Number(receipt.months) > 0 && (
											<Text style={{ marginLeft: 5 }}>Año</Text>
										)}

										<Text>Total</Text>
									</View>
								</View>
								<View style={{ fontSize: 7 }}>
									{Number(receipt.amount) > 0 &&
										detail.map((d, index) => {
											const date = new Date(d.paymentDate);
											const mes = format(date, 'MMMM', { locale: es });
											const year = format(date, 'yyyy');
											return (
												<View
													key={index}
													style={{ flexDirection: 'row', paddingBottom: 2 }}
												>
													<View style={{ width: '70%' }}>
														<Text>{receipt.service.name}</Text>
													</View>
													<View
														style={{
															width: '30%',
															flexDirection: 'row',
														}}
													>
														<View style={{ width: 60 }}>
															<Text style={{ textAlign: 'right' }}>{mes}</Text>
														</View>
														<View style={{ width: 45 }}>
															<Text style={{ textAlign: 'right' }}>{year}</Text>
														</View>
														<View style={{ width: 40 }}>
															<Text style={{ textAlign: 'right' }}>{d.amount}</Text>
														</View>
													</View>
												</View>
											);
										})}
								</View>
								{Number(receipt.months) === 0 && (
									<View
										style={{
											flexDirection: 'row',
											fontSize: 7,
										}}
									>
										<View style={{ width: '70%' }}>
											<Text>{receipt.service.name}</Text>
										</View>
										<View
											style={{
												width: '30%',
												flexDirection: 'row',
												justifyContent: 'space-between',
											}}
										>
											<Text>S/.{receipt.amount}</Text>
										</View>
									</View>
								)}
							</View>
							{/* Esta es la parte de soles */}
							<View
								style={{
									marginTop: 10,
									border: 1,
									padding: 5,
									borderRadius: 5,
								}}
							>
								<Text style={{ fontSize: 8 }}>
									Son: {NumerosALetras(Number(receipt.amount))}
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									paddingHorizontal: 10,
									paddingTop: 10,
									fontSize: 7,
								}}
							>
								<View
									style={{
										flexDirection: 'column',
										justifyContent: 'center',
										width: 80,
										textAlign: 'center',
									}}
								>
									<Text>________________</Text> <Text>Hecho por</Text>
								</View>
								<View
									style={{
										flexDirection: 'column',
										justifyContent: 'center',
										width: 80,
										textAlign: 'center',
									}}
								>
									<Text>________________</Text> <Text>VºBº</Text>
								</View>
								<View
									style={{
										flexDirection: 'column',
										justifyContent: 'center',
										width: 90,
										textAlign: 'center',
									}}
								>
									<Text>________________</Text> <Text>Recibí Conforme</Text>
								</View>
							</View>
							{/* aca el qr */}
							<View
								style={{
									position: 'absolute',
									left: '50%',
									right: '50%',
									flexDirection: 'column',
									justifyContent: 'center',
									alignContent: 'center',
									alignItems: 'center',
									width: 80,
									bottom: -30, // Ajusta la posición horizontal según tus preferencias
									zIndex: -1, // Coloca el texto por debajo de otros elementos
								}}
							>
								<Image
									src={generateQRCode(
										process.env.NEXT_PUBLIC_SITE_URL + '/detail/' + receipt._id
									)}
									style={{ width: 40, height: 40 }}
								/>
							</View>
						</View>
					</Page>
				</Document>
			</PDFViewer>
		</div>
	);
};
export default PrintComponent;
