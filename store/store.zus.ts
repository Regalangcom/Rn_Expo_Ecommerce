import { create } from "zustand";

interface CartItem {
  id: number; // Tambahkan id untuk setiap item
  product: any;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  addProducts: (product: any) => void;
  resetItems: () => void;
  removeCart: (productId: number) => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addProducts: (product) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        updatedItems[existingItemIndex].totalPrice += product.price;
        return { items: updatedItems };
      }

      const newItem: CartItem = {
        id: product.id,
        product,
        quantity: 1,
        totalPrice: product.price,
      };

      return {
        items: [...state.items, newItem],
      };
    }),

  resetItems: () => set({ items: [] }),
  removeCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
}));
