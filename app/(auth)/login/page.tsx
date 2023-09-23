import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';
import { SignInForm } from './components/form-sign-in';

const Page = async () => {
	const session = await getServerSession(options);

	session?.user && redirect('/dashboard');

	return (
		<div className='lg:p-8 w-full min-h-screen flex items-center justify-center'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] shadow rounded md:p-6 lg:p-8'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>Municipalidad de San José</h1>
					<p className='text-sm text-muted-foreground'>
						Inicia sesión con tu correo electrónico y contraseña.
					</p>
				</div>
				<SignInForm />
				<p className='px-8 text-center text-sm text-muted-foreground'>
					Al continuar, aceptas los{' '}
					<Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
						Términos de servicio
					</Link>{' '}
					y{' '}
					<Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
						Política de privacidad
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default Page;
