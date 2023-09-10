'use client';

import { useEffect, useReducer } from 'react';
import { AuthContext, initialState } from '@/context/auth/auth-context';
import { authReducer } from '@/context/auth/auth-reducer';
import { signOut, useSession } from 'next-auth/react';
import { useFetch } from '@/hooks/useFetch';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const { data: session, status, update } = useSession();
	const { fecthWithRefreshToken } = useFetch();

	useEffect(() => {
		if (status === 'authenticated') {
			dispatch({ type: 'LOGIN', payload: session?.user });
		}
	}, [status]);

	useEffect(() => {
		const interval = setInterval(async () => {
			console.log('refreshing token');
			const data = await fecthWithRefreshToken();
			if (data?.ok) {
				update(data.user);
			} else {
				dispatch({ type: 'LOGOUT' });
				signOut({
					redirect: true,
					callbackUrl: '/login',
				});
			}
		}, 60 * 60 * 1000);
		return () => clearInterval(interval);
	}, [update]);

	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
