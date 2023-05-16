import styled from "styled-components"

import ProductBox from "./ProductBox"

const StyledProductsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	@media screen and (min-width: 768px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

function ProductsGrid({ products }:any) {
	return (
		<StyledProductsGrid>
			{products?.length && products.map((product:any) => (					
					<ProductBox key={product._id} {...product} />
				))}
		</StyledProductsGrid>
	)
}

export default ProductsGrid