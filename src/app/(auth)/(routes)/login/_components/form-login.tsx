'use client';

import { signIn } from 'next-auth/react';
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
import { ButtonLoading } from '@/components/button-loading';

const formLoginSchema = z.object({
	email: z.string({ required_error: 'El email es requerido' }).email({
		message: 'Por favor, ingrese un correo electrónico válido.',
	}),
	password: z.string({ required_error: 'La contraseña es requerida' }).min(6, {
		message: 'La contraseña debe tener al menos 6 caracteres.',
	}),
});

export const FormLogin = () => {
	const form = useForm<z.infer<typeof formLoginSchema>>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: 'admin@test.com',
			password: 'password',
		},
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
		await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: true,
			callbackUrl: '/dashboard',
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Correo electrónico</FormLabel>
							<FormControl>
								<Input disabled={isSubmitting} placeholder='correo...' {...field} />
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
				<ButtonLoading
					isSubmitting={isSubmitting}
					label='Iniciar sesión'
					type='submit'
					className='w-full'
				/>
			</form>
		</Form>
	);
};
