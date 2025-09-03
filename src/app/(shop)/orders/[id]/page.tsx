import { getOrderById } from "@/actions/order/get-order-by-id";
// import { PaypalButton } from "@/components";
import Title from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";    

interface Props {
    params: Promise<{
        id: string;
    }>
}

export default async function OrderPage({ params }: Props) {

    const { id } = await params;

    const { order, ok } = await getOrderById(id);

    if (!ok) {
        redirect('/');
    }

    const address = order!.OrderAddress;
    const items = order!.OrderItem;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Order #${id.split('-').at(-1)}`} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Order Details */}
                    <div className="flex flex-col mt-5">
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    "bg-green-700": order!.isPaid,
                                    "bg-red-500": !order!.isPaid,
                                }

                            )
                        }>
                            <IoCartOutline size={30} />
                            <span className="mx-2">{order!.isPaid ? "Paid" : "Pending"}</span>

                        </div>
                        {/* Order Items */}
                        {
                            items.map(item => (
                                <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                                    <Image
                                        className="mr-5 rounded"
                                        src={`/products/${item.product.ProductImage[0].url}`}
                                        alt={item.product.title}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                        }}
                                        width={100}
                                        height={100}
                                    />
                                    <div className="flex flex-col">
                                        <p>{item.product.title}</p>
                                        <p>{currencyFormat(item.price)} x {item.quantity}</p>
                                        <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout */}
                    <div className="rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl font-bold mb-2">Shipping Address</h2>
                        <div className="mb-10">
                            <p className="text-xl font-bold">{address!.name} {address!.lastName}</p>
                            <p>Address: {address!.address}</p>
                            <p>Address 2: {address!.address2}</p>
                            <p>City: {address!.city}, {address!.postalCode}</p>
                            <p>Country: {address!.countryId}</p>
                            <p>Phone: {address!.phone}</p>
                        </div>
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10 " />
                        <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
                        <div className="grid grid-cols-2">
                            <span>Number of items</span>
                            <span className="text-right">
                                {order?.itemsInOrder === 1 ? `${order?.itemsInOrder} item` : `${order?.itemsInOrder} items`}
                            </span>
                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order!.subTotal)}</span>
                            <span>Taxes</span>
                            <span className="text-right">{currencyFormat(order!.tax)}</span>
                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
                        </div>
                        <div className="mt-5 mb-2 w-full">
                            {!order!.isPaid && (
                                <div className="flex flex-col gap-2">
                                    <button 
                                        className="btn-primary w-full"
                                        onClick={() => alert('Funcionalidad de MercadoPago en desarrollo')}
                                    >
                                        Pagar con MercadoPago
                                    </button>
                                    {/* PayPal temporalmente deshabilitado para producción */}
                                    {/* <PaypalButton orderId={order!.id} amount={order!.total} /> */}
                                </div>
                            )}
                            {order!.isPaid && (
                                <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-semibold">
                                    ✅ Orden pagada exitosamente
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}