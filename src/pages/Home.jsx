import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Counter from '../components/Counter'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Counter />
      <Link to='/about'>Link to the About page!</Link>
    </div>
  )
}

export default Home