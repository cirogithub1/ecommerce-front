import styled from "styled-components"

import Center from "./Center"
import ProductBox from "./ProductBox"
import ProductsGrid from "./ProductsGrid"

const Title = styled.h2`
	font-size: 2rem;
	margin: 20px 0 20px;
	font-weight: bold;
`

export default function NewProducts({ products } : any) {
	return (
		<Center>
			<Title>New Arrivals</Title>
			<ProductsGrid products={products} />
		</Center>
	)
}
