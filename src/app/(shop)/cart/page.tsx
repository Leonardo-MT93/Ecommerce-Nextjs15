import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
    initialData.products[4],
    initialData.products[5],
    initialData.products[6],
    initialData.products[7],
    initialData.products[8],
    initialData.products[9],
    initialData.products[10],

]

export default function CartPage() {

    // if (productsInCart.length === 0) {
    //     redirect("/empty" )
    // }

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title="Cart" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Cart Items */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl font-bold">Add more items to your cart</span>
                        <Link href="/" className="underline mb-5">Continue Shopping</Link>
                    
                    {/* Cart Items */}
                    {
                        productsInCart.map(product => (
                            <div key={product.slug} className="flex mb-5">
                                <Image
                                    className="mr-5 rounded"
                                    src={`/products/${product.images[0]}`}
                                    alt={product.title}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                    }}
                                    width={100}
                                    height={100}
                                />
                                <div className="flex flex-col">
                                    <p>{product.title}</p>
                                    <p>{product.price}</p>
                                    <QuantitySelector quantity={3} />
                                    <button className="underline mt-3">Remove</button>
                                </div>
                            </div>
                        ))
                    }
                    </div>

                    {/* Checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
                        <div className="grid grid-cols-2">
                            <span>Number of items</span>
                            <span className="text-right">{productsInCart.length}</span>
                            <span>Subtotal</span>
                            <span className="text-right">$100</span>
                            <span>Shipping</span>
                            <span className="text-right">$10</span>
                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right">$100</span>
                        </div>
                        <div>
                            <Link href="/checkout/address" className="flex btn-primary justify-center items-center mt-5 mb-2 w-full">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}