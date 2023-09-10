import { create } from 'zustand';

interface ModalState {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export const useUserModal = create<ModalState>((set) => ({
	isOpen: false,
	openModal: () => set(() => ({ isOpen: true })),
	closeModal: () => set(() => ({ isOpen: false })),
}));

export const useUserProfileModal = create<ModalState>((set) => ({
	isOpen: false,
	openModal: () => set(() => ({ isOpen: true })),
	closeModal: () => set(() => ({ isOpen: false })),
}));
