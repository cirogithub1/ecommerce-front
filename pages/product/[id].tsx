import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import Image from "next/image";

import { useContext } from "react"
import { CartContext } from "@/components/CartContext"

import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import StyledButton from "@/components/StyledButton";
import { Product } from "@/models/Product"
import CartIcon from "@/components/icons/CartIcon";

const ColWrapper = styled.div`
	display: grid;
	gap: 40px;
	margin-top: 40px;
	margin-bottom: 20px;
	@media (min-width: 768px) {
		grid-template-columns: .8fr 1.2fr;
	}
`

const PriceRow = styled.div`
	display: flex;
	gap: 15px;
`

const Price= styled.p`
	margin: 8px;
	font-weight: bold;
	font-size: 1.8rem;
`

export default function ProductPage({ product }:any) {
	
	const { addToCart } = useContext(CartContext)

	return (
		<>
			<Header />

			<Center>
				<ColWrapper>
					<WhiteBox>
						<ProductImages images={product.images} />
					</WhiteBox>

					<div>
						<Title>
							<h1>{product.name}</h1>
						</Title>

						<p>{product.description}</p>

						<PriceRow>
							<Price>
								${product.price}
							</Price>
							
							<StyledButton 
								tyledButton 
								primary
								onClick={() => addToCart(product._id)}
								>
									<CartIcon /> Add to cart</StyledButton>
						</PriceRow>
					</div>
				</ColWrapper>

			</Center>
		</>
	)
}

export async function getServerSideProps(context: any) {
	await mongooseConnect()

	// console.log(context.query)
	const { id } = context.query
	const product = await Product.findById(id)
	
	return {
		props: {
			product: JSON.parse(JSON.stringify(product))
		}
	}
} 
	
