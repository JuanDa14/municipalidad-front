'use client';

import { useEffect, useReducer } from 'react';
import { AuthContext, initialState } from '@/context/auth/auth-context';
import { authReducer } from '@/context/auth/auth-reducer';
import { useSession } from 'next-auth/react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			dispatch({ type: 'LOGIN', payload: session?.user });
		}
	}, [status]);

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
