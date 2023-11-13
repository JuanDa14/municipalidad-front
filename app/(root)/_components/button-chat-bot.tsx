'use client';

import React, { useState } from 'react';
import { BotIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { FormChatBot } from './form-chat-bot';
import { ResponseMessage } from './response-message';

export const ButtonChatBot = () => {
	const [othersQuestions, setOthersQuestions] = useState(false);
	const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messages, setMessages] = useState<{ role: 'user' | 'system'; message: string }[]>([]);

	const onQuestion = async (questionNumber: number) => {
		setIsLoadingQuestions(true);

		switch (questionNumber) {
			case 1:
				setMessages([
					{ role: 'user', message: 'Cuales son los horarios de atencion?' },
					{
						role: 'system',
						message:
							'Los horarios de atención son de lunes a viernes, de 7:30 a.m. a 3:15 p.m.',
					},
				]);
				break;
			case 2:
				setMessages([
					{ role: 'user', message: 'Cuales son los servicios que ofrecen?' },
					{
						role: 'system',
						message: 'Contamos con servicios de agua, sisa, recojo de basura, entre otros.',
					},
				]);
				break;

			case 3:
				setMessages([
					{ role: 'user', message: 'Como puedo contactarme con ustedes?' },
					{
						role: 'system',
						message: 'Puedes contactarnos al +51 965 659 203',
					},
				]);
				break;

			case 4:
				setMessages([
					{ role: 'user', message: 'Que ha ocurrido esta semana?' },
					{
						role: 'system',
						message: 'No hay noticias por el momento',
					},
				]);
				break;

			default:
				setMessages([
					{ role: 'user', message: 'Pregunta no encontrada' },
					{
						role: 'system',
						message: 'No tengo informacion al respecto.',
					},
				]);
				break;
		}

		setTimeout(() => {
			setIsLoadingQuestions(false);
		}, 5000);
	};

	const onReset = () => {
		setOthersQuestions(false);
		setIsLoadingQuestions(false);
		setMessages([]);
	};

	return (
		<div className='fixed bottom-4 right-4 z-50'>
			<Popover onOpenChange={onReset}>
				<PopoverTrigger asChild>
					<Button size={'icon'} className='rounded-full'>
						<BotIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className='space-y-4 relative'>
						<div className='flex flex-col gap-1'>
							<span className='font-bold'>Soporte</span>
							<div>
								<span className='text-sm font-medium'>
									Hola 👋, ¿en qué podemos ayudarte?
								</span>
								<Button
									onClick={onReset}
									size={'icon'}
									variant={'link'}
									className='absolute -top-3 right-0'
								>
									<X className='h-4 w-4' />
								</Button>
							</div>
						</div>
						<Separator />
						{!othersQuestions && (
							<div className='flex flex-col gap-3'>
								{messages.length > 0 && (
									<ResponseMessage
										messages={messages}
										onReset={onReset}
										isLoading={isLoadingQuestions}
									/>
								)}
								{!messages.length && (
									<>
										<Button size={'sm'} onClick={() => onQuestion(1)}>
											Horarios de atención
										</Button>
										<Button size={'sm'} onClick={() => onQuestion(2)}>
											Servicios disponibles
										</Button>
										<Button size={'sm'} onClick={() => onQuestion(3)}>
											Contacto
										</Button>
										<Button size={'sm'} onClick={() => onQuestion(4)}>
											Noticias y actualizaciones
										</Button>
										<Button size={'sm'} onClick={() => setOthersQuestions(true)}>
											Otros
										</Button>
									</>
								)}
							</div>
						)}
						{othersQuestions && (
							<div>
								{messages.length > 0 && (
									<ResponseMessage
										messages={messages}
										onReset={onReset}
										isLoading={isSubmitting}
									/>
								)}
								<div className='mt-2'>
									<FormChatBot
										setMessages={setMessages}
										setIsSubmitting={setIsSubmitting}
										messages={messages}
										isSubmitting={isSubmitting}
									/>
								</div>
							</div>
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
