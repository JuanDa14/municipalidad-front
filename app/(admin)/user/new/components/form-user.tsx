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
import { ImageUpload } from '@/components/image-upload';
import { toast } from '@/components/ui/use-toast';
import { User } from '@/interfaces/user';

const roles = [
	{ value: 'USER', label: 'Usuario' },
	{ value: 'SUPER-USER', label: 'Super Usuario' },
	{ value: 'ADMIN', label: 'Administrador' },
];

const formSchema = z.object({
	name: z.string().min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	email: z.string().email({
		message: 'Por favor, ingrese un correo electrónico válido.',
	}),
	password: z.string().min(3, {
		message: 'La contraseña debe tener al menos 8 caracteres.',
	}),
	imageURL: z.string().min(1, { message: 'La imagen es requerida.' }),
	role: z.enum(['ADMIN', 'SUPER-USER', 'USER']),
});

export const FormUser = ({ initialData }: { initialData?: User }) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			email: '',
			password: '',
			role: 'USER',
			imageURL: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (initialData) {
				//Update
			} else {
				//Create
			}
			toast({
				description: 'Operación exitosa.',
				duration: 3000,
			});

			router.refresh();
			router.push('/users');
		} catch (error) {
			toast({
				variant: 'destructive',
				description: 'Ocurrió un error al realizar la operación.',
				duration: 3000,
			});
		}
	};

	return (
		<div className='h-full p-4 space-y-2 max-w-5xl mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-2 w-full'>
						<div className='text-lg font-medium'>
							<h3>Formulario de Usuario</h3>
							<p className='text-sm text-muted-foreground'>
								Complete todos los datos correctamente.
							</p>
						</div>
						<Separator className='bg-primary/10' />
					</div>
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
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre Completo</FormLabel>
									<FormControl>
										<Input placeholder='Ingrese el nombre completo' {...field} />
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
										<Input placeholder='Ingrese el correo electrónico' {...field} />
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
											placeholder='Ingrese la contraseña'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='role'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rol</FormLabel>
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
													placeholder='Seleccione un rol'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{roles.map((rol) => (
												<SelectItem value={rol.value} key={rol.value}>
													{rol.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={isLoading} type='submit'>
						Registrar usuario
					</Button>
				</form>
			</Form>
		</div>
	);
};
