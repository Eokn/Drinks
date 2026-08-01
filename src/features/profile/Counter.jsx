import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartSize } from '../cart/cartSlice'
import Typography from '@mui/material/Typography'

const Counter = ( { name }) => {
  const cartSize= useSelector(selectCartSize)
  return (
    <div>
        <Typography data-testid="counter-name" variant='body2'>
            Account belonging to { name || "a Guest"} 
        </Typography>
      
        <Typography data-testid="counter-display">current cart contains {` ${cartSize} `} items</Typography>
    </div>
  )
}

export default Counter