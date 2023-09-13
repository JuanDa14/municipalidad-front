import { create } from 'zustand';

interface ModalState {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

interface ModalStateForm extends ModalState {
	isOpenForm: boolean;
	openModalForm: () => void;
	closeModalForm: () => void;
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

export const useRoleModal = create<ModalStateForm>((set) => ({
	isOpenForm: false,
	isOpen: false,
	openModal: () => set(() => ({ isOpen: true })),
	closeModal: () => set(() => ({ isOpen: false })),
	openModalForm: () => set(() => ({ isOpenForm: true })),
	closeModalForm: () => set(() => ({ isOpenForm: false })),
}));
