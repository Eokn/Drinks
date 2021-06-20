import React from 'react'
import Drink from './Drink'
import Loading from './Loading'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { selectLoading, selectFilteredDrinks } from '../dataSlice'
import { useSelector } from 'react-redux'
const useStyles = makeStyles({

  sectionTitle: {
    marginBottom:'3rem',
    marginTop:'5rem',
    textAlign:'center',
    letterSpacing:'.2rem',
    color:'#eeeeee',
  },
  gridCardContainer: {
    width: '90%',
    margin: '0 auto',
  },
  wholeListContainer: {
    margin:'0',
  },

})
// if conditions present, map filteredDrinks into Drink components.
export default function DrinkList() {
  const loading = useSelector(selectLoading)
  const filteredDrinks = useSelector(selectFilteredDrinks)
  const classes = useStyles()
  if (loading) {
    return <Loading/>
  }
  if (filteredDrinks.length < 1) {
    return (
      <Typography variant='h3' component='h2' className={classes.sectionTitle}>
        No drinks matched your search criteria
      </Typography>
    )
  }
  return (
    <section className={classes.wholeListContainer}>
      <Typography variant='h3' className={classes.sectionTitle}>Drinks</Typography>
      <Grid container alignContent='center' className={classes.gridCardContainer} spacing={4} >
        {filteredDrinks.map((item) => {
          return <Drink key={item.id} {...item} />
        })}
      </Grid>
    </section>
  )
}
