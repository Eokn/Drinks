import React from 'react'
import FormControl from '@mui/material/FormControl'
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper'
import Input from '@mui/material/Input'
import { UPDATE_FILTERVALUE, UPDATE_SEARCHTERM, selectFilteredDrinks, getDrinks } from '../features/listSlice';
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles()(theme => ({
  formControl: {
      display:'flex',
      alignItems: 'center',
      textTransform:'capitalize',
  },
  paperForm: {
    backgroundColor: theme.palette.secondary.main,
    padding:'2rem',
  },
  labelStyles: {
    letterSpacing: '.2rem',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  inputStyles: {
    borderRadius: '.2rem',
    padding: '0 .3rem',
    backgroundColor: 'white',
    fontSize: '1.2rem',
  },
  searchContainer:{
    width:'85%',
    maxWidth:'40rem',
    margin: '10rem auto 0 auto',
  }
}));
//Decide whether to query API based on current length of return from API
export default function SearchForm() {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.drinks.searchTerm)
  const filterTerm = useSelector(state => state.drinks.filterTerm)
  const filteredDrinks = useSelector(selectFilteredDrinks)
  const searchValue = React.useRef()
  let skip = React.useRef(false)

  //runs once upon entry into homepage to prevent excess api call, save previous call for user
  React.useEffect(() => {
    searchValue.current.focus()
      if (filteredDrinks.length > 0) {
        searchValue.current.value = filterTerm.length > searchTerm.length ? filterTerm : searchTerm;
        skip.current = true
      }
  }, [])

  //if not re-entering page, act as normal with api calls.
  React.useEffect(()=> {
    console.log('this is where i ended up useeffect2', !skip.current, searchTerm)
    if (!skip.current && searchTerm) {
      dispatch(getDrinks(searchTerm))
      console.log('this is where i ended upwasd', filteredDrinks, skip.current, searchTerm)
    } else {skip.current = false}
  },[dispatch, searchTerm])


  //logic for deciding whether or not to update searchterm or filtervalue
  //for purposes of triggering/re-triggering a fetch request
  function searchDrink() {
    //api returns maximum of 25. This means it is possible to not see desired item even if max return
    //leading to a re-trigger of fetch via updating the searchTerm.
    if(filteredDrinks.length === 25){
      dispatch(UPDATE_SEARCHTERM(searchValue.current.value))
    }
    //filteredDrinks value 0-24, meaning we need to differentiate whether or not to
    //call API, in the case where our input of searchValue has a smaller output
    else{
      if (searchValue.current.value.includes(searchTerm) && searchTerm) {
        //we set a filter instead of the searchterm.
        dispatch(UPDATE_FILTERVALUE(searchValue.current.value))
      } else {
        //when we have a large output, or are just starting to type, call the API.
        dispatch(UPDATE_FILTERVALUE(''))
        dispatch(UPDATE_SEARCHTERM(searchValue.current.value))
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <section component='section' className={classes.searchContainer}>
      <Paper component='form' className={classes.paperForm}  onSubmit={handleSubmit} variant='outlined' >
        <FormControl className={classes.formControl}>
          <label htmlFor='name' className={classes.labelStyles}>search your favorite Drink</label>
          <Input fullWidth={true} disableUnderline={true} autoFocus={true} className={classes.inputStyles} 
            type='text'
            name='name'
            id='name'
            inputRef={searchValue}
            onChange={searchDrink}
          />
        </FormControl>
      </Paper>
    </section>
  )
}
