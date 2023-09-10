'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth/auth-provider';
import { UIProvider } from '@/context/ui/ui-provider';
import { SessionProvider } from 'next-auth/react';

type Props = {
	children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
	return (
		<SessionProvider>
			<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
				<AuthProvider>
					<UIProvider>
						{children}
						<Toaster />
					</UIProvider>
				</AuthProvider>
			</ThemeProvider>
		</SessionProvider>
	);
};
