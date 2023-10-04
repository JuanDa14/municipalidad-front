'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Trash } from 'lucide-react';

import { useFetch } from '@/hooks/useFetch';
import { User } from '@/interfaces/user';
import { Role } from '@/interfaces/role';

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
import { Icons } from '@/components/icons';
import { ConfirmModal } from '@/components/modals/confirm-modal';

const createUserSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	email: z.string({ required_error: 'El correo es requerido' }).email({
		message: 'Por favor, ingrese un correo electrónico válido.',
	}),
	password: z.string({ required_error: 'La contraseña es requerido' }).min(3, {
		message: 'La contraseña debe tener al menos 8 caracteres.',
	}),
	imageURL: z.string().optional(),
	role: z
		.string({ required_error: 'El rol es requerido' })
		.min(1, { message: 'El rol es requerido.' }),
});

const updateUserSchema = createUserSchema.omit({ password: true }).extend({
	password: z.string().optional(),
});

interface FormUserProps {
	initialData?: User;
	roles: Role[];
}

export const FormUser = ({ initialData, roles }: FormUserProps) => {
	const router = useRouter();

	const rolesIds = roles.map((rol) => rol._id);

	const { fetchWithToken, fetchLoading } = useFetch();

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

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
		if (initialData) {
			await fetchWithToken(`/user/${initialData._id}`, {
				method: 'PUT',
				body: JSON.stringify(values),
			});
		} else {
			await fetchWithToken('/user', {
				method: 'POST',
				body: JSON.stringify(values),
			});
		}

		router.push('/users');
		router.refresh();
	};

	const onDelete = async () => {
		if (!initialData) return;

		await fetchWithToken(`/user/state/${initialData._id}`, {
			method: 'PUT',
		});

		router.push('/users');
		router.refresh();
	};

	return (
		<div className='h-full p-6 space-y-2 mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='flex'>
						<div className='space-y-2 w-full'>
							<div className='flex justify-between'>
								<div className='text-lg font-medium'>
									<h3>Formulario de Usuario</h3>
									<p className='text-sm text-muted-foreground'>
										Complete todos los datos correctamente.
									</p>
								</div>
							</div>
						</div>
						<div className='flex gap-x-2 items-center'>
							<Button
								type='button'
								disabled={fetchLoading}
								variant={'outline'}
								onClick={() => router.back()}
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Atras
							</Button>
							{initialData && (
								<ConfirmModal disabled={fetchLoading} onConfirm={onDelete}>
									<Button disabled={fetchLoading}>
										<Trash className='h-4 w-4 mr-2' />
										Eliminar
									</Button>
								</ConfirmModal>
							)}
						</div>
					</div>
					<Separator className='bg-primary/10' />
					<FormField
						name='imageURL'
						render={({ field }) => (
							<FormItem className='flex flex-col items-center justify-center space-y-4'>
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
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
						<FormField
							name='role'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rol</FormLabel>
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
															`${name[0].toLocaleUpperCase()}${name
																.slice(1)
																.toLowerCase()}`
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

					<Button disabled={isSubmitting} type='submit'>
						{isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar usuario
					</Button>
				</form>
			</Form>
		</div>
	);
};
