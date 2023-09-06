import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '../../../lib/auth-options';

import { SignInForm } from './components/form-sign-in';

const Page = async () => {
	const session = await getServerSession(options);

	session?.user && redirect('/dashboard');

	return <SignInForm />;
};

export default Page;
