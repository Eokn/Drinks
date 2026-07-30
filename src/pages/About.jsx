import React from 'react'
import Greeting from '../components/Greeting'
import Data from '../components/Data'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div>About
      <Greeting />
      <Data />

      <Link to='/'>Link to the Home page!</Link>
    </div>
  )
}

export default About