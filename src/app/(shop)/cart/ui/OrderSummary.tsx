"use client"

import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export default function OrderSummary() {
    const [loaded, setLoaded] = useState(false);
    const {getSummaryInformation} = useCartStore(); //Ultima version de zustand
    const { subTotal, tax, total, itemInCart } = getSummaryInformation();



    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid grid-cols-2">
            <span>Number of items</span>
            <span className="text-right">
                {itemInCart === 1 ? `${itemInCart} item` : `${itemInCart} items`}
            </span>
            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>
            <span>Shipping</span>
            <span className="text-right">{currencyFormat(tax)}</span>
            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
    )
}   