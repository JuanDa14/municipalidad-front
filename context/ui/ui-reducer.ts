'use client';

import { UIState } from '@/context/ui/ui-context';

export type UIAction =
	| { type: 'UI-DELETE'; payload: { id: string; data?: any } }
	| { type: 'UI-ACTIVE'; payload: { id: string; data?: any } }
	| { type: 'UI-INACTIVE'; payload: { id: string; data?: any } };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
	switch (action.type) {
		case 'UI-DELETE':
			return {
				...state,
				id: action.payload.id,
				data: {},
				operation: 'delete',
			};

		case 'UI-ACTIVE':
			return {
				...state,
				id: action.payload.id,
				data: action.payload.data,
				operation: 'put',
			};

		case 'UI-INACTIVE':
			return {
				...state,
				id: action.payload.id,
				data: action.payload.data,
				operation: 'put',
			};

		default:
			return state;
	}
};
