import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createSession = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    if (!product || !quantity) {
      return res.status(400).json({ error: "Missing product or quantity" });
    }

    // Define your product catalog (example)
    const catalog = {
      laptop: {
        name: "Laptop",
        description: "Surface Pro",
        amount: 20000, // $200
      },
      juice: {
        name: "Orange Juice",
        description: "With pulp",
        amount: 200, // $2
      },
    };

    const selected = catalog[product];
    if (!selected) {
      return res.status(400).json({ error: "Invalid product" });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selected.name,
              description: selected.description,
            },
            unit_amount: selected.amount,
          },
          quantity: parseInt(quantity),
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
