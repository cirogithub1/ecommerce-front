import Link from "next/link"
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react"
import styled from "styled-components"

import { CartContext } from "@/components/CartContext"
import Header from "@/components/Header"
import Center from "@/components/Center"

const Box = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	margin-top: 20px;
	text-align: center;
`

export default function PaymentResponse() {
	// const { asPath } = useRouter()
	const { cartProductsIds, clearCart } = useContext(CartContext)
	const router = useRouter()
	
	useEffect(() => {
		
		clearCart()
	
	},[])

  return (
		<div>
			<Header />

			<Center>
				<Box>
					<h1>Thank you for your purchase</h1>
				</Box>
			</Center>
		</div>
	)
}