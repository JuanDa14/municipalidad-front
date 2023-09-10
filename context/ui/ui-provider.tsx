'use client';

import { useReducer } from 'react';
import { initialState } from '@/context/ui/ui-context';
import { uiReducer } from '@/context/ui/ui-reducer';
import { UIContext } from '@/context/ui/ui-context';

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(uiReducer, initialState);

	return (
		<UIContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
