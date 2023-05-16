import type { NextApiRequest, NextApiResponse } from 'next'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default async function handler(
	req: NextApiRequest,
  res: NextApiResponse) 
{
	await mongooseConnect()
	const ids = req.body
	const productsById = await Product.find({ _id: ids })
	
	res.json(productsById)
}