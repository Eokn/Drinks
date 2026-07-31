import React from 'react'
import Greeting from '../components/Greeting'
import Data from '../components/Data'
import Counter from '../components/Counter'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div>About
      <Greeting />
      <Data />
      
            <Counter />

      <Link to='/'>Link to the Home page!</Link>
    </div>
  )
}

export default About