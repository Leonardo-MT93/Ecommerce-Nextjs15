'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const markOrderAsPaid = async (orderId: string) => {
  try {
    // Actualizar la orden como pagada
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    });

    // Revalidar la página para mostrar los cambios inmediatamente
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
      message: 'Orden marcada como pagada exitosamente',
      order: updatedOrder
    };
  } catch (error) {
    console.error('Error marking order as paid:', error);
    return {
      ok: false,
      message: 'Error al procesar el pago'
    };
  }
};
