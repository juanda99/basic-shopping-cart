import React from 'react'
import { shallow } from 'enzyme'
import CartWidget from '.'
import { productData } from '../../store/modules/products/mockData'

describe('CartWidget', () => {
  it('Renders without errors', () => {
    const isCartOpen = jest.fn()
    const cartNumItems = 2
    shallow(
      <CartWidget onOpen={() => isCartOpen(true)} cartNumItems={cartNumItems} />
    )
  })
})
