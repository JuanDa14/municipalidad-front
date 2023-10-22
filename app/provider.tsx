'use client';

import { SessionProvider } from 'next-auth/react';
import { SocketProvider } from '@/components/providers/socket-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-provider';

interface NextAuthProviderProps {
	children: React.ReactNode;
}

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
	return (
		<SessionProvider>
			<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
				<SocketProvider>
					{children}
					<ToastProvider />
				</SocketProvider>
			</ThemeProvider>
		</SessionProvider>
	);
};
