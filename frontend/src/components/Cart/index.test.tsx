import React from 'react'
import { shallow } from 'enzyme'
import Cart from '.'
import { productData } from '../../store/modules/products/mockData'

describe('Cart', () => {
  it('Renders without errors', () => {
    const isCartOpen = jest.fn()
    const handleIncreaseQuantity = jest.fn
    const handleDecreaseQuantity = jest.fn
    const handleRemoveProduct = jest.fn
    shallow(
      <Cart
        open={true}
        onClose={() => isCartOpen(false)}
        cart={productData}
        increaseQuantity={handleIncreaseQuantity}
        decreaseQuantity={handleDecreaseQuantity}
        cartNumItems={4}
        removeFromCart={handleRemoveProduct}
      />
    )
  })
})
