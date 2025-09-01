// @/actions/paypal-check-payment.ts o donde tengas tu función paypalCheckPayment

'use server';

const PAYPAL_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  try {
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');
    
    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    
    if (!response.ok) {
      throw new Error('Failed to get access token');
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
}

export async function paypalCheckPayment(captureId: string) {
  try {
    console.log('Verificando captura de PayPal:', captureId);
    
    // Obtener token de acceso
    const accessToken = await getPayPalAccessToken();
    console.log('Token de acceso obtenido');
    
    // Verificar la captura (NO la orden)
    const response = await fetch(
      `${PAYPAL_API_URL}/v2/payments/captures/${captureId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      // Si falla la verificación de captura, intentar verificar como orden
      console.log('No se encontró como captura, intentando como orden...');
      
      const orderResponse = await fetch(
        `${PAYPAL_API_URL}/v2/checkout/orders/${captureId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!orderResponse.ok) {
        throw new Error('Payment verification failed');
      }
      
      const orderData = await orderResponse.json();
      console.log('Datos de la orden:', orderData);
      
      // Si la orden existe pero no está capturada, capturarla
      if (orderData.status === 'APPROVED') {
        console.log('Orden aprobada pero no capturada, capturando ahora...');
        
        const captureResponse = await fetch(
          `${PAYPAL_API_URL}/v2/checkout/orders/${captureId}/capture`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          }
        );
        
        const captureData = await captureResponse.json();
        console.log('Orden capturada:', captureData);
        
        if (captureData.status === 'COMPLETED') {
          // Aquí puedes actualizar tu base de datos
          console.log('✅ Pago completado exitosamente');
          // await updateOrderStatus(orderId, 'PAID');
          
          return {
            success: true,
            data: captureData,
            captureId: captureData.id,
            status: captureData.status
          };
        }
      }
      
      return {
        success: orderData.status === 'COMPLETED',
        data: orderData,
        status: orderData.status
      };
    }
    
    const captureData = await response.json();
    console.log('Datos de la captura verificada:', captureData);
    
    // Verificar que el pago fue exitoso
    if (captureData.status === 'COMPLETED' || captureData.status === 'PENDING') {
      // Aquí puedes actualizar tu base de datos
      console.log('✅ Pago verificado exitosamente');
      // await updateOrderStatus(orderId, 'PAID');
      
      return {
        success: true,
        data: captureData,
        captureId: captureData.id,
        status: captureData.status,
        amount: captureData.amount?.value,
        currency: captureData.amount?.currency_code
      };
    }
    
    return {
      success: false,
      error: `Payment status: ${captureData.status}`,
      data: captureData
    };
    
  } catch (error) {
    console.error('Error en paypalCheckPayment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
// "use server";

// export const paypalCheckPayment = async (paypalTransactionId: string) => {
//     const authToken = await getPaypalBearerToken();

//     console.log('authToken', authToken);

//     if (!authToken) {
//         return {
//             ok: false,
//             message: 'Error getting PayPal bearer token'
//         }
//     }
    
// }

// const getPaypalBearerToken = async (): Promise<string | null> => {

//     const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
//     const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET;
//     const PAYPAL_OAUTH_WEB_URL = process.env.PAYPAL_OAUTH_URL ?? '';

//     const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${ PAYPAL_CLIENT_SECRET}`,
//         'utf-8'
//     ).toString('base64');

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//     myHeaders.append("Authorization", `Basic ${base64Token}`);

//     const urlencoded = new URLSearchParams();
//     urlencoded.append("grant_type", "client_credentials");

//     const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: urlencoded,
//     };

//     try {
//         const result = await fetch(PAYPAL_OAUTH_WEB_URL, requestOptions).then(response => response.json());
//         return result.access_token;
//     } catch (error) {
//         console.error('Error getting PayPal bearer token', error);
//         return null;
//     }
// }
