import React from 'react'
import Greeting from '../features/profile/Greeting'
import Counter from '../features/profile/Counter'
import Data from '../features/profile/Data'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile, selectSignedIn } from '../features/profile/profileSlice'
import { UPDATE_CARTOPEN } from '../features/cart/cartSlice'
import Paper from '@mui/material/Paper'
import { makeStyles } from 'tss-react/mui'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles()(theme => ({
  aboutContainer: {
    width:'80%',
    maxWidth:'40rem',
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem',
    margin: '10rem auto 0 auto',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    textAlign:'center',
  },
  title: {
      fontSize: '2rem',
  textTransform: 'capitalize',
  letterSpacing: '0.2rem',
  textAlign: 'center',
  margin:'1rem 0',
  color: theme.palette.primary.dark,
  },
  paragraphFiller: {
    color: theme.palette.primary.dark,
    lineHeight: '1.5rem',
    letterSpacing: '.2rem',
    fontWeight: '400',
  },
}));

const LogIn = () => {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const isSignedIn = useSelector(selectSignedIn)
  const profile = useSelector(selectProfile)
  React.useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(UPDATE_CARTOPEN('closed'))
    }, [])
  return (
    <main>
      <Paper component='section' className={classes.aboutContainer}>
        <Typography variant='h3' className={classes.title}>
          {!isSignedIn ? 'Login here' : 'Account Details'}
        </Typography>
        {isSignedIn ? <>
      <Greeting name={profile.username}/>
      <Counter name={profile.name}/> </>:  <></>}
      <Data />
      </Paper>
    </main>
  )
}

export default LogIn