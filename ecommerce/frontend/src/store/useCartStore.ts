import { create } from 'zustand';
import { CartDTO, CartItemDTO } from '../../backend/src/models/types';

interface CartState {
  cart: CartDTO | null;
  isOpen: boolean;
  setCart: (cart: CartDTO) => void;
  toggleCart: () => void;
  addItem: (item: CartItemDTO) => void;
  removeItem: (variantId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isOpen: false,
  setCart: (cart) => set({ cart }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (item) => set((state) => {
    if (!state.cart) return state;
    const existing = state.cart.items.find(i => i.variantId === item.variantId);
    let updatedItems = [...state.cart.items];
    if (existing) {
      updatedItems = updatedItems.map(i => i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i);
    } else {
      updatedItems.push(item);
    }
    const newSubtotal = updatedItems.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0);
    return {
      cart: {
        ...state.cart,
        items: updatedItems,
        subtotal: newSubtotal,
        grandTotal: newSubtotal + state.cart.estimatedShipping + state.cart.estimatedTax - state.cart.discountTotal
      }
    };
  }),
  removeItem: (variantId) => set((state) => {
    if (!state.cart) return state;
    const updatedItems = state.cart.items.filter(i => i.variantId !== variantId);
    const newSubtotal = updatedItems.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0);
    return {
      cart: {
        ...state.cart,
        items: updatedItems,
        subtotal: newSubtotal,
        grandTotal: newSubtotal + state.cart.estimatedShipping + state.cart.estimatedTax - state.cart.discountTotal
      }
    };
  })
}));
