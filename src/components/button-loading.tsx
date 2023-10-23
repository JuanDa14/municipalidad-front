'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ButtonHTMLAttributes } from 'react';

interface ButtonLoadingProps {
	isSubmitting: boolean;
	label: string;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	className?: ButtonHTMLAttributes<HTMLButtonElement>['className'];
}

export const ButtonLoading = ({
	isSubmitting,
	label,
	type = 'button',
	className,
}: ButtonLoadingProps) => {
	return (
		<Button disabled={isSubmitting} type={type} className={className}>
			{isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
			{label}
		</Button>
	);
};
