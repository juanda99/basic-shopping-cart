import React from 'react'
import styled from 'styled-components'
import { CustomButton } from '../CustomButton'

import { IncreaseButton, DecreaseButton } from '../IncreaseDecreaseButton'

type Props = {
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}

export const CartButtons = ({
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: Props): JSX.Element => (
  <div>
    <IncreaseButton onClick={increaseQuantity} />
    <DecreaseButton onClick={decreaseQuantity} />
    <RemoveButton onClick={removeFromCart} />
  </div>
)

const RemoveButton = ({ ...props }) => (
  <RemoveButtonStyled {...props}> Remove</RemoveButtonStyled>
)

const RemoveButtonStyled = styled(CustomButton)`
  padding: 5px 10px;
`
