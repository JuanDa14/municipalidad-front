'use client';

import { useContext } from 'react';
import { UIContext } from '@/context/ui/ui-context';

export const useUI = () => {
	return useContext(UIContext);
};
