"use client"
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";
import { useState } from "react";

interface Props {
    product: Product
}

export default function AddToCart({ product }: Props) {
    const addProductToCart = useCartStore( state => state.addProductToCart);

    const [selectedSize, setSelectedSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addToCart = () => {
        setPosted(true);
        if(!selectedSize) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            image: product.images[0],
            price: product.price,
            size: selectedSize,
            quantity,
        }
        addProductToCart(cartProduct);
        setPosted(false);
        setSelectedSize(undefined);
        setQuantity(1);
        //se puede mostrar un popup de que se agregó al carrito
    }
    return (
        <>

            {
                posted && !selectedSize && (
                    <span className="text-red-500 fade-in mt-2">
                        Size is required
                    </span>
                )
            }

            <SizeSelector selectedSize={selectedSize} availableSizes={product.sizes} onSizeSelected={setSelectedSize} />
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            <button className="btn-primary my-5"
                onClick={addToCart}
            >Add to cart</button>
        </>
    )
}