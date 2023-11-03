'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RequestAttachment } from '@/interfaces/request-attachment';
import { format } from 'date-fns';
import { FileIcon } from 'lucide-react';

interface RecentRequestsProps {
	requests: RequestAttachment[];
}

export function RecentRequests({ requests }: RecentRequestsProps) {
	return (
		<div className='space-y-8 w-full'>
			{requests.map((request) => (
				<div key={request._id} className='flex items-center justify-between'>
					<div className='ml-4 space-y-1'>
						<p className='text-sm font-medium leading-none'>
							Solicitante: {request.applicant}
						</p>
						<p className='text-sm text-muted-foreground'>
							Fecha: {format(new Date(request.eventDate), 'dd/MM/yyyy')}
						</p>
						<p className='text-sm text-muted-foreground'>
							Estado: <span>{request.state}</span>
						</p>
					</div>
					<div className='ml-auto font-medium'>
						<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
							<a
								href={request.urlPDF}
								target='_blank'
								rel='noopener noreferrer'
								className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
							>
								<FileIcon className='h-7 w-7 fill-indigo-200 stroke-indigo-400' />
							</a>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
