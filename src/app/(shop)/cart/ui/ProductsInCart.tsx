"use client"
import { ProductImage } from "@/components";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsInCart() {
    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity); 
    const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);
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
                        <ProductImage
                            className="mr-5 rounded"
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col">
                            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
                                <p>{product.title} - {product.size}</p>
                            </Link>
                            <p>{currencyFormat(product.price)}</p>
                            <QuantitySelector 
                                onQuantityChange={(value) => updateProductQuantity(product, value)}
                                quantity={product.quantity}
                            />
                            <button className="cursor-pointer underline mt-3" onClick={() => removeProductFromCart(product)}>Remove</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}