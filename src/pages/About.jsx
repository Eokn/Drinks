import React from 'react'
import Greeting from '../features/profile/Greeting'
import Counter from '../features/profile/Counter'
import Data from '../features/profile/Data'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <main>About
      <Greeting />
      <Counter />
      <Data />
      

      <Link to='/'>Link to the Home page!</Link>
    </main>
  )
}

export default About