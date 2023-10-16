'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
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
import { ImageUpload } from '@/components/image-upload';
import { User } from '@/interfaces/user';
import { ButtonLoading } from '@/components/button-loading';

const SettingsFormSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	email: z.string({ required_error: 'El correo es requerido' }).email({
		message: 'Por favor, ingrese un correo electrónico válido.',
	}),
	password: z.string().optional(),
	imageURL: z
		.string({ required_error: 'La imagen es requerida' })
		.min(1, { message: 'La imagen es requerida.' }),
	address: z
		.string({ required_error: 'La dirección es requerida.' })
		.min(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
		.optional(),
});

type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

export function SettingsForm({ user }: { user: User }) {
	const router = useRouter();
	const { update } = useSession();

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(SettingsFormSchema),
		defaultValues: {
			address: user.address,
			email: user.email,
			imageURL: user.imageURL,
			name: user.name,
			password: '',
		},
	});

	const { isSubmitting } = form.formState;

	async function onSubmit(values: SettingsFormValues) {
		try {
			const { data } = await axios.patch<User>(`/user/${user._id}`, values);
			await update({ user: data });
			router.refresh();
			router.push('/dashboard');
			toast.success('Perfil actualizado correctamente');
		} catch {
			toast.error('Error al actualizar el perfil');
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					name='imageURL'
					render={({ field }) => (
						<FormItem className='mb-10'>
							<FormControl>
								<ImageUpload
									value={field.value}
									onChange={field.onChange}
									disabled={isSubmitting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
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
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										placeholder='correo electrónico...'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contraseña</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										type='password'
										placeholder='contraseña...'
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
								<FormLabel>Dirección</FormLabel>
								<FormControl>
									<Input disabled={isSubmitting} placeholder='direccion...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<ButtonLoading isSubmitting={isSubmitting} label='Actualizar' type='submit' />
			</form>
		</Form>
	);
}
