"use client";

import { markOrderAsPaid } from "@/actions";
import { useState } from "react";

interface Props {
    orderId: string;
    isPaid: boolean;
}

export default function PaymentButton({ orderId, isPaid }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        
        try {
            const result = await markOrderAsPaid(orderId);
            
            if (result.ok) {
                // La página se actualizará automáticamente gracias a revalidatePath
                console.log('Pago procesado exitosamente');
            } else {
                alert(result.message || 'Error al procesar el pago');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error inesperado al procesar el pago');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isPaid) {
        return (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-semibold">
                ✅ Orden pagada exitosamente
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <button 
                className={`w-full ${isProcessing ? 'btn-disabled' : 'btn-primary'}`}
                onClick={handlePayment}
                disabled={isProcessing}
            >
                {isProcessing ? 'Procesando pago...' : 'Pagar con MercadoPago'}
            </button>
            {/* PayPal temporalmente deshabilitado para producción */}
            {/* <PaypalButton orderId={orderId} amount={order!.total} /> */}
        </div>
    );
}
