'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ButtonLoading } from '@/components/button-loading';
import { RequestAttachment } from '@/interfaces/request-attachment';
import { DatePicker } from '@/components/date-picker';
import { FileUpload } from '@/components/file-upload';
import { Textarea } from '@/components/ui/textarea';

const createRequestSchema = z.object({
	applicant: z.string({ required_error: 'El solicitante es requerido' }).min(3, {
		message: 'El solicitante debe tener al menos 3 caracteres.',
	}),
	eventDate: z.date({ required_error: 'La fecha del evento es requerido' }),
	description: z.string({ required_error: 'La descripcion es obligatoria' }).max(200, {
		message: 'La descripcion debe tener máximo 100 caracteres.',
	}),
	urlPDF: z.string({ required_error: 'El PDF es requerido' }).min(1, {
		message: 'El PDF es requerido',
	}),
	state: z.enum(['PENDIENTE', 'APROBADO', 'RECHAZADO'], {
		required_error: 'El estado es requerido',
	}),
});

interface FormRequestProps {
	initialData?: RequestAttachment;
}

export const FormRequest = ({ initialData }: FormRequestProps) => {
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createRequestSchema>>({
		resolver: zodResolver(createRequestSchema),
		defaultValues: {
			applicant: '',
			eventDate: new Date(),
			description: '',
			urlPDF: '',
			state: 'PENDIENTE',
		},
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createRequestSchema>) => {
		if (initialData) {
			try {
				await axios.patch(`/provider/${initialData._id}`, values);
				toast.success('Proveedor actualizado correctamente');
				router.refresh();
				router.push('/providers');
			} catch {
				toast.error('Error al actualizar el proveedor');
			}
		} else {
			try {
				await axios.post('/provider', values);
				toast.success('Proveedor creado correctamente');
				router.refresh();
				router.push('/providers');
			} catch {
				toast.error('Error al crear el proveedor');
			}
		}
	};

	const onDelete = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/provider/${initialData?._id}`);
			toast.success('Proveedor eliminado correctamente');
			router.refresh();
			router.push('/providers');
		} catch {
			toast.error('Error al eliminar el proveedor');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='h-full p-6 space-y-2'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='flex items-center justify-between gap-x-2 space-y-2 w-full'>
						<div className='flex justify-between'>
							<div className='text-lg font-medium'>
								<h3>Formulario de Solicitud</h3>
								<p className='text-sm text-muted-foreground'>
									Complete todos los datos correctamente.
								</p>
							</div>
						</div>
						<div className='flex gap-x-2 items-center'>
							<Button
								type='button'
								variant={'outline'}
								disabled={isDeleting || isSubmitting}
								onClick={() => router.back()}
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Atras
							</Button>
							{initialData && (
								<ConfirmModal disabled={isDeleting || isSubmitting} onConfirm={onDelete}>
									<Button disabled={isDeleting || isSubmitting}>
										<Trash className='h-4 w-4 mr-2' />
										Eliminar
									</Button>
								</ConfirmModal>
							)}
						</div>
					</div>
					<Separator className='bg-primary/10' />
					<div className='grid grid-cols-1 gap-4'>
						<FormField
							name='applicant'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Solicitante</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isSubmitting}
											placeholder='Solicitante...'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='description'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripci&oacute;n</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											disabled={isSubmitting}
											placeholder='Descripcion...'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							name='eventDate'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Fecha del evento</FormLabel>
									<FormControl>
										<DatePicker
											isSubmitting={isSubmitting}
											onChange={field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{initialData && (
							<FormField
								control={form.control}
								name='state'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Condicion</FormLabel>
										<Select
											disabled={isSubmitting}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione...' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{['PENDIENTE', 'APROBADO', 'RECHAZADO'].map((state) => (
													<SelectItem value={state} key={state}>
														{state}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name='urlPDF'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Archivo PDF</FormLabel>
									<FormControl>
										<FileUpload
											endpoint='requestAttachment'
											value={field.value}
											onChange={(url) => {
												if (url) {
													field.onChange(url);
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<ButtonLoading
						isSubmitting={isSubmitting || isDeleting}
						label='Guardar'
						type='submit'
						className='flex ml-auto'
					/>
				</form>
			</Form>
		</div>
	);
};
