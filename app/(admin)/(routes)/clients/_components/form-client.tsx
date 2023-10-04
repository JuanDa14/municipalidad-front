'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Trash } from 'lucide-react';

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
import { Icons } from '@/components/icons';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useFetch } from '@/hooks/useFetch';
import { Client } from '@/interfaces/client';
import { InputSearch } from '@/components/input-search';
import { toast } from '@/components/ui/use-toast';

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
	direction: z.string({ required_error: 'La direccion es obligatoria' }).max(200, {
		message: 'La dirección debe tener máximo 100 caracteres.',
	}),
	document_type: z.enum(['DNI', 'RUC']),
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

	const { fetchWithToken, fetchLoading } = useFetch();

	const [IsLoadingSearch, setIsLoadingSearch] = useState(false);

	const form = useForm<z.infer<typeof createClientSchema>>({
		resolver: zodResolver(createClientSchema),
		defaultValues: initialData || {
			name: '',
			phone: '',
			direction: '',
			dni_ruc: '',
			document_type: 'DNI',
			email: '',
		},
	});

	const { isSubmitting } = form.formState;

	const onSearch = async () => {
		const ruc = form.getValues('dni_ruc');
		const document = form.getValues('document_type');
		const documentType = document === 'DNI' ? 'dni' : 'ruc';

		if (ruc.length === 0 || document.length === 0) return;

		try {
			setIsLoadingSearch(true);

			const resp = await fetch(
				`${process.env.NEXT_PUBLIC_RENIEC_API}?tipo=${documentType}&numero=${ruc}`
			);

			const data = await resp.json();

			if (data.error) {
				return toast({
					title: 'Error',
					description: data.error,
					variant: 'destructive',
				});
			}

			form.setValue('name', data.nombre);
			form.setValue('direction', data.direccion);
			form.setValue('phone', data.numero);
		} catch {
			toast({
				title: 'Error',
				description: 'Ocurrio un error al obtener los datos.',
				variant: 'destructive',
			});
		} finally {
			setIsLoadingSearch(false);
		}
	};

	const onSubmit = async (values: z.infer<typeof createClientSchema>) => {
		if (initialData) {
			await fetchWithToken(`/client/${initialData._id}`, {
				method: 'PUT',
				body: JSON.stringify(values),
			});
		} else {
			await fetchWithToken('/client', {
				method: 'POST',
				body: JSON.stringify(values),
			});
		}
		router.push('/clients');
		router.refresh();
	};

	const onDelete = async () => {
		if (!initialData) return;

		await fetchWithToken(`/client/${initialData._id}`, {
			method: 'PUT',
			body: JSON.stringify({ state: !initialData.state }),
		});

		router.push('/clients');
		router.refresh();
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
								disabled={fetchLoading}
								onClick={() => router.back()}
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Atras
							</Button>
							{initialData && (
								<ConfirmModal disabled={fetchLoading} onConfirm={onDelete}>
									<Button disabled={fetchLoading}>
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
							control={form.control}
							name='dni_ruc'
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
							name='direction'
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
					</div>

					<Button disabled={isSubmitting} type='submit' className='flex ml-auto'>
						{isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar cliente
					</Button>
				</form>
			</Form>
		</div>
	);
};
