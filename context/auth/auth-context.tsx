'use client';

import { Dispatch, createContext } from 'react';
import { User } from '@/interfaces/user';
import { AuthAction } from '@/context/auth/auth-reducer';

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
}

export const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
};

export const AuthContext = createContext<{ state: AuthState; dispatch: Dispatch<AuthAction> }>({
	state: initialState,
	dispatch: () => {},
});
