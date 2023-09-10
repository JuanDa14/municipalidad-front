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
import { User } from '@/interfaces/user';
import { Role } from '@/interfaces/role';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useUserModal } from '@/hooks/useModal';
import { useFetch } from '@/hooks/useFetch';
import { Icons } from '@/components/icons';

export enum RolesName {
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
	const { openModal } = useUserModal();
	const rolesIds = roles.map((rol) => rol._id);
	const { fetchWithAccessToken } = useFetch();

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
		if (initialData) {
			//Update
			const data = await fetchWithAccessToken(`/user/${initialData._id}`, {
				method: 'PUT',
				body: JSON.stringify(values),
			});

			if (data.ok) {
				router.push('/users');
				router.refresh();
			}
		} else {
			//Create
			const data = await fetchWithAccessToken('/user', {
				method: 'POST',
				body: JSON.stringify(values),
			});
			if (data.ok) {
				router.push('/users');
				router.refresh();
			}
		}
	};

	return (
		<div className='h-full p-4 space-y-2 max-w-5xl mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-2 w-full'>
						<div className='flex justify-between'>
							<div className='text-lg font-medium'>
								<h3>Formulario de Usuario</h3>
								<p className='text-sm text-muted-foreground'>
									Complete todos los datos correctamente.
								</p>
							</div>
							{initialData?._id && initialData.state && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size={'icon'} variant={'ghost'}>
											<MoreVertical size={20} />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuGroup>
											<DropdownMenuItem className='cursor-pointer outline-none'>
												<Button onClick={openModal} variant={'ghost'}>
													Eliminar usuario
												</Button>
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
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
						{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Guardar usuario
					</Button>
				</form>
			</Form>
		</div>
	);
};
