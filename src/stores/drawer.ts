import { create } from "zustand";

interface IDrawerStop {
  showDrawer: boolean;
}

export const useDrawerStore = create<IDrawerStop>(() => ({
  showDrawer: false,
}));
