import React from 'react'
import styled from 'styled-components'
import { Product } from '../../store/modules/products/model'
import { CustomButton } from '../CustomButton'
import { P } from '../P'
import { Arrow } from './Arrow'
import { VerticalBar } from './VerticalBar'
import { CartButtons } from './CartButtons'

type Props = {
  cart: Product[]
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}

export const CartInfo = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: Props) => (
  <>
    {cart.map((product) => (
      <DetailColumn key={product.id}>
        <P>
          {product.name} <VerticalBar /> {product.quantity} x $
          {product.customerPrice} <Arrow /> $
          {(product.customerPrice * product.quantity).toFixed(2)}
        </P>

        <CartButtons
          increaseQuantity={() => increaseQuantity(product.id)}
          decreaseQuantity={() => decreaseQuantity(product.id)}
          removeFromCart={() => removeFromCart(product.id)}
        />
      </DetailColumn>
    ))}
    <CheckoutButton>Checkout</CheckoutButton>
  </>
)
const DetailColumn = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 5px 0;
  width: 95%;
  border-bottom: 1px solid black;
`

const CheckoutButton = styled(CustomButton).attrs(() => ({
  backgroundColor: 'darkblue',
}))`
  margin-top: 15px;
  margin-bottom: 15px;
`
