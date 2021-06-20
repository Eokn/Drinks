import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../dataSlice'

const useStyles = makeStyles({
  colorSecondary: {
    backgroundColor: '#e1bee7'
  },
  btnStyles: {
    letterSpacing: '.2rem',
  },
  btnContainer: {
    display: 'flex',
    justifyContent:'space-between',
  },
  imgStyles: {
    width: '100%',
    display: 'block',
  },
  drinkInfo: {
    padding: '1.5rem',
  },
  drinkDesc: {
    marginBottom: '.2rem',
  },
  drinkHeader:{
    fontSize: '2rem',
  }

})
// destructure for info, pass object into add to cart action if buy clicked.
export default function Drink({ image, name, id, info, glass, category, instructions, ingredients, amount }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const thisItem = { image, name, id, info, glass, category, instructions, ingredients, amount }
  return (
    <Grid item component='article' xs={12} sm={6} md={4} >
      <Card className={classes.colorSecondary}>
        <div >
        <img src={image} alt={name} className={classes.imgStyles}/>
      </div>
      <div className={classes.drinkInfo}>
        <h3 className={`${classes.drinkHeader} ${classes.drinkDesc}`}>{name}</h3>
        <h4 className={classes.drinkDesc}>{glass}</h4>
        <p className={classes.drinkDesc}>{info}</p>
        <div className={classes.btnContainer}>
          <Button component={Link} color='primary' variant='contained' to={`/drink/${id}`} className={classes.btnStyles}>
          details
        </Button>
        <Button color='primary' variant='contained' className={classes.btnStyles} onClick={()=>{dispatch(ADD_TO_CART(thisItem))}}>
          buy
        </Button>
        </div>
      </div>
      </Card>
    </Grid>
  )
}
