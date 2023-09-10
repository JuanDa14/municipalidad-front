import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';

const RootPage = async () => {
	const session = await getServerSession(options);

	session?.user ? redirect('/dashboard') : redirect('/login');
};

export default RootPage;
