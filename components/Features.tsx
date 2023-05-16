import styled from "styled-components"
import Image from "next/image"
import { useContext } from "react"
import { CartContext } from "./CartContext"

import Center from "./Center"
import StyledButton from "./StyledButton"
import LinkButton from "./LinkButton"
import CartIcon from "./icons/CartIcon"

const Bg = styled.div`
	background-color: #222;
	color: #fff;
	padding: 50px 0;
`

const Title = styled.h1`
	margin: 0;
	font-weight: normal;
	font-size: 2rem;
	@media (min-width: 768px) {
		font-size: 3rem;
	}
`

const Desc = styled.p`
	color: #aaa;
	font-size: .8rem;
`
// screen mobile by defoult
const ColumnsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
	div:nth-child(1) {
		order: 2;
	}
	@media (min-width: 768px) {
		grid-template-columns: 1.1fr .9fr;	
		div:nth-child(1) {
			order: inherit;
		}	
	}
`

const ButtonsWrapper = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 25px;
`

const Column = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	@media (min-width: 768px) {
		align-items: flex-start;	
	}
`

export default function Features({ product }:any) {
	const { addToCart } = useContext<any>(CartContext)
	
	function addFeaturedToCart() {
		addToCart(product._id)		
	}

	return (
		<Bg>
			<Center>
				<ColumnsWrapper>
					<Column>
						<Title>{product?.name}</Title>
						
						<Desc>{product?.description}</Desc>

						<ButtonsWrapper>
							<LinkButton href={'/product/' + product?._id} white={1} outline={1}>
								Read more</LinkButton>

							<StyledButton 
								primary
								onClick={addFeaturedToCart}>
									<CartIcon iconClass="w-6 h-6" /> 
									Add to cart
							</StyledButton>

						</ButtonsWrapper>
					</Column>

					<Column>
						<Image 
							src={product?.images[0]} 
							alt={product?.images[0]} 
							width={320}
							height={175}
							style={{
								height: 'auto',
								width: 'auto'
							}}/>
					</Column>
				</ColumnsWrapper>

			</Center>
		</Bg>
	)
}