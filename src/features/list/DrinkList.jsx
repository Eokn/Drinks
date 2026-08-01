import React from 'react'
import Drink from './Drink'
import Loading from '../../components/Loading'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { makeStyles } from 'tss-react/mui';
import { selectLoading, selectFilteredDrinks } from './listSlice'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card'
const useStyles = makeStyles() (theme => ({

  noDrinksContainer: {
    width:'80%',
    maxWidth:'40rem',
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem',
    margin: '10rem auto 0 auto',
  },
  sectionTitle: {
    marginBottom:'3rem',
    marginTop:'5rem',
    textAlign:'center',
    letterSpacing:'.2rem',
  },
  gridCardContainer: {
    width: '90%',
    margin: '0 auto',
  },
  wholeListContainer: {
    margin:'0',
  },

}));
// if conditions present, map filteredDrinks into Drink components.
export default function DrinkList() {
  const loading = useSelector(selectLoading)
  const filteredDrinks = useSelector(selectFilteredDrinks)
  const searchTerm = useSelector(state => state.drinks.searchTerm)
  const { classes } = useStyles()
  if (loading) {
    return <Loading/>
  }
  if (filteredDrinks.length < 1 && searchTerm.length > 0) {
    return (
      
      <Card component='section' className={classes.noDrinksContainer}>

      
      <Typography variant='h3' component='h2' className={classes.sectionTitle}>
        No drinks matched your search
      </Typography>
      </Card>
    )
  }
  return (
    <section className={classes.wholeListContainer}>
      {/* <Typography variant='h3' className={classes.sectionTitle}>Drinks</Typography> */}
      <Grid container alignContent='center' className={classes.gridCardContainer} spacing={4} >
        {filteredDrinks.map((item) => {
          return <Drink key={item.id} {...item} />
        })}
      </Grid>
    </section>
  )
}
