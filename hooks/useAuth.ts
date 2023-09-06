import { AuthContext } from '@/context/auth/auth-context';
import { useContext } from 'react';

export const useAuth = () => {
	return useContext(AuthContext);
};
