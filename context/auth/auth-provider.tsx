'use client';

import { useEffect, useReducer, useState } from 'react';
import { AuthContext, initialState } from '@/context/auth/auth-context';
import { authReducer } from '@/context/auth/auth-reducer';
import { signOut, useSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const { data: session, status, update } = useSession();
	const [isMounted, setIsMounted] = useState(true);

	const fecthWithRefreshToken = async () => {
		try {
			const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session?.refreshToken}`,
				},
			});
			const data = (await res.json()) as {
				ok: boolean;
				[key: string]: any;
			};
			if (isMounted) {
				if (data.ok) {
					return data;
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

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
