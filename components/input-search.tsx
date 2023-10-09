'use client';

import { ChangeEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InputSearchProps {
	onClick: () => void;
	isLoading?: boolean;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch = ({
	value,
	onChange,
	onClick,
	isLoading,
	...props
}: InputSearchProps) => {
	return (
		<div className='flex gap-x-1'>
			<Input value={value} onChange={onChange} {...props} placeholder='Buscar.....' />
			<Button disabled={isLoading} type='button' size={'icon'} onClick={onClick}>
				{isLoading ? (
					<Loader2 className='animate-spin h-4 w-4' />
				) : (
					<Search className='h-4 w-4' />
				)}
			</Button>
		</div>
	);
};
