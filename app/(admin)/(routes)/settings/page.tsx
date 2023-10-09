import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { Separator } from '@/components/ui/separator';

import { SettingsForm } from './_components/settings-form';

const SettingsPage = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className='p-6'>
			<h2 className='text-lg font-medium'>Perfil</h2>
			<p className='text-sm text-muted-foreground'>Actualiza tu información personal.</p>
			<Separator className='my-3' />
			<SettingsForm user={session?.user!} />
		</div>
	);
};

export default SettingsPage;
