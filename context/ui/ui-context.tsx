'use client';

import { Dispatch, createContext } from 'react';
import { UIAction } from '@/context/ui/ui-reducer';

export type Operation = 'post' | 'put' | 'delete';

export interface UIState {
	operation: Operation;
	id: string;
	data?: any;
}

export const initialState: UIState = {
	operation: 'post',
	id: '',
	data: {},
};

export const UIContext = createContext<{ state: UIState; dispatch: Dispatch<UIAction> }>({
	state: initialState,
	dispatch: () => {},
});
