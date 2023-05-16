import { createContext } from "react";

export const CartContext = createContext({
	cartProductsIds: [],
	setCartProducts: (prev:any) => {},
	addToCart: (productId:any) => {},
	removeFromCart: (productId:any) => {},
	clearCart: () => {}
})