'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { axiosUrl } from '@/lib/axios';
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
import { Role } from '@/interfaces/role';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const createRolSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	state: z.enum(['Activo', 'Inactivo']),
});

interface FormRolProps {
	initialData?: Role;
}

export const FormRol = ({ initialData }: FormRolProps) => {
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createRolSchema>>({
		resolver: zodResolver(createRolSchema),
		defaultValues: initialData
			? { name: initialData.name, state: initialData.state ? 'Activo' : 'Inactivo' }
			: { name: '', state: 'Activo' },
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createRolSchema>) => {
		if (initialData) {
			try {
				const valuesUpdated = { ...values, state: values.state === 'Activo' ? true : false };
				await axiosUrl.patch(`/rol/${initialData._id}`, valuesUpdated);
				toast.success('Rol actualizado correctamente');
				router.refresh();
				router.push('/roles');
			} catch {
				toast.error('Error al actualizar el rol');
			}
		} else {
			try {
				await axiosUrl.post('/rol/', values);
				toast.success('Rol creado correctamente');
				router.refresh();
				router.push('/roles');
			} catch {
				toast.error('Error al crear el rol');
			}
		}
	};

	const onDelete = async () => {
		try {
			setIsDeleting(true);
			await axiosUrl.delete(`/rol/${initialData?._id}`);
			toast.success('Rol eliminado correctamente');
			router.refresh();
			router.push('/roles');
		} catch {
			toast.error('Error al actualizar el rol');
		} finally {
			setIsDeleting(false);
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
							<Button
								type='button'
								variant={'outline'}
								disabled={isDeleting}
								onClick={() => router.back()}
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Atras
							</Button>
							{initialData && (
								<ConfirmModal onConfirm={onDelete} disabled={isDeleting}>
									<Button disabled={isDeleting}>
										<Trash className='h-4 w-4 mr-2' />
										Eliminar
									</Button>
								</ConfirmModal>
							)}
						</div>
					</div>
					<Separator className='bg-primary/10' />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre del rol</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder='Ingrese el nombre del rol'
											{...field}
										/>
									</FormControl>
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
					</div>

					<Button className='flex ml-auto' disabled={isSubmitting} type='submit'>
						{isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar
					</Button>
				</form>
			</Form>
		</div>
	);
};
