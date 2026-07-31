import React from 'react'
import Greeting from '../features/profile/Greeting'
import Counter from '../features/profile/Counter'
import Data from '../features/profile/Data'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile, selectSignedIn } from '../features/profile/profileSlice'
import { UPDATE_CARTOPEN } from '../features/cart/cartSlice'

const LogIn = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(UPDATE_CARTOPEN('closed'))
    }, [])
  return (
    <main>Login page
      <Greeting />
      <Counter />
      <Data />
      

      <Link to='/'>Link to the Home page!</Link>
    </main>
  )
}

export default LogIn