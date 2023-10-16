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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Client } from '@/interfaces/client';
import { InputSearch } from '@/components/input-search';
import { ButtonLoading } from '@/components/button-loading';

const createClientSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	phone: z
		.string({ required_error: 'El teléfono es requerido' })
		.min(9, {
			message: 'El teléfono debe tener al menos 9 caracteres.',
		})
		.max(9, {
			message: 'El teléfono debe tener máximo 9 caracteres.',
		}),
	address: z.string({ required_error: 'La direccion es obligatoria' }).max(200, {
		message: 'La dirección debe tener máximo 100 caracteres.',
	}),
	document_type: z.enum(['DNI', 'RUC']),
	state: z.enum(['Activo', 'Inactivo']),
	dni_ruc: z.string({ required_error: 'El DNI/RUC es requerido' }),
	email: z.string({ required_error: 'El email es requerido' }).email({
		message: 'El email debe ser válido',
	}),
});

interface FormClientProps {
	initialData?: Client;
}

export const FormClient = ({ initialData }: FormClientProps) => {
	const router = useRouter();

	const [IsLoadingSearch, setIsLoadingSearch] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createClientSchema>>({
		resolver: zodResolver(createClientSchema),
		defaultValues: initialData
			? { ...initialData, state: initialData.state ? 'Activo' : 'Inactivo' }
			: {
					name: '',
					phone: '',
					address: '',
					dni_ruc: '',
					email: '',
					document_type: 'DNI',
					state: 'Activo',
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
				return;
			}
			toast.error('No se encontró el DNI/RUC');
		} catch {
			toast.error('No se encontró el DNI/RUC');
		} finally {
			setIsLoadingSearch(false);
		}
	};

	const onSubmit = async (values: z.infer<typeof createClientSchema>) => {
		if (initialData) {
			try {
				const valuesUpdated = { ...values, state: values.state === 'Activo' ? true : false };
				await axios.patch(`/client/${initialData._id}`, valuesUpdated);
				toast.success('Cliente actualizado correctamente');
				router.refresh();
				router.push('/clients');
			} catch {
				toast.error('Error al actualizar el cliente');
			}
		} else {
			try {
				await axios.post('/client', values);
				toast.success('Cliente creado correctamente');
				router.refresh();
				router.push('/clients');
			} catch {
				toast.error('Error al crear el cliente');
			}
		}
	};

	const onDelete = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/client/${initialData?._id}`);
			toast.success('Cliente eliminado correctamente');
			router.refresh();
			router.push('/clients');
		} catch {
			toast.error('Error al eliminar el cliente');
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
								<h3>Formulario de Cliente</h3>
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
													placeholder='Seleccione el tipo de documento'
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
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder='Ingrese el nombre'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder='Ingrese el correo'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefono</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={isSubmitting}
											placeholder='Ingrese el teléfono'
											{...field}
										/>
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
											placeholder='Ingrese la dirección'
											{...field}
										/>
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
