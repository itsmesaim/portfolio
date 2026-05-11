import { create } from "zustand";

export const useCursorState = create((set) => ({
  state: "default",
  setState: (state) => set({ state }),
}));
