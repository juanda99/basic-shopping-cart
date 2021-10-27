import { CustomButton } from './CustomButton'
import styled from 'styled-components'
import React from 'react'

const IncreaseDecreaseButton = styled(CustomButton).attrs(() => ({
  backgroundColor: 'lightGrey',
}))`
  font-weight: 900;
  font-size: 18px;
  padding: 2px 8px;
`

export const IncreaseButton = ({ ...props }) => (
  <IncreaseDecreaseButton {...props}>+</IncreaseDecreaseButton>
)

export const DecreaseButton = ({ ...props }) => (
  <IncreaseDecreaseButton {...props}> &#8210;</IncreaseDecreaseButton>
)
