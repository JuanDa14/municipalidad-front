'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { ToastProvider } from '@/components/ui/toast';
import { SessionProvider } from 'next-auth/react';

interface NextAuthProviderProps {
	children: React.ReactNode;
}

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
	return (
		<SessionProvider>
			<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
				{children}
				<ToastProvider />
			</ThemeProvider>
		</SessionProvider>
	);
};
