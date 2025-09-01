'use client';

import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { useRouter } from "next/navigation";

interface Props {
    orderId: string;
    amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
    const router = useRouter();
    const [{ isPending }] = usePayPalScriptReducer();
    const roundedAmount = Math.round(amount * 100) / 100;

    if (isPending) {
        return (
            <div className="animate-pulse mb-16">
                <div className="h-11 bg-gray-400 rounded mb-4" />
                <div className="h-11 bg-gray-400 rounded mb-2" />
            </div>
        );
    }

    const createOrder: PayPalButtonsComponentProps['createOrder'] = async (data, actions) => {
        try {
            const transactionId = await actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        // invoice_id: orderId,
                        amount: {
                            currency_code: 'USD',
                            value: roundedAmount.toFixed(2) // FIX PRINCIPAL: usar toFixed(2) para formato correcto
                        },
                        description: `Order #${orderId}`
                    }
                ],
                application_context: {
                    shipping_preference: 'NO_SHIPPING'
                }
            });

            console.log('transactionId:', transactionId);
            
            // Guardar el transactionId en la base de datos
            const { ok, message } = await setTransactionId(orderId, transactionId);
            if (!ok) {
                throw new Error(message);
            }

            return transactionId;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        console.log('onApprove');
        const details = await actions.order?.capture();
        if (!details) {
            console.log('Error capturing the order');
            throw new Error('Error capturing the order');
        }
        await paypalCheckPayment(details.id!);
    };

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    );
};