import React from 'react'
import { Product } from '../../store/modules/products/model'
import { CustomButton } from '../CustomButton'
import { IncreaseButton, DecreaseButton } from '../IncreaseDecreaseButton'
import { P } from '../P'
import styled from 'styled-components'

type Props = {
  product: Product
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  addToCart: (id: number) => void
}

export const ProductCard = ({
  product,
  increaseQuantity,
  decreaseQuantity,
  addToCart,
}: Props): JSX.Element => (
  <Column key={product.name}>
    <H4>{product.name}</H4>
    <P>${product.customerPrice}</P>
    {!product.inCart && (
      <div>
        <DecreaseButton onClick={() => decreaseQuantity(product.id)} />
        <span>{product.quantity}</span>
        <IncreaseButton onClick={() => increaseQuantity(product.id)} />
      </div>
    )}

    <Image src="placeholder.png" alt={product.name} />
    {!product.inCart && (
      <CustomButton onClick={() => addToCart(product.id)}>
        Add to Cart
      </CustomButton>
    )}
    {product.inCart && <P>Added!</P>}
  </Column>
)
const Column = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  border: 0.5px solid #999999;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 12px 20px;
  border-radius: 10px;
  margin: 8px;
  background-color: #f2f2f2;
`
const Image = styled.img`
  padding: 10px;
  width: 150px;
  height: 150px;
  object-fit: cover;
`
const H4 = styled.h4`
  padding: 5px 0;
  margin-bottom: 5px;
  font-size: 18px;
`
export default ProductCard
