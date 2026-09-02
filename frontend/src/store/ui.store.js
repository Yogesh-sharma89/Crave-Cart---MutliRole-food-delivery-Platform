import { create } from "zustand";

const useUiStore = create((set) => ({
    
    isAddShopModalOpen: false,

    editingItem: null,
    
    openCreateModal: () => set({ isAddShopModalOpen: true, editingItem: null }),

    openEditModal: (item) => set({ isAddShopModalOpen: true, editingItem: item }),

    closeModal: () => set({ isAddShopModalOpen: false, editingItem: null }),

    toggleAddShopModal: () => set((state) => ({ isAddShopModalOpen: !state.isAddShopModalOpen })),
}))

export default useUiStore;