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
import { Role } from '@/interfaces/role';
import { useSession } from 'next-auth/react';

enum RolesName {
	ADMIN = 'Administrador',
	SUPER_USER = 'Super Usuario',
	USER = 'Usuario',
}

type RolesNameType = keyof typeof RolesName;

const createUserSchema = z.object({
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
	role: z.string().min(1, { message: 'El rol es requerido.' }),
});

const updateUserSchema = createUserSchema.omit({ password: true }).extend({
	password: z.string().optional(),
});

export const FormUser = ({ initialData, roles }: { initialData?: User; roles: Role[] }) => {
	const router = useRouter();
	const { data: session } = useSession();

	const rolesIds = roles.map((rol) => rol._id);

	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(initialData ? updateUserSchema : createUserSchema),
		defaultValues: { ...initialData, password: '', role: initialData?.role._id } || {
			name: '',
			email: '',
			password: '',
			role: rolesIds[0],
			imageURL: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
		try {
			if (initialData) {
				//Update
				const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${initialData._id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${session!.accessToken}`,
					},
					body: JSON.stringify(values),
				});

				const data = await resp.json();

				if (!resp.ok) {
					throw new Error(data.message);
				}
			} else {
				//Create
				const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${session!.accessToken}`,
					},
					body: JSON.stringify(values),
				});

				const data = await resp.json();

				if (!resp.ok) {
					throw new Error(data.message);
				}
			}
			toast({
				description: 'Operación exitosa.',
				duration: 3000,
			});
			router.push('/user');
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
											{rolesIds.map((rolId) => (
												<SelectItem value={rolId} key={rolId}>
													{roles.map(
														({ name, _id }) =>
															_id === rolId &&
															RolesName[name.toUpperCase() as RolesNameType]
													)}
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
						Guardar usuario
					</Button>
				</form>
			</Form>
		</div>
	);
};
