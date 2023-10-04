'use client';

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

import { Icons } from '@/components/icons';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useFetch } from '@/hooks/useFetch';
import { InputSearch } from '@/components/input-search';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const createProviderSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	condition: z.enum(['HABIDO', 'NO HABIDO'], { required_error: 'La condicion es requerida' }),
	state: z.enum(['ACTIVO', 'INACTIVO'], { required_error: 'El estado es requerido' }),
	direction: z.string({ required_error: 'La direccion es obligatoria' }).max(200, {
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

	const { fetchWithToken, fetchLoading } = useFetch();
	const [IsLoadingSearch, setIsLoadingSearch] = useState(false);

	const form = useForm<z.infer<typeof createProviderSchema>>({
		resolver: zodResolver(createProviderSchema),
		defaultValues: initialData
			? { ...initialData, state: initialData.state ? 'ACTIVO' : 'INACTIVO' }
			: {
					document_type: 'RUC',
					name: '',
					dni_ruc: '',
					direction: '',
					state: 'ACTIVO',
					condition: 'HABIDO',
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
			form.setValue('condition', data.condicion);
			form.setValue('state', data.estado);
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

	const onSubmit = async (values: z.infer<typeof createProviderSchema>) => {
		if (initialData) {
			await fetchWithToken(`/provider/${initialData._id}`, {
				method: 'PUT',
				body: JSON.stringify(values),
			});
		} else {
			await fetchWithToken('/provider', {
				method: 'POST',
				body: JSON.stringify(values),
			});
		}
		router.push('/providers');
		router.refresh();
	};

	const onDelete = async () => {
		if (!initialData) return;

		await fetchWithToken(`/provider/${initialData._id}`, {
			method: 'PUT',
			body: JSON.stringify({ state: !initialData.state }),
		});

		router.push('/providers');
		router.refresh();
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
										<Input
											{...field}
											disabled={isSubmitting}
											placeholder='Ingrese el nombre'
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
											placeholder='Ingrese la direccion'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
					</div>

					<Button disabled={isSubmitting} type='submit' className='flex ml-auto'>
						{isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar proveedor
					</Button>
				</form>
			</Form>
		</div>
	);
};
