import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import { UPDATE_FILTERVALUE, UPDATE_SEARCHTERM, selectFilteredDrinks, getData } from '../dataSlice'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles(theme => ({
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
}))
//Decide whether to query API based on current length of return from API
export default function SearchForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.data.searchTerm)
  const filterTerm = useSelector(state => state.data.filterTerm)
  const filteredDrinks = useSelector(selectFilteredDrinks)
  const searchValue = React.useRef()
  let skip = React.useRef(false)
  React.useEffect(() => {
    searchValue.current.focus()
      if (filteredDrinks.length > 0) {
        searchValue.current.value = filterTerm.length > searchTerm.length ? filterTerm : searchTerm;
        skip.current = true
      }
  }, [])
  React.useEffect(()=> {
    if (!skip.current) {
      dispatch(getData(searchTerm))
    } else {skip.current = false}
  },[dispatch, searchTerm])

  function searchDrink() {
    
    if(filteredDrinks.length === 25){
      dispatch(UPDATE_SEARCHTERM(searchValue.current.value))
    }
    else{
      if (searchValue.current.value.includes(searchTerm)) {
        dispatch(UPDATE_FILTERVALUE(searchValue.current.value))
      } else {
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
