import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  productsSelector,
  productsLoadingSelector,
} from '../../store/modules/products/selectors'
import {
  getProductsRequestAction,
  addProductAction,
  removeProductAction,
  increaseProductAction,
  decreaseProductAction,
} from '../../store/modules/products/actions'
import CartWidget from '../../components/CartWidget'
import ProductList from '../../components/ProductList'
import Cart from '../../components/Cart'
import { Overlay } from '../../components/Overlay'
import { ProductStyles } from './ProductStyles'

export const Products = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cartOpen, isCartOpen] = useState(false)
  const isLoading = useSelector(productsLoadingSelector)
  const products = useSelector(productsSelector)

  useEffect(() => {
    dispatch(getProductsRequestAction())
  }, [dispatch])

  const handleIncreaseQuantity = useCallback(
    (id) => {
      dispatch(increaseProductAction(id))
    },
    [dispatch]
  )

  const handleDecreaseQuantity = useCallback(
    (id) => {
      dispatch(decreaseProductAction(id))
    },
    [dispatch]
  )

  const handleAddProduct = useCallback(
    (id) => {
      dispatch(addProductAction(id))
    },
    [dispatch]
  )

  const handleRemoveProduct = useCallback(
    (id) => {
      dispatch(removeProductAction(id))
    },
    [dispatch]
  )

  const cartNumItems = products.reduce(
    (acc, product) => (product.inCart ? acc + product.quantity : acc),
    0
  )

  const cart = products.filter((product) => product.inCart)

  return (
    <>
      <Cart
        open={cartOpen}
        onClose={() => isCartOpen(false)}
        cart={cart}
        increaseQuantity={handleIncreaseQuantity}
        decreaseQuantity={handleDecreaseQuantity}
        cartNumItems={cartNumItems}
        removeFromCart={handleRemoveProduct}
      />

      <CartWidget onOpen={() => isCartOpen(true)} cartNumItems={cartNumItems} />
      <Overlay onClick={() => isCartOpen(false)} open={cartOpen} />
      <ProductStyles>
        <ProductList
          products={products}
          increaseQuantity={handleIncreaseQuantity}
          decreaseQuantity={handleDecreaseQuantity}
          addToCart={handleAddProduct}
        />
      </ProductStyles>
    </>
  )
}

const H1 = styled.h1`
  padding: 0 10px 50px 10px;
  text-align: center;
  color: lightGray;
`

export default Products
