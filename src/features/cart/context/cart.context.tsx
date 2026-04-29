import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "../../../types/cart";
import type { Product } from "../../../types/product";
import { cartReducer } from "@/store/cart.reducer";

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartState };

export interface CartContextValue {
  state: CartState;
  dispatch: (action: CartAction) => void;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CART_STORAGE_KEY = "shopping_cart";

const initialState: CartState = {
  items: [],
};

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar del localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const cartState = JSON.parse(stored) as CartState;
        dispatch({ type: "HYDRATE", payload: cartState });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Guardar en localStorage SOLO después de la hidratación
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const addItem = useCallback((product: Product, quantity: number) => {
    if (quantity <= 0) return;
    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity },
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: productId, quantity },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getTotalItems = useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const getTotalPrice = useCallback(() => {
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }, [state.items]);

  const value: CartContextValue = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
