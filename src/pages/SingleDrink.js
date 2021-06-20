import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../dataSlice'

const useStyles = makeStyles(theme => ({
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
}))
//get specific drink's data if it isn't already in the state, show data and buttons to add to cart/return home.
export default function SingleDrink() {

  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  const classes = useStyles()
  const { id } = useParams()
  const drinkInQuestion = useSelector(state => state.data.entities[id])
  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)
  const [drink, setDrink] = React.useState(drinkInQuestion)

  React.useEffect(() => {
    if(!drinkInQuestion){
    setLoading(true)
    async function getDrink() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        const data = await response.json()
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newDrink = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
            amount:1,
          }
          setDrink(newDrink)
        } else {
          setDrink(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getDrink()
  }}, [id, drinkInQuestion])
  if (loading) {
    return <Loading/>
  }
  if (!drink) {
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
    } = drink
    return (
      
      <section className={classes.drinkContainer}>
        <Button component={Link} to='/' className={classes.buttonStyles} color='secondary' variant='contained'>
          back home
        </Button>
        <Typography variant='h4' component='h2' className={classes.drinkName}>{name}</Typography>
        <div className={classes.infoContainer}>
          <img src={image} alt={name} className={classes.drinkImg}/>
          <Button className={classes.buttonStyles} color='secondary' variant='contained' onClick={()=>{dispatch(ADD_TO_CART(drink))}}>
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
