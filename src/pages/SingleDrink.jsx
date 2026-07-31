import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleDrink, selectLoading, selectSingleDrink } from '../features/list/listSlice';
import { ADD_TO_CART } from '../features/cart/cartSlice';

const useStyles = makeStyles()(theme => ({
  drinkContainer: {
    margin: '8rem auto 0 auto',
    textAlign: 'center',
    width: '85%',
    maxWidth: '40rem',
  },
  buttonStyles: {
    letterSpacing: '0.2rem',
    color: theme.palette.primary.dark,
    margin: '1rem auto',


  },
  infoContainer:{
    width:'100%',
    margin: '0 auto',
  },
  drinkName: {
    marginBottom:'3rem',
    marginTop:'2rem',
    textAlign:'center',
    letterSpacing:'.2rem',
    color:'#eeeeee',
  },
  drinkImg: {
    width:'100%',
    display: 'block',
  },
  infoSection: {
    marginTop: '2rem',
    textAlign: 'left',
  },
  infoMargin: {
    marginBottom: '1rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: '1.5',
    color: 'white',
  },
  infoHeading: {
    marginRight: '0.5rem',
    background: theme.palette.secondary.main,
    padding: '0.25rem 0.5rem',
    borderRadius: '.2rem',
    color: 'black',
  },
}));
//get specific drink's data if it isn't already in the state, show data and buttons to add to cart/return home.
export default function SingleDrink() {

  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  const { classes } = useStyles()
  const { id } = useParams()
  const drinkInQuestion = useSelector(x => selectSingleDrink(x,id))
  const dispatch = useDispatch()

  const loading = useSelector(selectLoading)
//problem = the id array for entities is not the same as the returned drink id used to search for it.
  React.useEffect(() => {
    if(!drinkInQuestion){
      dispatch(getSingleDrink(id))
  }}, [id, drinkInQuestion])
  if (loading) {
    return <Loading/>
  }
  if (!drinkInQuestion) {
    return <h2 className={classes.drinkName}>no drink to display</h2>
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = drinkInQuestion
    return (
      
      <section className={classes.drinkContainer}>
        <Button component={Link} to='/' className={classes.buttonStyles} color='secondary' variant='contained'>
          back home
        </Button>
        <Typography variant='h4' component='h2' className={classes.drinkName}>{name}</Typography>
        <div className={classes.infoContainer}>
          <img src={image} alt={name} className={classes.drinkImg}/>
          <Button className={classes.buttonStyles} color='secondary' variant='contained' onClick={()=>{dispatch(ADD_TO_CART(drinkInQuestion))}}>
            Add to cart
          </Button>
          <div className={classes.infoSection}>
            <p className={classes.infoMargin}>
              <span className={classes.infoHeading}>name :</span> {name}
            </p>
            <p className={classes.infoMargin}>
              <span className={classes.infoHeading}>category :</span> {category}
            </p>
            <p className={classes.infoMargin}>
              <span className={classes.infoHeading}>info :</span> {info}
            </p>
            <p className={classes.infoMargin}>
              <span className={classes.infoHeading}>glass :</span> {glass}
            </p>
            <p className={classes.infoMargin}>
              <span className={classes.infoHeading}>instructons :</span> {instructions}
            </p>
            <p className={classes.infoMargin}>
              <span className={classes.infoHeading}>ingredients :</span>
              {ingredients.map((item, index) => 
                item ? <span key={index}> {item}</span> : null
              )}
            </p>
          </div>
        </div>
      </section>
    )
  }
}
