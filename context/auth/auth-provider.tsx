'use client';

import { useReducer } from 'react';
import { AuthContext, initialState } from '@/context/auth/auth-context';
import { authReducer } from '@/context/auth/auth-reducer';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

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
