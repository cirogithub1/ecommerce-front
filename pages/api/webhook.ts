import { mongooseConnect } from '@/lib/mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY')
import { buffer } from 'micro'
import { Order } from '@/models/Order'

const stripe_sk:any = process.env.STRIPE_SECRET_KEY
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_ff0b31efefc4e7cec20f502f18c6d88871002014bb9b47a5b59573aaade1ac63";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await mongooseConnect()

	const sig = req.headers['stripe-signature'];

  let event;

	const seq_buffer = await buffer(req)
  try {
    event = stripe.webhooks.constructEvent(seq_buffer, sig, endpointSecret);
  } catch (err:any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      // Then define and call a function to handle the event checkout.payment_intent.succeeded
			// console.log({ 'checkout.session.completed':data })
      const orderId = data.metadata.orderId
      const payment_status = data.payment_status === 'paid'
      
      if (orderId && payment_status) {
        await Order.findByIdAndUpdate(orderId, {paid: true})
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true })
}
 
export const config = {
	api: {bodyParser: false}	
}