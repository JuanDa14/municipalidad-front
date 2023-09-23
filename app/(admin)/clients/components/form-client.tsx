'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { useFetch } from '@/hooks/useFetch';
import { Icons } from '@/components/icons';
import { Client } from '@/interfaces/client';
import { Textarea } from '@/components/ui/textarea';

const createClientSchema = z.object({
	first_name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	last_name: z.string({ required_error: 'El apellido es requerido' }).min(3, {
		message: 'El apellido debe tener al menos 3 caracteres.',
	}),
	phone: z
		.string({ required_error: 'El teléfono es requerido' })
		.min(9, {
			message: 'El teléfono debe tener al menos 9 caracteres.',
		})
		.max(9, {
			message: 'El teléfono debe tener máximo 9 caracteres.',
		}),
	direction: z
		.string({ required_error: 'La direccion es obligatoria' })
		.max(100, {
			message: 'La dirección debe tener máximo 100 caracteres.',
		})
		.optional(),
	type: z.enum(['Natural', 'Jurídico']),
	dni: z
		.string({ required_error: 'El DNI es requerido' })
		.min(8, {
			message: 'El DNI debe tener al menos 8 caracteres.',
		})
		.max(8, {
			message: 'El DNI debe tener máximo 8 caracteres.',
		}),
});

export const FormClient = ({ initialData }: { initialData?: Client }) => {
	const router = useRouter();
	const { fetchWithAccessToken } = useFetch();

	const form = useForm<z.infer<typeof createClientSchema>>({
		resolver: zodResolver(createClientSchema),
		defaultValues: initialData || {
			first_name: '',
			last_name: '',
			phone: '',
			direction: '',
			type: 'Natural',
			dni: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof createClientSchema>) => {
		if (initialData) {
			//Update
			const data = await fetchWithAccessToken(`/client/${initialData._id}`, {
				method: 'PUT',
				body: JSON.stringify(values),
			});

			if (data.ok) {
				router.push('/clients');
				router.refresh();
			}
		} else {
			//Create
			const data = await fetchWithAccessToken('/client', {
				method: 'POST',
				body: JSON.stringify(values),
			});
			if (data.ok) {
				router.push('/clients');
				router.refresh();
			}
		}
	};

	return (
		<div className='h-full p-4 space-y-2 max-w-5xl mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-2 w-full'>
						<div className='flex justify-between'>
							<div className='text-lg font-medium'>
								<h3>Formulario de Cliente</h3>
								<p className='text-sm text-muted-foreground'>
									Complete todos los datos correctamente.
								</p>
							</div>
						</div>
						<Separator className='bg-primary/10' />
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='first_name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre Completo</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder='Ingrese el nombre completo'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='last_name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Apellidos</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder='Ingrese los apellidos'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='dni'
							render={({ field }) => (
								<FormItem>
									<FormLabel>DNI</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={isLoading}
											placeholder='Ingrese el DNI'
											{...field}
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
									<FormLabel>Tipo de cliente</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='bg-background'>
												<SelectValue
													defaultValue={field.value}
													placeholder='Seleccione el tipo de cliente'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{['Jurídico', 'Natural'].map((row) => (
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
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefono</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={isLoading}
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
										<Textarea
											disabled={isLoading}
											placeholder='Ingrese la dirección'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={isLoading} type='submit' className='flex ml-auto'>
						{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar cliente
					</Button>
				</form>
			</Form>
		</div>
	);
};
