'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ResponseMessageProps {
	onReset: () => void;
	messages: { role: 'user' | 'system'; message: string }[];
	isLoading: boolean;
}

export const ResponseMessage = ({ messages, isLoading = true }: ResponseMessageProps) => {
	return (
		<ScrollArea className='h-full w-full rounded-md'>
			<div className='max-h-44  flex flex-col gap-y-2'>
				{messages.map(({ message, role }, i) => (
					<>
						<span
							key={i}
							className={cn(
								'block p-2 rounded-md text-sm',
								role === 'system' && 'text-start bg-blue-100',
								role === 'user' && 'text-end bg-gray-100'
							)}
						>
							{isLoading && role === 'system' && i === messages.length - 1
								? 'Escribiendo...'
								: message}
						</span>
					</>
				))}
			</div>
		</ScrollArea>
	);
};
