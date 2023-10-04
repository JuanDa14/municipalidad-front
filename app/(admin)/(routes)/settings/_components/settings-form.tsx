'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSession } from 'next-auth/react';

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
import { ImageUpload } from '@/components/image-upload';
import { Icons } from '@/components/icons';
import { User } from '@/interfaces/user';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';

const SettingsFormSchema = z.object({
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

type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

export function SettingsForm({ user }: { user: User }) {
	const { fetchWithToken } = useFetch();

	const router = useRouter();

	const { data: session, update } = useSession();

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(SettingsFormSchema),
		defaultValues: { ...user },
	});

	const { isSubmitting } = form.formState;

	async function onSubmit(values: SettingsFormValues) {
		const data = await fetchWithToken(`/user/profile/${session?.user._id}`, {
			method: 'PUT',
			body: JSON.stringify({ ...values, role: user.role._id }),
		});

		if (data.ok) {
			await update({ user: data.user });
			router.push('/dashboard');
			router.refresh();
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
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
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
										disabled={isSubmitting}
										type='password'
										placeholder='Ingrese la contraseña'
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
					Actualizar perfil
				</Button>
			</form>
		</Form>
	);
}
