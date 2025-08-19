
import Title from "@/components/ui/title/Title";
import Link from "next/link";
import OrderSummary from "./ui/OrderSummary";
import ProductsInCart from "./ui/ProductsInCart";



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
                        <ProductsInCart />
                    
                    </div>

                    {/* Checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
                        <OrderSummary />
                        <div>
                            <Link href="/checkout/address" className="flex btn-primary justify-center items-center mt-5 mb-2 w-full">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}