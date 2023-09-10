'use client';

import { Dispatch, createContext } from 'react';
import { UIAction } from '@/context/ui/ui-reducer';

export type Operation = 'post' | 'put' | 'delete';

export interface UIState {
	operation: Operation;
	userId: string;
}

export const initialState: UIState = {
	operation: 'post',
	userId: '',
};

export const UIContext = createContext<{ state: UIState; dispatch: Dispatch<UIAction> }>({
	state: initialState,
	dispatch: () => {},
});
