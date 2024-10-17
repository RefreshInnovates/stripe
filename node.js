const express = require('express');
const Stripe = require('stripe');
const app = express();

// Use your Stripe Secret Key from the environment
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/connection_token', async (req, res) => {
  try {
    const token = await stripe.terminal.connectionTokens.create();
    res.json({ secret: token.secret });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
