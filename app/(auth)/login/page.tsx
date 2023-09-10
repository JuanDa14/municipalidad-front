import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth-options';
import { SignInForm } from './components/form-sign-in';

const Page = async () => {
	const session = await getServerSession(options);

	session?.user && redirect('/dashboard');

	return (
		<div className='container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
				<div className='absolute inset-0 bg-zinc-900' />
				<div className='relative z-20 flex items-center text-lg font-medium'>
					{/* //TODO: IMAGEN */}
				</div>
				<div className='relative z-20 mt-auto'></div>
			</div>
			<div className='lg:p-8 min-h-screen flex items-center'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Municipalidad de San José
						</h1>
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
						and{' '}
						<Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
							Política de privacidad
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Page;
