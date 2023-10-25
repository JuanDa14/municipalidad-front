'use client';

import toast from 'react-hot-toast';

import { ourFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import { FileIcon, X } from 'lucide-react';

interface FileUploadProps {
	onChange: (url?: string) => void;
	value: string;
	endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint, value }: FileUploadProps) => {
	const fileType = value.split('.').pop();

	if (value && fileType === 'pdf') {
		return (
			<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
				<FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
				<a
					href={value}
					target='_blank'
					rel='noopener noreferrer'
					className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
				>
					{value}
				</a>
				<button
					onClick={() => onChange('')}
					className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
					type='button'
				>
					<X className='h-4 w-4' />
				</button>
			</div>
		);
	}

	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].url);
			}}
			onUploadError={() => {
				toast.error('Ocurrió un error al subir el archivo');
			}}
		/>
	);
};
