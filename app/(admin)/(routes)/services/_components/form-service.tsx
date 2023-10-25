'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { axios } from '@/lib/axios';
import { Service } from '@/interfaces/service';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useState, useEffect } from 'react';
import { ButtonLoading } from '@/components/button-loading';
import { ServiceType } from '@/interfaces/service-type';
import { Textarea } from '@/components/ui/textarea';

const serviceSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	description: z.string({ required_error: 'La descripcion es requerido' }).optional(),
	state: z.enum(['Activo', 'Inactivo']),
	price: z
		.number({ required_error: 'El precio es requerido' })
		.min(0, {
			message: 'El precio debe ser mayor a 0.',
		})
		.transform((val) => Number(val)),
	type: z.string({ required_error: 'El tipo es requerido' }),
});

interface FormServiceProps {
	initialData?: Service;
	serviceTypes: ServiceType[];
}

export const FormService = ({ initialData, serviceTypes }: FormServiceProps) => {
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const [serviceTypesFilter, setserviceTypesFilter] = useState<ServiceType[]>([]);

	const form = useForm<z.infer<typeof serviceSchema>>({
		resolver: zodResolver(serviceSchema),
		defaultValues: initialData
			? {
					name: initialData.name,
					description: initialData.type.description,
					state: initialData.state ? 'Activo' : 'Inactivo',
					type: initialData.type._id,
					price: initialData.price,
			  }
			: {
					name: '',
					description: serviceTypes[0].description,
					state: 'Activo',
					type: serviceTypes[0]._id,
					price: 0,
			  },
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
		if (initialData) {
			try {
				const valuesUpdated = { ...values, state: values.state === 'Activo' ? true : false };
				await axios.patch(`/service/${initialData._id}`, valuesUpdated);
				toast.success('Servicio actualizado correctamente');
				router.refresh();
				router.push('/services');
			} catch {
				toast.error('Error al actualizar el servicio');
			}
		} else {
			try {
				await axios.post('/service', values);
				toast.success('Servicio creado correctamente');
				router.refresh();
				router.push('/services');
			} catch {
				toast.error('Error al crear el servicio');
			}
		}
	};

	const onDelete = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/service/${initialData?._id}`);
			toast.success('Servicio eliminado correctamente');
			router.refresh();
			router.push('/services');
		} catch {
			toast.error('Error al eliminar el servicio');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='h-full p-6 space-y-2 mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='flex'>
						<div className='space-y-2 w-full'>
							<div className='flex justify-between'>
								<div className='text-lg font-medium'>
									<h3>Formulario de Servicios</h3>
									<p className='text-sm text-muted-foreground'>
										Complete todos los datos correctamente.
									</p>
								</div>
							</div>
						</div>
						<div className='flex gap-x-2 items-center'>
							<Button
								type='button'
								disabled={isDeleting || isSubmitting}
								variant={'outline'}
								onClick={() => router.back()}
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Atras
							</Button>
							{initialData && (
								<ConfirmModal disabled={isDeleting || isSubmitting} onConfirm={onDelete}>
									<Button disabled={isDeleting || isSubmitting}>
										<Trash className='h-4 w-4 mr-2' />
										Eliminar
									</Button>
								</ConfirmModal>
							)}
						</div>
					</div>
					<Separator className='bg-primary/10' />
					<div className='grid grid-cols-1 gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} placeholder='nombre...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Precio (S/.)</FormLabel>
									<FormControl>
										<Input
											step={0.1}
											type='number'
											disabled={isSubmitting}
											placeholder='precio...'
											value={Number(field.value)}
											name={field.name}
											onChange={(e) => {
												const value = e.target.value;
												if (value === '') {
													field.onChange(0);
												} else {
													field.onChange(Number(value));
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='type'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo de servicio</FormLabel>
									<Select
										disabled={isSubmitting}
										onValueChange={(value) => {
											const serviceType = serviceTypes.find(
												(serviceType) => serviceType._id === value
											);
											if (serviceType) {
												form.setValue('description', serviceType.description);
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
											{serviceTypes.map((serviceType) => (
												<SelectItem value={serviceType._id} key={serviceType._id}>
													{serviceType.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo pago</FormLabel>
									<FormControl>
										<Input {...field} disabled={true} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{initialData && (
							<FormField
								name='state'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Estado</FormLabel>
										<Select
											disabled={isSubmitting}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className='bg-background'>
													<SelectValue
														defaultValue={field.value}
														placeholder='Seleccione un estado'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{['Activo', 'Inactivo'].map((row) => (
													<SelectItem value={row} key={row}>
														{row}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>

					<ButtonLoading
						isSubmitting={isSubmitting || isDeleting}
						label='Guardar'
						type='submit'
					/>
				</form>
			</Form>
		</div>
	);
};
