import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import Data from './components/Data'
import './App.css'

function App() {
  
  return (
    <>
      
          <Greeting name='here is where you put something' />
        
      <Counter name='me' />
      
      <section id="next-steps">
        <Data name='name of the user' userId={"nah"} />
        
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
