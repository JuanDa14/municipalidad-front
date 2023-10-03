'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
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
import { Textarea } from '@/components/ui/textarea';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useFetch } from '@/hooks/useFetch';
import { Client } from '@/interfaces/client';

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
		.max(200, {
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

interface FormClientProps {
	initialData?: Client;
}

export const FormClient = ({ initialData }: FormClientProps) => {
	const router = useRouter();

	const { fetchWithToken } = useFetch();

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

	const { isSubmitting } = form.formState;

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
							<Link href={'/clients'}>
								<Button variant={'outline'}>
									<ArrowLeft className='h-4 w-4 mr-2' />
									Atras
								</Button>
							</Link>
							{initialData && (
								<ConfirmModal onConfirm={onDelete}>
									<Button>
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
							control={form.control}
							name='first_name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre Completo</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
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
											disabled={isSubmitting}
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
									<FormLabel>Dni</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={isSubmitting}
											placeholder='Ingrese el DNI'
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
					</div>
					<FormField
						name='type'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo de cliente</FormLabel>
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
						name='direction'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Direccion</FormLabel>
								<FormControl>
									<Textarea
										disabled={isSubmitting}
										placeholder='Ingrese la dirección'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button disabled={isSubmitting} type='submit' className='flex ml-auto'>
						{isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar cliente
					</Button>
				</form>
			</Form>
		</div>
	);
};
