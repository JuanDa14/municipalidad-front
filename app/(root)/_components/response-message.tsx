'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';

interface ResponseMessageProps {
	onReset: () => void;
	messages: { role: 'user' | 'system'; message: string }[];
	isLoading: boolean;
}

export const ResponseMessage = ({ messages, isLoading = true }: ResponseMessageProps) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div ref={scrollContainerRef} className='h-full w-full rounded-md overflow-y-auto'>
			<div className='max-h-44  flex flex-col gap-y-2'>
				{messages.map(({ message, role }, i) => (
					<div key={i}>
						<span
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
					</div>
				))}
			</div>
		</div>
	);
};
