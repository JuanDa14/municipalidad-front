'use client';

import { UIState } from '@/context/ui/ui-context';

export type UIAction =
	| { type: 'UI-DELETEUSER'; payload: string }
	| { type: 'UI-ACTIVEUSER'; payload: string };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
	switch (action.type) {
		case 'UI-DELETEUSER':
			return {
				...state,
				userId: action.payload,
				operation: 'delete',
			};

		case 'UI-ACTIVEUSER':
			return {
				...state,
				userId: action.payload,
				operation: 'put',
			};

		default:
			return state;
	}
};
