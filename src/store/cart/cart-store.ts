import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    addProductToCart: (product: CartProduct) => void;
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
                const productInCart = cart.some(p => p.id === product.id && p.size === product.size);
                if (!productInCart) {
                    set({
                        cart: [...cart, product],
                    })
                    return;
                }
                //Si el producto ya existe, se actualiza la cantidad
                const updatedCartProducts = cart.map((p) => {
                    if (p.id === product.id && p.size === product.size) {
                        return {
                            ...p,
                            quantity: p.quantity + product.quantity
                        }
                    }
                    return p;
                })
                set({
                    cart: updatedCartProducts
                })
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