import { useEffect, useState } from "react"
import { getData, selectSignedIn } from "./profileSlice";
import {useDispatch, useSelector} from 'react-redux'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Data = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.profile.profile)
    const isSignedIn = useSelector(selectSignedIn)
    
    // const [user, setUser] = useState({
    //   name:'guest',
    //   email:'guest.gmail.com'
    // }
    // );
    // useEffect(()=>{
    //   if (userData){
    //     setUser(userData)
    //   }
    // },[userData])
  useEffect(()=>{
    console.log(userData)
    if(isSignedIn){
      navigate('/checkout')
    }
  },[isSignedIn])
    
    
  return (
    
    <div>
      <p>Sign in a user before proceeding to checkout:</p>

      <Button
          type="button"
          className="counter"
          onClick={() => dispatch(getData(1))}
        >
          User 1
        </Button>
        <Button
          type="button"
          className="counter"
          onClick={() => dispatch(getData(2))}
        >
          User 2
        </Button>
        <Button
          type="button"
          className="counter"
          onClick={() => dispatch(getData(3))}
        >
          User 3
        </Button>

        <Typography variant='h2'>User Data</Typography>
      {
        
        Object.entries(userData).map(([key,value]) => (
          (typeof value !== 'object') &&
          <p key={key}>{key}: {value}</p>
          
        ))
      
      

      }
      
    </div>
  )
}

export default Data