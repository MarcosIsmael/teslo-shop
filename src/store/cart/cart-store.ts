import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  removeProduct: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //methods

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updateCartProducts = cart.map((item) => {
          if (item.id == product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });
        set({ cart: updateCartProducts });
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();
        set({
          cart: cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: quantity };
            } else return item;
          }),
        });
      },
      removeProduct: (product) => {
        const { cart } = get();
        set({
          cart: cart.filter(
            (item) => item.id != product.id || item.size != product.size
          ),
        });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
    }),
    { name: "shopping-cart" }
  )
);
