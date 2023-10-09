import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

const RootPage = async () => {
	return (
		<Link href={'/login'}>
			<Button>
				<LogIn />
				Ingresar
			</Button>
		</Link>
	);
};

export default RootPage;
