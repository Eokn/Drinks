import { useEffect, useState } from "react"
import { getData, selectProfile, selectSignedIn, SIGNOUT } from "./profileSlice";
import {useDispatch, useSelector} from 'react-redux'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { selectCartSize } from "../cart/cartSlice";
import { makeStyles } from "tss-react/mui";
import Paper from "@mui/material/Paper";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const useStyles = makeStyles()(theme => ({
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
    letterSpacing: '.075rem',
    fontWeight: '300',
    textAlign:'left',
    width:'50%',
    borderRight:'1px solid',
    borderColor: theme.palette.secondary.main,
  },
  dataHolder: {
    display:'flex',
    borderBottom:'1px solid',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
  },
  dataContainer: {
    border:'1px solid',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
  },
  darkColor: {
    color: theme.palette.primary.dark,
    letterSpacing: '.1rem',
    fontSize:'1.25rem',
  }
}));

  
  const Data = () => {
    
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(selectProfile)
    const isSignedIn = useSelector(selectSignedIn)
    const cartSize = useSelector(selectCartSize)

    function flattenObj(obj, prefix='', flattenedObj = {}) {
          Object.entries(obj).map(([key,value]) => {
            if(typeof value === 'object'){
              flattenObj(value, prefix=key, flattenedObj)

            }
          else {
              flattenedObj[`${key} ${prefix}`]=value 
              return
          }
        })
          return flattenedObj
        }

  function signInNavAway(x) {
    dispatch(getData(x))
    if (cartSize == 0){
      navigate('/');
    } else {
      navigate('/checkout');
    }
  }
    
    
  return (
    
    <main>
      {!isSignedIn ? 
      <>
      <Typography>Sign in before proceeding to checkout:</Typography> 
      <ButtonGroup color='primary' variant='contained'>

        <Button
          type="button"
          className="counter"
          onClick={() => signInNavAway(1)}
          >
          User 1
        </Button>
        <Button
          type="button"
          className="counter"
          onClick={() => signInNavAway(2)}
          >
          User 2
        </Button>
        <Button
          type="button"
          className="counter"
          onClick={() => signInNavAway(3)}
          >
          User 3
        </Button>
      </ButtonGroup>
      </>
      
      : <></>}
      
        
        

      

      {
        
        isSignedIn ?
        <>
        <Typography variant='h4'>User Data</Typography>
        <Paper className={classes.dataContainer} >
        {Object.entries(flattenObj(userData)).map(([key,value]) => (
          (typeof value !== 'object') &&
          <Paper className={classes.dataHolder} >
            <Typography className={classes.paragraphFiller} key={key}>{key}:</Typography>
            <Typography className={classes.paragraphFiller} key={key+value}>{value}</Typography>
          </Paper>
          
        ))}
      <Button 
          type="button"
          className={classes.darkColor}
          fullWidth
          color='primary' variant='contained'
          onClick={() => dispatch(SIGNOUT())}
          >
          Sign Out
          <ExitToAppIcon fontSize='large' className={classes.icon}/>
        </Button>
      </Paper>
      </>
         : <></>
        }


      
    </main>
  )
}

export default Data