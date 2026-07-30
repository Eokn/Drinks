import { useEffect, useState } from "react"
import { getData } from "../dataSlice";
import {useDispatch, useSelector} from 'react-redux'

const Data = ( { name, userId }) => {

    const dispatch = useDispatch()
    const userData = useSelector((state) => state.data.profile)
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

    
    
  return (
    
    <div>
      <p>Get data for user:</p>

      <button
          type="button"
          className="counter"
          onClick={() => dispatch(getData(1))}
        >
          1
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => dispatch(getData(2))}
        >
          2
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => dispatch(getData(3))}
        >
          3
        </button>
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