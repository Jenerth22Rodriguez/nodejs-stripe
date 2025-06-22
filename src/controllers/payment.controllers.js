import Stripe from "stripe";

const stripe = new Stripe();

export const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Laptop",
              description: "Surface Pro",
            },
            currency: "usd",
            unit_amount: 20000, // 200 dollars
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: "Orange Juice",
              description: "with pulp",
            },
            currency: "usd",
            unit_amount: 200, // 2 dollars
          },
          quantity: 3,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return res.json(session);
  } catch (error) {
    console.error("Stripe error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
