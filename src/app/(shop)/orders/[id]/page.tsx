import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    params: Promise<{
        id: string;
    }>
}

export default async function OrderPage({ params }: Props) {

    const { id } = await params;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Order #${id}`} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Order Details */}
                    <div className="flex flex-col mt-5">
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    "bg-green-700": true,
                                    "bg-red-500": false,
                                }

                            )
                        }>
                            <IoCartOutline size={30} />
                            {/* <span className="mx-2">Pending</span> */}
                            {/* <span className="mx-2">Canceled</span> */}
                            <span className="mx-2">Delivered</span>

                        </div>
                        {/* Order Items */}
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
                                        <p>{currencyFormat(product.price)} x 3</p>
                                        <p className="font-bold">Subtotal: {currencyFormat(product.price * 3)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout */}
                    <div className="rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl font-bold mb-2">Shipping Address</h2>
                        <div className="mb-10">
                            <p className="text-xl font-bold">Leonardo</p>
                            <p>Av Siempre Viva 123</p>
                            <p>Buenos Aires, Argentina</p>
                            <p>+54 11 1234-5678</p>
                            <p>CP: 1000</p>
                            <p>leo@gmail.com</p>
                        </div>
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10 " />
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
                        <div className="mt-5 mb-2 w-full">
                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        "bg-green-700": true,
                                        "bg-red-500": false,
                                    }

                                )
                            }>
                                <IoCartOutline size={30} />
                                {/* <span className="mx-2">Pending</span> */}
                                {/* <span className="mx-2">Canceled</span> */}
                                <span className="mx-2">Delivered</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}