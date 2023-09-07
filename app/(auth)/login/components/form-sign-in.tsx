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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	email: z.string().email({
		message: 'Por favor, ingrese un correo electrónico válido.',
	}),
	password: z.string().min(6, {
		message: 'La contraseña debe tener al menos 6 caracteres.',
	}),
});

export const SignInForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: 'admin@test.com',
			password: 'password',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const user = await signIn('credentials', {
				email: values.email,
				password: values.password,
			});

			if (user?.error) {
				return toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Credenciales inválidas.',
				});
			}

			router.prefetch('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className='max-w-sm w-full mx-auto'>
			<CardHeader>
				<CardTitle>Iniciar sesión</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo electrónico</FormLabel>
									<FormControl>
										<Input placeholder='Ingrese su correo electrónico' {...field} />
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
											type='password'
											placeholder='Ingrese su contraseña'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={form.formState.isSubmitting} type='submit'>
							Ingresar
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
