"use client"
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductsInCart() {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore((state) => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <div>Loading...</div>
    }
    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5 fade-in">
                        <Image
                            className="mr-5 rounded"
                            src={`/products/${product.image}`}
                            alt={product.title}
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col">
                            <span>
                                <p>{product.title} - {product.size} ({product.quantity})</p>
                            </span>
                            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}