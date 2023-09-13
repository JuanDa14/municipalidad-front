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
import { Role } from '@/interfaces/role';
import { useFetch } from '@/hooks/useFetch';
import { Icons } from '@/components/icons';
import { useRoleModal } from '@/hooks/useModal';
import { useUI } from '@/hooks/useUI';

const createRolSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
});

export const FormRol = () => {
	const router = useRouter();
	const { fetchWithAccessToken } = useFetch();
	const { closeModalForm } = useRoleModal();
	const { state } = useUI();

	const form = useForm<z.infer<typeof createRolSchema>>({
		resolver: zodResolver(createRolSchema),
		defaultValues: state.data.name ? { name: state.data.name } : { name: '' },
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof createRolSchema>) => {
		if (state.data.name) {
			//Update
			const data = await fetchWithAccessToken(`/role/${state.id}`, {
				method: 'PUT',
				body: JSON.stringify(values),
			});

			if (data.ok) {
				router.refresh();
				closeModalForm();
			}
		} else {
			//Create
			const data = await fetchWithAccessToken('/role', {
				method: 'POST',
				body: JSON.stringify(values),
			});
			if (data.ok) {
				router.refresh();
				closeModalForm();
			}
		}
	};

	return (
		<div className='h-full w-full p-4 space-y-2  mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-2 w-full'>
						<div className='flex justify-between'>
							<div className='text-lg font-medium'>
								<h3>Formulario</h3>
								<p className='text-sm text-muted-foreground'>
									Complete todos los datos correctamente.
								</p>
							</div>
						</div>
						<Separator className='bg-primary/10' />
					</div>
					<div>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre del rol</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder='Ingrese el nombre del rol'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button className='flex ml-auto' disabled={isLoading} type='submit'>
						{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar
					</Button>
				</form>
			</Form>
		</div>
	);
};
