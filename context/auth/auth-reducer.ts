'use client';

import { User } from '@/interfaces/user';
import { AuthState } from '@/context/auth/auth-context';

export type AuthAction = { type: 'LOGOUT' } | { type: 'LOGIN'; payload: User };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};

		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};

		default:
			return state;
	}
};
