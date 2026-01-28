// src/lib/orderInvoice.js
export const generateInvoiceEmail = ({ name, orderId, items, total }) => {
  const itemsHtml = items.map(
    (item) =>
      `<tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>৳${item.price}</td>
      </tr>`
  ).join("");

  return `
    <div style="font-family: sans-serif;">
      <h2>Hi ${name},</h2>
      <p>Thank you for your order. Your order ID is <strong>${orderId}</strong>.</p>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <p><strong>Total: ৳${total}</strong></p>
      <p>We will process your order shortly.</p>
    </div>
  `;
};
