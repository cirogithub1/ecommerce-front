import styled from "styled-components"
import axios from "axios"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/router'

import Header from "@/components/Header"
import Center from "@/components/Center"
import StyledButton from "@/components/StyledButton"
import { CartContext } from "@/components/CartContext"

import StyledTable from "@/components/StyledTable"
import StyledInput from "@/components/StyledInput"

const ColumnsWrapper = styled.div`
	display: grid;
	gap: 20px;
	margin: 20px 0px;
	@media (min-width: 768px) {
		grid-template-columns: 1.3fr .7fr;	
	}
`

const Box = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
`

const ProductNameCell = styled.td`
	padding: 10px 0px;
	
`

const QtyActions = styled.td`
`

const ProductImage = styled.div`
	max-width: 60px;
	max-height: auto;
	padding: 3px;
	box-shadow: 2px 2px 2px 2px rgba(0,0,0,.1);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	margin-bottom: 10px;
	img{
		max-width: 50px;
		max-height: 50px;
	}
	@media (min-width: 768px) {
		max-width: 100px;
		max-height: auto;
		padding: 10px;
		box-shadow: 5px 5px 5px 5px rgba(0,0,0,.1);
		img{
			max-width: 100px;
			max-height: 100px;
		}
	}
`

const QtyLabel = styled.span` 
	padding: 2px 6px;
	display: block;
	@media (min-width: 768px) {
		padding: 5px 12px;
		display: inline-block;
	}
`

const CityCell = styled.div`
	display: flex;
	gap: 5px;
`

export default function CartPage() {
	const { 
		cartProductsIds, 
		addToCart, 
		removeFromCart, 
		clearCart } = useContext(CartContext)

	const { asPath } = useRouter()

	const [products, setProducts] = useState([]) 

	// form data
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [city, setCity] = useState("")
	const [poBox, setPoBox] = useState("")
	const [address, setAddress] = useState("")
	const [country, setCountry] = useState("")

	function increaseQty(id:string) {
		addToCart(id)
	}
	
	function decreaseQty(id:string) {
		removeFromCart(id)
	}

	// calculate the total price of the cart
	let totalPrice = 0
	function getTotalPrice() {
		if (cartProductsIds?.length > 0) {
			for (const productId of cartProductsIds) {
				const product:any = products.find((productItem:any) => productItem._id === productId)
				totalPrice += product?.price || 0
			}
		} 
	}
	getTotalPrice()
	
	async function handlePayment(e:any) {
		e.preventDefault()
		
		const data = {
			name,
			email,
			city,
			poBox,
			address,
			country,
			productsIds : cartProductsIds
		}

		await axios({
			method: 'post',
			url: `/api/checkout`,
			data
		})
		.then(resp => {
			// console.log({"/cart_page/ response": resp.data.url})
			window.location.href = resp.data.url
		})
	}

	useEffect(() => {
		async function getProducts() {
			if (cartProductsIds?.length > 0) {
				// console.log({"/cart_products/ cartProducts": cartProducts})
				const data = cartProductsIds
				
				await axios({
					method: 'post',
					url: `/api/cart`,
					data
				})
				.then(resp => {
					// console.log({"/cart_products/ response": resp})
					setProducts(resp.data)
				})
			}
		}	
		getProducts()
		
	}, [cartProductsIds])
	
	// if (asPath?.includes("success")) {
		
	// 	return (
	// 		<>
	// 			<Header />

	// 			<Center>
	// 				<Box>
	// 					<h1>Thank you for your order!</h1>
	// 					<p>Your order will be delivered shortly.</p>
	// 				</Box>
	// 			</Center>
	// 		</>
	// 	)
	// } 

	return (
		<>
			<Header />
				<Center>
					<ColumnsWrapper>
						<Box>
							{!cartProductsIds?.length 
							&& <h2>Cart is empty</h2>}

							{cartProductsIds?.length 
							?
								<>
									<h2>Cart</h2>

									<StyledTable>
										<thead>
											<tr>
												<th>Product</th>
												<th>Quantity</th>
												<th>Price</th>
											</tr>
										</thead>

										<tbody>
											{products.map((productItem:any) => (
												<tr key={productItem._id}>
													<ProductNameCell>
														<ProductImage>
															<Image
																src={productItem.images[0]}
																alt={productItem.images[0]} 
																width={100}
																height={100}/>
														</ProductImage>
														{productItem.name}
													</ProductNameCell>
													
													<QtyActions>
														<div>
															<div>
																<StyledButton 
																	size="sm"
																	onClick={() => decreaseQty(productItem._id)}>
																		-
																</StyledButton>
															</div>

															<div>
																<QtyLabel>
																	{cartProductsIds.filter((productId:any) => productId === productItem._id).length}
																</QtyLabel>
															</div>

															<div>
																<StyledButton
																	size="sm"
																	onClick={() => increaseQty(productItem._id)}>
																		+
																</StyledButton>
															</div>
														</div>

													</QtyActions>

													<td>
														${cartProductsIds.filter((productId:any) => productId === productItem._id).length * productItem.price}
													</td>
												</tr>
											))}
											<tr>
												<td> - </td>
												<td> - </td>
												<td>
													${totalPrice}
												</td>
											</tr>
										</tbody>
									</StyledTable>
								</>
							:
								""
							}
						</Box>

						{cartProductsIds?.length 
						? 
							<Box>
								<h2>Order information</h2>

								<form 
									onSubmit={(e:any) => handlePayment(e)}>
									
									<StyledInput 
										type="text" 
										placeholder="Name" 
										value={name}
										name='name'
										onChange={(e:any) => setName(e.target.value)}/>

									<StyledInput 
										type="text" 
										placeholder="Email" 
										value={email}
										name='email'
										onChange={(e:any) => setEmail(e.target.value)}/>

									<CityCell>
										<StyledInput 
											type="text" 
											placeholder="City" 
											value={city}
											name='city'
											onChange={(e:any) => setCity(e.target.value)}/>
									
										<StyledInput 
											type="text" 
											placeholder="P.O. Box" 
											value={poBox}
											name='poBox'
											onChange={(e:any) => setPoBox(e.target.value)}/>
									</CityCell>

									<StyledInput 
										type="text" 
										placeholder="St. Address" 
										value={address}
										name='address'
										onChange={(e:any) => setAddress(e.target.value)}/>
									
									<StyledInput 
										type="text" 
										placeholder="Country" 
										value={country}
										name='country'
										onChange={(e:any) => setCountry(e.target.value)}/>
									
									<StyledButton black block type='submit'>
										Continue
									</StyledButton>
								</form>

							</Box>
						: ""
						}
					</ColumnsWrapper>
				</Center>
		</>
	)
}