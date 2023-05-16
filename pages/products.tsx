import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";

import Center from "@/components/Center";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage({ products }:any) {

	return (
		<>
		<Header />
			<Center>
				<Title>All Products</Title>

				<ProductsGrid products={products} />
			</Center>

		</>
	)
	
}

export async function getServerSideProps() {
	await mongooseConnect()

	const products = await Product.find({})
	
	return {
		props: {
			products: JSON.parse(JSON.stringify(products))
		}
	}
}