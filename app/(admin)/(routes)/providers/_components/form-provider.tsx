'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Axios from 'axios';
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

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { InputSearch } from '@/components/input-search';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ButtonLoading } from '@/components/button-loading';

const createProviderSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	condition: z.enum(['HABIDO', 'NO HABIDO'], { required_error: 'La condicion es requerida' }),
	state: z.enum(['ACTIVO', 'INACTIVO']),
	address: z.string({ required_error: 'La direccion es obligatoria' }).max(200, {
		message: 'La dirección debe tener máximo 100 caracteres.',
	}),
	dni_ruc: z.string({ required_error: 'El RUC es requerido' }),
	document_type: z.enum(['DNI', 'RUC'], { required_error: 'El tipo de documento es requerido' }),
});

interface FormClientProps {
	initialData?: any;
}

export const FormProvider = ({ initialData }: FormClientProps) => {
	const router = useRouter();

	const [IsLoadingSearch, setIsLoadingSearch] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createProviderSchema>>({
		resolver: zodResolver(createProviderSchema),
		defaultValues: initialData
			? { ...initialData, state: initialData.state ? 'ACTIVO' : 'INACTIVO' }
			: {
					name: '',
					dni_ruc: '',
					address: '',
					document_type: 'RUC',
					state: 'ACTIVO',
					condition: 'HABIDO',
			  },
	});

	const { isSubmitting } = form.formState;

	const onSearch = async () => {
		const ruc = form.getValues('dni_ruc');
		const document = form.getValues('document_type').toLowerCase();

		if (ruc.length === 0 || document.length === 0) return;

		try {
			setIsLoadingSearch(true);

			const { data } = await Axios.get(
				`${process.env.NEXT_PUBLIC_RENIEC_API}?tipo=${document}&numero=${ruc}`
			);

			if (!data.error) {
				form.setValue('name', data.nombre);
				form.setValue('address', data.direccion);
				form.setValue('condition', data.condicion);
				form.setValue('state', data.estado);
				return;
			}
			toast.error('No se encontró el DNI/RUC');
		} catch {
			toast.error('No se encontró el DNI/RUC');
		} finally {
			setIsLoadingSearch(false);
		}
	};

	const onSubmit = async (values: z.infer<typeof createProviderSchema>) => {
		const valuesUpdated = { ...values, state: values.state === 'ACTIVO' ? true : false };

		if (initialData) {
			try {
				await axios.patch(`/provider/${initialData._id}`, valuesUpdated);
				toast.success('Proveedor actualizado correctamente');
				router.refresh();
				router.push('/providers');
			} catch {
				toast.error('Error al actualizar el proveedor');
			}
		} else {
			try {
				await axios.post('/provider', valuesUpdated);
				toast.success('Proveedor creado correctamente');
				router.refresh();
				router.push('/providers');
			} catch {
				toast.error('Error al crear el proveedor');
			}
		}
	};

	const onDelete = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/provider/${initialData?._id}`);
			toast.success('Proveedor eliminado correctamente');
			router.refresh();
			router.push('/providers');
		} catch {
			toast.error('Error al eliminar el proveedor');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='h-full p-6 space-y-2'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='flex items-center justify-between gap-x-2 space-y-2 w-full'>
						<div className='flex justify-between'>
							<div className='text-lg font-medium'>
								<h3>Formulario de Proveedor</h3>
								<p className='text-sm text-muted-foreground'>
									Complete todos los datos correctamente.
								</p>
							</div>
						</div>
						<div className='flex gap-x-2 items-center'>
							<Button
								type='button'
								variant={'outline'}
								disabled={isDeleting || isSubmitting}
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
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							name='document_type'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo de documento</FormLabel>
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
													placeholder='Seleccione...'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{['DNI', 'RUC'].map((row) => (
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
						<FormField
							name='dni_ruc'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>DNI/RUC</FormLabel>
									<FormControl>
										<InputSearch
											isLoading={IsLoadingSearch}
											onChange={field.onChange}
											onClick={onSearch}
											value={field.value}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input {...field} disabled={isSubmitting} placeholder='nombre...' />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Direccion</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder='direccion...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{initialData && (
							<>
								<FormField
									control={form.control}
									name='condition'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Condicion</FormLabel>
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
															placeholder='Seleccione...'
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{['HABIDO', 'NO HABIDO'].map((row) => (
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
															placeholder='Seleccione...'
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{['ACTIVO', 'INACTIVO'].map((row) => (
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
							</>
						)}
					</div>

					<ButtonLoading
						isSubmitting={isSubmitting || isDeleting || IsLoadingSearch}
						label='Guardar'
						type='submit'
					/>
				</form>
			</Form>
		</div>
	);
};
