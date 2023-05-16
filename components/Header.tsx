import Link from "next/link"
import styled from 'styled-components'
import { useContext, useState } from "react"

import Center from './Center'
import { CartContext } from "./CartContext"
import BarsIcon from './icons/BarsIcon'

const StyledHeader = styled.header`
	background-color: #222;
	margin: 0 auto;
	position: sticky;
	top: 0;
	width: 100%;
	`

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	align-items: center;
	@media (min-width: 768px) {
		padding: 20px 0;
	}
`

const Logo = styled(Link)`
	color: #fff;
	text-decoration: none;
`

// screen mobile by defoult
interface NavProps {
	active: boolean
}
const StyledNav = styled.nav<NavProps>`
	${(props:any) => props.active
	? 'display: block;'
	: 'display: none;'}
	gap: 15px;
	position: fixed;
	top: 50px;
	left: 0;
	bottom: 0;
	right: 0px;
	padding: 20px;
	background-color: #222;
	opacity: 0.9;
	font-size: 24px;
	line-height: 38px;
	@media (min-width: 768px) {
		padding: 0;
		font-size: inherit;
		line-height: inherit;
		display: flex;
		position: static;
		left: 0;
	}
`

const NavLink = styled(Link)`
	display: block;
	color: #aaa;
	text-decoration: none;
	&:hover {
		background-color: #747171;
	}
	@media (min-width: 768px) {
		&:hover {
			background-color: inherit;
		}
	}
`

const NavButton = styled.button`
	margin: 0;
	background-color: transparent;
	width: 30px;
	height: 30px;
	color: #aaa;
	cursor: pointer;
	&:hover {
		border: .5px solid #000;
	}
	@media (min-width: 768px) {
		display: none;
	}
`

export default function Header() {
	const { cartProductsIds } = useContext(CartContext)
	
	const [navActive, setNavActive] = useState(false)

	return(
		<StyledHeader>
			<Center>
				<Wrapper>
					<Logo href={'/'}>Ecommerce</Logo>

					<StyledNav 
						active={navActive} 
					>
						<NavLink href={'/'}>Home</NavLink>
						<NavLink href={'/products'}>All Products</NavLink>
						<NavLink href={'/categories</'}>Categories</NavLink>
						<NavLink href={'/account</'}>Account</NavLink>
						<NavLink href={'/cart_page/'}>Cart({cartProductsIds.length})</NavLink>
					</StyledNav>

					<NavButton
						onClick={() => setNavActive(!navActive)}
						>
						<BarsIcon /> 
					</NavButton>

				</Wrapper>
			</Center>
		</StyledHeader>
	)
}
