import { config } from "dotenv";
config();

export const PORT = 3000;
export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;

console.log("Stripe key from .env:", STRIPE_PRIVATE_KEY);
