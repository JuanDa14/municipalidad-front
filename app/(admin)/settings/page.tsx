'use client';

import { AppearanceForm } from './components/appearance-form';
import { ProfileForm } from '@/components/profile-form';
import { useSession } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';

const Page = async () => {
	const { data: session } = useSession();

	return (
		<div className='max-w-4xl mx-auto'>
			<div className='mb-20'>
				<div>
					<h3 className='text-lg font-medium'>Perfil</h3>
					<p className='text-sm text-muted-foreground'>Actualiza tu información personal.</p>
				</div>
				<Separator className='my-3' />
				<ProfileForm user={session?.user!} />
			</div>
			<div className='mb-10'>
				<div>
					<h3 className='text-lg font-medium'>Prefrencias</h3>
					<p className='text-sm text-muted-foreground'>
						Configura la apariencia de la aplicación.
					</p>
				</div>
				<Separator className='my-3' />
				<AppearanceForm />
			</div>
		</div>
	);
};

export default Page;
