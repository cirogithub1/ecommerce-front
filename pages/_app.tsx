// import '@/styles/globals.css'
import {createGlobalStyle} from 'styled-components'
import type { AppProps } from 'next/app'

import { useEffect, useState } from 'react'
import { CartContext } from '../components/CartContext'
import { set } from 'mongoose'

const GlobalStyles = createGlobalStyle`
  body{
    background: #f0f0f0;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  const [cartProductsIds, setCartProducts] = useState<any>([])

  function addToCart(productId:any) {
    setCartProducts((prevState:any) => [...prevState, productId])
  }

  function removeFromCart(productId:any) {
    const position = cartProductsIds.indexOf(productId)
    setCartProducts((prevState:any) => {
      if (position !== -1) {
        return prevState.filter((value:any, index:any) => index !== position)
      } 
    })
  }

  function clearCart() {
		setCartProducts([])
    localStorage.removeItem('cartProducts')
	}

  useEffect(() => {
    if (cartProductsIds.length > 0) {
      localStorage.setItem('cartProducts', JSON.stringify(cartProductsIds))
    }
  }, [cartProductsIds])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]')
      setCartProducts(cartProducts)
    }   
  }, [])
  
  return (
    <>
      <GlobalStyles />
      <CartContext.Provider value={{ cartProductsIds, setCartProducts, addToCart, removeFromCart, clearCart }}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </>
  )
}