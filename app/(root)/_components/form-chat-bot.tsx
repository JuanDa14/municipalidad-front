'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { axios } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormChatBotProps {
	setMessages: (
		value: React.SetStateAction<{ role: 'user' | 'system'; message: string }[]>
	) => void;
	setIsSubmitting: (isSubmitting: boolean) => void;
}

const formChatBotMessage = z.object({
	message: z.string({ required_error: 'El mensaje es requerido' }).min(1, {
		message: 'El mensaje debe tener al menos 1 caracter.',
	}),
});

export const FormChatBot = ({ setMessages, setIsSubmitting }: FormChatBotProps) => {
	const form = useForm<z.infer<typeof formChatBotMessage>>({
		resolver: zodResolver(formChatBotMessage),
		defaultValues: {
			message: '',
		},
	});

	const onFormQuestion = async (values: z.infer<typeof formChatBotMessage>) => {
		try {
			setIsSubmitting(true);
			const { data } = await axios.post('/chatbot/message', values);
			setMessages((prev) => [
				...prev,
				{ role: 'user', message: values.message },
				{ role: 'system', message: data.message },
			]);
		} catch (error) {
			console.log(error);
			setMessages((prev) => [
				...prev,
				{ role: 'user', message: values.message },
				{ role: 'system', message: 'No se pudo enviar el mensaje' },
			]);
		} finally {
			setTimeout(() => {
				setIsSubmitting(false);
			}, 5000);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFormQuestion)} className='flex items-center gap-1'>
				<FormField
					name='message'
					control={form.control}
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormControl>
								<Input {...field} placeholder='Tu mensaje...' />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button size={'icon'}>
					<Send className='h-4 w-4' />
				</Button>
			</form>
		</Form>
	);
};
