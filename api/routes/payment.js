

// payment.js dosyasının başında gerekli modülleri dahil edin.
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51OYU9xKpiKwShdhdulrwNNVnge1qh51BcLALaI7ZZ4X9xT5plzosZcYh5tgjybWOQkHUUOutX2po9bd4FDREc6EU00Efo6KD04');

router.post('/', async (req, res) => {
  const { rooms, user, cargoFee } = req.body;

if (!rooms) {
  return res.status(400).json({ error: 'Rooms data is missing or invalid' });
}

const lineItems = rooms.map((room) => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name: room.name,
    },
    unit_amount: Math.round(room.price * 100), // Fiyat cent cinsinden
  },
  quantity: room.quantity,
}));

// Kargo ücreti için ayrı bir lineItem ekleniyor
if (cargoFee !== 0) {
  lineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Hızlı Kargo",
      },
      unit_amount: cargoFee * 100,
    },
    quantity: 1,
  });
}

// Stripe ödeme oturumu oluşturuluyor
try {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
  });

  res.status(200).json({ id: session.id });
} catch (error) {
  console.error('Hata:', error.message);
  res.status(500).json({ error: 'Ödeme işlemi sırasında bir hata oluştu' });
}

});

module.exports = router;
