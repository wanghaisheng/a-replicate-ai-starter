import { create } from 'zustand';

type RenameProjectModalState = {
  title: string;
  isOpen: boolean;
  onOpen: (title: string) => void;
  onClose: () => void;
};

export const useRenameProjectModal = create<RenameProjectModalState>((set) => ({
  title: '',
  isOpen: false,
  onOpen: (title) => set({ isOpen: true, title }),
  onClose: () => set({ isOpen: false, title: '' }),
}));
