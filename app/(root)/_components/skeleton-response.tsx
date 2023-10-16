'use client';

import { Loader2Icon } from 'lucide-react';

export const SkeletonResponse = () => {
	return (
		<div className='flex justify-center items-center'>
			<div className='animate-spin'>
				<Loader2Icon />
			</div>
		</div>
	);
};
