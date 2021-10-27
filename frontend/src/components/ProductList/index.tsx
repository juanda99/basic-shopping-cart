import React from 'react'
import { Product } from '../../store/modules/products/model'
import styled from 'styled-components'
import ProductCard from '../ProductCard'

type Props = {
  products: Product[]
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  addToCart: (id: number) => void
}

export const ProductList = ({
  products,
  increaseQuantity,
  decreaseQuantity,
  addToCart,
}: Props): JSX.Element => (
  <Wrapper>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        addToCart={addToCart}
      />
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  max-width: 1100px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
`

export default ProductList
