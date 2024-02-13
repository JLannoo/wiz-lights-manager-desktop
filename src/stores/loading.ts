import { create } from "zustand";

type LoadingState = {
    loading: boolean
    setLoading: (loading: boolean) => void
}

export const useLoading = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));