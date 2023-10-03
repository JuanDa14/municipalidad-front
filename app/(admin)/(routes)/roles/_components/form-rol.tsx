'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { useFetch } from '@/hooks/useFetch';
import { Icons } from '@/components/icons';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Role } from '@/interfaces/role';

const createRolSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
});

interface FormRolProps {
	initialData?: Role;
}

export const FormRol = ({ initialData }: FormRolProps) => {
	const router = useRouter();
	const { fetchWithToken } = useFetch();

	const form = useForm<z.infer<typeof createRolSchema>>({
		resolver: zodResolver(createRolSchema),
		defaultValues: initialData ? { name: initialData.name } : { name: '' },
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createRolSchema>) => {
		if (initialData) {
			await fetchWithToken(`/role/${initialData._id}`, {
				method: 'PUT',
				body: JSON.stringify(values),
			});
			router.push('/roles');
		} else {
			await fetchWithToken('/role', {
				method: 'POST',
				body: JSON.stringify(values),
			});
		}
		router.refresh();
	};

	const onDelete = async () => {
		if (!initialData) return;

		await fetchWithToken(`/role/${initialData._id}`, {
			method: 'PUT',
			body: JSON.stringify({ state: !initialData.state }),
		});

		router.push('/roles');
		router.refresh();
	};

	return (
		<div className='h-full w-full p-4 space-y-2  mx-auto'>
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
							<Link href={'/roles'}>
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
					<div>
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
