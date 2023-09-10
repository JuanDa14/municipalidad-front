'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { User } from '@/interfaces/user';
import { ImageUpload } from './image-upload';
import { Icons } from './icons';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useUserProfileModal } from '@/hooks/useModal';

const profileFormSchema = z.object({
	name: z.string().min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	email: z.string().email({
		message: 'Por favor, ingrese un correo electrónico válido.',
	}),
	password: z
		.string()
		.min(3, {
			message: 'La contraseña debe tener al menos 8 caracteres.',
		})
		.optional(),
	imageURL: z.string().min(1, { message: 'La imagen es requerida.' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user: User }) {
	const { closeModal } = useUserProfileModal();
	const { fetchWithAccessToken } = useFetch();
	const { data: session, update } = useSession();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: { ...user },
	});

	const isLoading = form.formState.isSubmitting;

	async function onSubmit(values: ProfileFormValues) {
		const data = await fetchWithAccessToken(`/user/profile/${session?.user._id}`, {
			method: 'PUT',
			body: JSON.stringify({ ...values, role: user.role._id }),
		});

		if (data.ok) {
			await update({ user: data.user });
			closeModal();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					name='imageURL'
					render={({ field }) => (
						<FormItem className='flex flex-col items-center justify-center space-y-4'>
							<FormControl>
								<ImageUpload
									value={field.value}
									onChange={field.onChange}
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
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
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Correo electrónico</FormLabel>
							<FormControl>
								<Input
									disabled={isLoading}
									placeholder='Ingrese el correo electrónico'
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
									disabled={isLoading}
									type='password'
									placeholder='Ingrese la contraseña'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isLoading} type='submit' className='flex ml-auto'>
					{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
					Actualizar perfil
				</Button>
			</form>
		</Form>
	);
}
