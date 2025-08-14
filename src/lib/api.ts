// Mock API for orders until backend is implemented
export interface OrderData {
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

export const submitOrder = async (orderData: OrderData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const orderId = `JS-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // In production, this would send to Telegram via backend
  console.log('Order submitted:', {
    orderId,
    ...orderData,
    timestamp: new Date().toISOString()
  });
  
  // Mock Telegram message format
  const message = `🆕 জার্সি অর্ডার | JerseyStore
-------------------------------
📦 Order ID: #${orderId}
👤 Customer: ${orderData.customer.name}
📞 Phone: ${orderData.customer.phone}
📍 Address: ${orderData.customer.address}
🛒 Items:${orderData.items.map((item: any) => `\n  - ${item.quantity}x ${item.product.title_bn} (${item.size}) - ৳${item.product.price_bdt * item.quantity}`).join('')}
💰 Total: ৳${orderData.total}
📆 Time: ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}
🚚 Area: ${orderData.customer.area || 'N/A'}
📝 Notes: ${orderData.customer.notes || 'No notes'}`;
  
  console.log('Telegram Message:', message);
  
  // TODO: Replace with actual Telegram API call in production
  // await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     chat_id: TELEGRAM_CHAT_ID,
  //     text: message
  //   })
  // });
  
  return {
    success: true,
    orderId,
    message: 'Order placed successfully'
  };
};