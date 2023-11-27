'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { axios } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ResponseChatBot {
	role: 'user' | 'system';
	message: string;
}

interface FormChatBotProps {
	setMessages: (value: React.SetStateAction<ResponseChatBot[]>) => void;
	setIsSubmitting: (isSubmitting: boolean) => void;
	isSubmitting: boolean;
	messages: { role: 'user' | 'system'; message: string }[];
}

const formChatBotMessage = z.object({
	message: z.string({ required_error: 'El mensaje es requerido' }).min(1, {
		message: 'El mensaje debe tener al menos 1 caracter.',
	}),
});

export const FormChatBot = ({
	setMessages,
	setIsSubmitting,
	messages,
	isSubmitting,
}: FormChatBotProps) => {
	const form = useForm<z.infer<typeof formChatBotMessage>>({
		resolver: zodResolver(formChatBotMessage),
		defaultValues: {
			message: '',
		},
	});

	const onFormQuestion = async (values: z.infer<typeof formChatBotMessage>) => {
		try {
			setIsSubmitting(true);
			const oldMessages = messages;
			const message = [{ role: 'user', message: values.message }] as ResponseChatBot[];
			setMessages((prev) => [...prev, ...message]);
			const { data } = await axios.post('/chatbot/message', values);
			const newMessage = [
				{ role: 'user', message: values.message },
				{ role: 'system', message: data.message },
			] as ResponseChatBot[];
			setMessages([...oldMessages, ...newMessage]);
		} finally {
			setTimeout(() => {
				setIsSubmitting(false);
				form.reset();
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
								<Input disabled={isSubmitting} {...field} placeholder='Tu mensaje...' />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button size={'icon'} disabled={isSubmitting}>
					<Send className='h-4 w-4' />
				</Button>
			</form>
		</Form>
	);
};
