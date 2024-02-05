import { create } from "zustand";

interface SerachModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<SerachModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
