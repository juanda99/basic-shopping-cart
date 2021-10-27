import styled from 'styled-components'
import { CustomButton } from '../CustomButton'
import React from 'react'

const CloseButt = styled(CustomButton)`
  padding: 5px 8px;
  font-size: 14px;
  margin: 2px;
`
export const CloseButton = ({ ...props }) => <CloseButt {...props}>X</CloseButt>
