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
        itemInCart: number;
    },
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            addProductToCart: (product: CartProduct) => {
                //Si el producto ya existe, se actualiza la cantidad
                //Si no existe, se agrega al carrito
                const { cart } = get();
                const productInCart = cart.some(item => item.id === product.id && item.size === product.size);
                if (!productInCart) {
                    set({
                        cart: [...cart, product],
                    })
                    return;
                }
                //Si el producto ya existe, se actualiza la cantidad
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    return item;
                })
                set({
                    cart: updatedCartProducts
                })
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity };
                    }
                    return item;
                })
                if (updatedCartProducts.length === 0) {
                    return;
                }

                set({ cart: updatedCartProducts })
            },
            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce((subTotal, item) => subTotal + (item.price * item.quantity), 0);
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal,
                    tax,
                    total,
                    itemInCart
                }
            },
            removeProductFromCart: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size);
                set({ cart: updatedCartProducts });
            },
            clearCart: () => {
                set({ cart: [] });
            }
        })

        ,
        {
            name: 'shopping-cart',
            //skipHydration: true, //para que no se rompa el estado cuando se recarga la página
            //solucionado con el useEffect en el TopMenu para que se cargue el estado cuando se recarga la página
        }
    )


)