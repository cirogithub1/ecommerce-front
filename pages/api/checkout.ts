import { mongooseConnect } from '@/lib/mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

import { Order } from '@/models/Order'
import { Product } from '@/models/Product'

const stripe_sk:any = process.env.STRIPE_SECRET_KEY
const success_url:any = process.env.URL_CALLBACK

export default async function handler(
	req: NextApiRequest,
  res: NextApiResponse
	) 
{
	if (req.method !== 'POST') {
		res.status(405).json({message: 'Method not allowed'})
	} 
		
	if (req.method === 'POST') {		
		await mongooseConnect()	
		
		const stripe = new Stripe(stripe_sk, {
			apiVersion: '2022-11-15',
		})
		
		const {
			name,
			email,
			city,
			poBox,
			address,
			country,
			productsIds } = req.body
	
		// eliminate duplicated ids in products
		const uniqueIds = [...new Set(productsIds)] // ES2016 format
		
		const productInfos = await Product.find({ _id: { $in: uniqueIds } })
	
		let line_items = []
		for (const productId of uniqueIds) {
			const productInfo:any = productInfos.find(product => product._id == productId)
			
			const quantity:number = productsIds.filter((id:any) => id == productId).length
			
			const unit_amount = productInfo.price * 100 // amount in cents
	
			if (quantity > 0 && productInfo) {
				line_items.push({
					quantity,
					price_data: {
						currency: 'USD',
						product_data: {name: productInfo.name},
						unit_amount
					}
				})
			}
		}
	
		const orderDoc = await Order.create({
			line_items,
			name,
			email,
			city,
			poBox,
			address,
			country,
			paid: false
		})		

		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: 'payment',
			customer_email: email,
			// success_url: success_url + '/cart_page?success=1',
			success_url: success_url + '/payment_resp?success=1',
			cancel_url: success_url + '/payment_resp?canceled=1',
			metadata: {orderId: orderDoc._id.toString(), test: 'ok'}
		})
		
		res.status(200).json({
			url: session.url
		})		
	}
}