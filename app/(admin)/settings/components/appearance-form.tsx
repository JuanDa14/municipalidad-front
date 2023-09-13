'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';

const appearanceFormSchema = z.object({
	theme: z.enum(['light', 'dark'], {
		required_error: 'Seleccione un tema.',
	}),
	font: z.enum(['inter', 'manrope', 'system'], {
		invalid_type_error: 'Seleccione una fuente válida.',
		required_error: 'Seleccione una fuente.',
	}),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const defaultValues: Partial<AppearanceFormValues> = {
	theme: 'light',
	font: 'inter',
};

export function AppearanceForm() {
	const { setTheme } = useTheme();

	const form = useForm<AppearanceFormValues>({
		resolver: zodResolver(appearanceFormSchema),
		defaultValues,
	});

	function onSubmit(data: AppearanceFormValues) {
		setTheme(data.theme);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='font'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fuente</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue
											placeholder='Selccione una fuente'
											defaultValue={field.value}
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='inter'>Inter</SelectItem>
										<SelectItem value='manrope'>Manrope</SelectItem>
										<SelectItem value='system'>Sistema</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormDescription>
								Configure la fuente que desea utilizar en el panel.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='theme'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>Tema</FormLabel>
							<FormDescription>Seleccione el tema para el panel.</FormDescription>
							<FormMessage />
							<RadioGroup
								onValueChange={field.onChange}
								defaultValue={field.value}
								className='grid grid-cols-2 gap-x-10 pt-2'
							>
								<FormItem>
									<FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
										<FormControl>
											<RadioGroupItem value='light' className='sr-only' />
										</FormControl>
										<div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent'>
											<div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
												<div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
												</div>
											</div>
										</div>
										<span className='block w-full p-2 text-center font-normal'>
											Claro
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
										<FormControl>
											<RadioGroupItem value='dark' className='sr-only' />
										</FormControl>
										<div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
											<div className='space-y-2 rounded-sm bg-slate-950 p-2'>
												<div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-2 w-[80px] rounded-lg bg-slate-400' />
													<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-slate-400' />
													<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-slate-400' />
													<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
												</div>
											</div>
										</div>
										<span className='block w-full p-2 text-center font-normal'>
											Oscuro
										</span>
									</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormItem>
					)}
				/>

				<Button type='submit' className='flex ml-auto'>
					Actualizar preferencias
				</Button>
			</form>
		</Form>
	);
}
