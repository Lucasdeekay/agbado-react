import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product, CartItem } from "@shared/schema";

interface CartContextType {
  items: CartItemWithProduct[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItemWithProduct[] }
  | { type: "ADD_ITEM"; payload: CartItemWithProduct }
  | { type: "UPDATE_ITEM"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

function cartReducer(
  state: CartItemWithProduct[],
  action: CartAction
): CartItemWithProduct[] {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;
    case "ADD_ITEM":
      const existingIndex = state.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (existingIndex >= 0) {
        return state.map((item) =>
          item.id === state[existingIndex].id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];
    case "UPDATE_ITEM":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["/api/cart"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (cartData) {
      dispatch({ type: "SET_ITEMS", payload: cartData });
    }
  }, [cartData]);

  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const response = await apiRequest("POST", "/api/cart", {
        productId,
        quantity,
      });
      return response.json();
    },
    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: async ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) => {
      const response = await apiRequest("PUT", `/api/cart/${itemId}`, {
        quantity,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await apiRequest("DELETE", `/api/cart/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const addToCart = (productId: string, quantity = 1) => {
    addToCartMutation.mutate({ productId, quantity });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    updateCartMutation.mutate({ itemId, quantity });
  };

  const removeFromCart = (itemId: string) => {
    removeFromCartMutation.mutate(itemId);
  };

  const clearCart = () => {
    // Remove all items one by one
    items.forEach((item) => removeFromCart(item.id));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
