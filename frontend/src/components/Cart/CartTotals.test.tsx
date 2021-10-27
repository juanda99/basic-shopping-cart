import React from 'react'
import { shallow } from 'enzyme'
import CartTotals from './CartTotals'

const cart = [
  {
    id: 1,
    name: 'Soup',
    customerPrice: 199,
    cost: 186,
    inCart: false,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Bread',
    customerPrice: 87,
    cost: 21,
    inCart: true,
    quantity: 2,
  },
]

describe('CartTotals', () => {
  it('Renders without errors', () => {
    shallow(<CartTotals cart={cart} cartNumItems={2} />)
  })
  it('Renders correctloy', () => {
    const wrapper = shallow(<CartTotals cart={cart} cartNumItems={2} />)
    expect(wrapper).toMatchSnapshot()
  })
})
