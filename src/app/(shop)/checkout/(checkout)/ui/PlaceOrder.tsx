"use client"

import { placeOrder } from "@/actions";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaceOrder() {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const address = useAddressStore((state) => state.address);
    const { getSummaryInformation } = useCartStore();
    const { subTotal, tax, total, itemInCart } = getSummaryInformation();

    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);




    useEffect(() => {
        setLoaded(true);
    }, []);

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);
        const productsOrder = cart.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));
        // await setUserAddress(address, userId);
        const response = await placeOrder(productsOrder, address);
        if(!response.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(response.message || "Error placing order");
            return;
        }
        clearCart();
        router.replace('/orders/' + response.order?.id );
    }

    if (!loaded) {
        return <div>Loading...</div>
    }

    return (
        <div className="rounded-xl shadow-xl p-7">

            <h2 className="text-2xl font-bold mb-2">Shipping Address</h2>
            <div className="mb-10">
                <p className="text-xl font-bold">{address.name} {address.lastName}</p>
                <p>Address: {address.address}</p>
                <p>Address 2: {address.address2}</p>
                <p>City: {address.city}, {address.country}</p>
                <p>Phone: {address.phone}</p>
                <p>Postal Code: {address.postalCode}</p>
                {/* <p>Email: {address.email}</p> */}
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10 " />
            <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
            <div className="grid grid-cols-2 mb-5">
                <span>Number of items</span>
                <span className="text-right">
                    {itemInCart === 1 ? `${itemInCart} item` : `${itemInCart} items`}
                </span>
                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>
                <span>Taxes</span>
                <span className="text-right">{currencyFormat(tax)}</span>
                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
            </div>
            <div>
                {/* DISCLAIMER */}
                <p className="text-xs text-gray-500">
                    By placing your order, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                </p>
                <p className="text-red-500 text-sm my-2">{errorMessage}</p>
                <button
                    onClick={onPlaceOrder}
                    disabled={isPlacingOrder}
                    className={
                        clsx({
                            "btn-primary": !isPlacingOrder,
                            "btn-disabled": isPlacingOrder,
                            "flex justify-center items-center mt-5 mb-2 w-full": true
                        })
                    }
                >
                    {isPlacingOrder ? "Placing order..." : "Place Order"}
                </button>
            </div>
        </div>
    )
}