// Simple API endpoint for handling orders
interface OrderRequest {
  items: any[];
  customer: {
    name: string;
    phone: string;
    address: string;
    area: string;
    notes?: string;
  };
  total: number;
}

interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
}

export async function POST(request: Request): Promise<Response> {

  try {
    const body: OrderRequest = await request.json();
    const { items, customer } = body;

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.product.price_bdt * item.quantity), 0);

    // Generate order ID
    const orderId = `JS-${Math.floor(1000 + Math.random() * 9000)}`;

    // Format message for Telegram
    const message = `🆕 জার্সি অর্ডার | JerseyStore
-------------------------------
📦 Order ID: #${orderId}
👤 Customer: ${customer.name}
📞 Phone: ${customer.phone}
📍 Address: ${customer.address}
🛒 Items:${items.map((item: any) => `\n  - ${item.quantity}x ${item.product.title_bn} (${item.size}) - ৳${item.product.price_bdt * item.quantity}`).join('')}
💰 Total: ৳${total}
📆 Time: ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}
🚚 Area: ${customer.area || 'N/A'}
📝 Notes: ${customer.notes || 'No notes'}`;

    // Send to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }),
    });

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', await telegramResponse.text());
      throw new Error('Failed to send notification');
    }

    return Response.json({ 
      success: true, 
      orderId,
      message: 'Order placed successfully' 
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to process order' 
    }, { status: 500 });
  }
}