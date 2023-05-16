import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"

import { CartContext } from "./CartContext"
import StyledButton from "./StyledButton"	
import CartIcon from "./icons/CartIcon"

import ImgDefault from '../public/favicon.ico'
const ProductWapper = styled.div`
	padding: 0 40px;
`

const WhiteBox = styled(Link)`
	background: #ffff;
	padding: 10px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
`

const Title = styled(Link)`
	font-weight: normal;
	font-size: .9rem;
	color: inherit;
	text-decoration: none;
	margin: 0;
`

const ProductInfoBox = styled.div`
	margin-top: 10px;
`

const PriceRow = styled.div` 
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Price = styled.div` 
	font-size: 1rem;
	font-weight: bolder;
	@media (min-width: 768px) {
		font-size: 1.3rem;
		font-weight: 700;
	}
`

export default function ProductBox({ 
	_id,
	name, 
	description,
	category, 
	images, 
	price } : any) 
{

	const { addToCart } = useContext(CartContext)
	const url = `/product/${_id}`
	
	return (
		<ProductWapper>
			<WhiteBox href={url}>
				{images[0] 
				? 
					<Image 
						src={images[0]}
						alt={images}
						width={120}
						height={120} />
				:
					<Image 
						src={ImgDefault}
						alt={images}
						width={120}
						height={120} />
				}
			</WhiteBox>

			<ProductInfoBox>
				<Title href={url}>{name}</Title>

				<PriceRow>
					<Price>
						${price}
					</Price>

					<StyledButton 
						primary 
						outline
						onClick={() => addToCart(_id)}>
						<CartIcon iconClass='h-6 w-6'/>
					</StyledButton>

				</PriceRow>

			</ProductInfoBox>
			
		</ProductWapper>
	)
}