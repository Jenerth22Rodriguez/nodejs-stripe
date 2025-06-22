import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: { name: "Laptop", description: "Surface Pro" },
            currency: "usd",
            unit_amount: 20000,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: { name: "Orange Juice", description: "With pulp" },
            currency: "usd",
            unit_amount: 200,
          },
          quantity: 3,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    // ✅ ONLY return the session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
