"use client";

import Title from "@/components/ui/title/Title";
import Link from "next/link";
import ProductsInCart from "./ui/ProductsInCart";
import PlaceOrder from "./ui/PlaceOrder";

export default function CartPage() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center mb-72">
                <div className="flex flex-col w-full max-w-[1000px]">
                    <Title title="Verify your order" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Cart Items */}
                        <div className="flex flex-col mt-5">
                            <span className="text-xl font-bold">Adjust your order</span>
                            <Link href="/cart" className="underline mb-5">Back to cart</Link>

                            <ProductsInCart />
                        </div>

                        {/* Checkout */}
                        <PlaceOrder />
                    </div>
                </div>
            </div>
        </div>
    )
}