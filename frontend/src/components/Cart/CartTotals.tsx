import React from 'react'
import { Product } from '../../store/modules/products/model'
import { VerticalBar } from './VerticalBar'
import styled from 'styled-components'

type Props = {
  cart: Product[]
  cartNumItems: number
}

export const CartTotals = ({ cart, cartNumItems }: Props) => {
  const cartPriceTotal = cart.reduce(
    (acc, product) => acc + product.customerPrice * product.quantity,
    0
  )

  return (
    <H2>
      Items: {cartNumItems} <VerticalBar /> Total Price: $
      {cartPriceTotal.toFixed(2)}
    </H2>
  )
}

const H2 = styled.h2`
  padding: 4px 0;
  font-size: 18px;
  border-bottom: 1px dashed black;
`

export default CartTotals
