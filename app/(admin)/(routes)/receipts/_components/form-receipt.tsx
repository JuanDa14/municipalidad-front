'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, PencilIcon, PencilLine, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { axios } from '@/lib/axios';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Service } from '@/interfaces/service';
import { ServiceReceipt } from '@/interfaces/service-receipt';
import { InputSearch } from '@/components/input-search';
import { DatePicker } from '@/components/date-picker';

const createServiceReceiptSchema = z.object({
	document_type: z.enum(['DNI', 'RUC'], {
		required_error: 'El tipo de documento es requerido',
	}),
	dni_ruc: z
		.string({ required_error: 'El dni ruc es requerido' })
		.min(8, {
			message: 'El nombre debe tener al menos 8 caracteres.',
		})
		.max(11, {
			message: 'El dni_ruc debe tener un máximo de 11 carácteres',
		}),
	service: z.string(),
	name: z.string({ required_error: 'El dni es necesario' }),
	months: z.string({
		required_error: 'La cantidad de meses es obligatorio',
	}),
	date: z.date({
		required_error: 'La fecha de inicio de pago es necesaria.',
	}),
	amount: z.string({
		required_error: 'El precio es obligatorio',
	}),
	client: z.string(),
	paymentDate: z.string().optional(),
	lastMonth: z.string().optional(),
});

interface FormReceiptProps {
	initialData?: ServiceReceipt;
	services: Service[];
}

export const FormReceipt = ({ initialData, services }: FormReceiptProps) => {
	const [isLoadingSearch, setIsLoadingSearch] = useState(false);
	const [Show, setShow] = useState(true);
	const [isEditingAmount, setisEditingAmount] = useState(true);

	const router = useRouter();

	const form = useForm<z.infer<typeof createServiceReceiptSchema>>({
		resolver: zodResolver(createServiceReceiptSchema),
		defaultValues: initialData
			? {
					...initialData,
					service: initialData.service._id,
					date: new Date(initialData.paymentDate),
					client: initialData.client._id,
					document_type: 'DNI',
					amount: String(initialData.service.price),
			  }
			: {
					document_type: 'DNI',
					dni_ruc: '',
					service: services[0]._id,
					name: '',
					months: '',
					date: new Date(),
					amount: String(services[0].price),
					client: '',
					lastMonth: '',
			  },
	});
	const selectedService = form.watch('service');

	const getLastMonth = async (val: any) => {
		return await axios.post(`/service-receipt/findLastpayment`, val);
	};

	useEffect(() => {
		const ser = form.getValues('service');
		const serviceFound = services.find((service) => service._id === ser)!;
		const isMonthly = serviceFound.type.description.toUpperCase() === 'MENSUAL';

		if (!isMonthly) {
			return setShow(false);
		}
		if (form.getValues('name') !== '') {
			const val = {
				client: form.getValues('client'),
				service: form.getValues('service'),
			};
			const putLasthMonth = async () => {
				const last = await getLastMonth(val);
				if (last) {
					form.setValue('lastMonth', last.data.paymentDate);
				} else {
					form.setValue('lastMonth', 'Ninguno');
				}
			};
			putLasthMonth();
		}
		return setShow(true);
	}, [selectedService, form, services]);

	const { isSubmitting } = form.formState;

	const onSearch = async () => {
		const ruc = form.getValues('dni_ruc');
		const document = form.getValues('document_type').toLowerCase();
		if (ruc.length === 0 || document.length === 0) {
			toast.error('Ingrese bien los datos');
			return;
		}

		try {
			setIsLoadingSearch(true);
			const { data } = await axios.get(`/client/dni/${ruc}`);
			if (data) {
				if (Show) {
					const val = {
						client: data._id,
						service: form.getValues('service'),
					};
					const last = await getLastMonth(val);

					if (last) {
						toast.success('Ciudadano encontrado');
						form.setValue('client', data._id);
						form.setValue('lastMonth', last.data.paymentDate);
						form.setValue('name', data.name);
						return;
					}
					toast.success('No hay meses Pagados');
					form.setValue('client', data._id);
					form.setValue('lastMonth', 'Ninguno');
					return;
				}
			} else {
				toast.error('No se encontró el DNI/RUC');
			}
		} catch {
			toast.error('No se encontró el DNI/RUC');
		} finally {
			setIsLoadingSearch(false);
		}
	};

	const onSubmit = async (values: z.infer<typeof createServiceReceiptSchema>) => {
		if (initialData) {
			try {
				await axios.patch(`/service-receipt/${initialData._id}`, values);
				toast.success('Recibo actualizado correctamente');
				router.refresh();
				router.push('/receipts');
			} catch {
				toast.error('Error al actualizar el recibo');
			}
		} else {
			values.paymentDate = String(values.date);
			if (values.lastMonth?.toUpperCase() !== 'NINGUNO' && Show) {
				const pagoactual = new Date(values.paymentDate);
				const ultimopago = new Date(String(values.lastMonth));
				if (pagoactual < ultimopago) {
					return toast.error('Debe ingresar una fecha superior a la del último més pagado');
				}
			}
			const valuesUpdate = {
				...values,
				months: !Show ? '0' : values.months,
			};

			try {
				await axios.post(`/service-receipt`, valuesUpdate);
				toast.success('Recibo registrado correctamente');
				router.refresh();
				router.push('/receipts');
			} catch {
				toast.error('Error al crear el recibo');
			}
		}
	};

	return (
		<div className='h-full w-full p-6 space-y-2  mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='flex items-center justify-between space-y-2'>
						<div className='flex justify-between'>
							<div className='text-lg font-medium'>
								<h3>Formulario</h3>
								<p className='text-sm text-muted-foreground'>
									Complete todos los datos correctamente.
								</p>
							</div>
						</div>
						<div className='flex gap-x-2 items-center'>
							<Button type='button' variant={'outline'} onClick={() => router.back()}>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Atras
							</Button>
						</div>
					</div>
					<Separator className='bg-primary/10' />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5'>
						<FormField
							control={form.control}
							name='dni_ruc'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Dni del ciudadano</FormLabel>
									<FormControl>
										<InputSearch
											value={field.value}
											onChange={field.onChange}
											isLoading={isLoadingSearch}
											onClick={onSearch}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre del ciudadano</FormLabel>
									<FormControl>
										<Input disabled placeholder='Nombre del ciudadano' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{Show && (
							<FormField
								control={form.control}
								name='lastMonth'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Último mes Pagado</FormLabel>
										<FormControl>
											<Input disabled placeholder='Último mes pagado' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormField
							name='service'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Servicios</FormLabel>
									<Select
										disabled={isSubmitting}
										onValueChange={(value) => {
											const serviceType = services.find(
												(serviceType) => serviceType._id === value
											);
											if (serviceType) {
												form.setValue('amount', String(serviceType.price));
											}
											field.onChange(value);
										}}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='bg-background'>
												<SelectValue
													defaultValue={field.value}
													placeholder='Seleccione...'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{services.map((service) => (
												<SelectItem value={service._id} key={service._id}>
													{service.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						{Show && (
							<FormField
								name='months'
								control={form.control}
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Meses del pago</FormLabel>
										<FormControl>
											<Input
												type='number'
												disabled={isSubmitting}
												placeholder='Ingrese el numero de meses que se va a cancelar'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormField
							name='amount'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Precio(S/.) unitario por servicio</FormLabel>
									<FormControl>
										<div className='flex items-center gap-2'>
											<Input
												step={0.1}
												type='number'
												disabled={isSubmitting || isEditingAmount}
												placeholder='Ingrese el precio del servicio'
												{...field}
											/>
											<Button
												type='button'
												variant={'secondary'}
												size={'icon'}
												onClick={() => setisEditingAmount(!isEditingAmount)}
											>
												{isEditingAmount ? (
													<PencilIcon className='w-4 h-4' />
												) : (
													<X className='w-4 h-4' />
												)}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{Show && (
							<FormField
								name='date'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fecha del mes a pagar</FormLabel>
										<FormControl>
											<DatePicker
												isSubmitting={isSubmitting}
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						)}
					</div>

					<Button className='flex ml-auto' type='submit'>
						{isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar
					</Button>
				</form>
			</Form>
		</div>
	);
};
