import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import IconButton from '@mui/material/IconButton'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import { makeStyles } from 'tss-react/mui';

import { selectCartOpen, selectCartSize, UPDATE_CARTOPEN } from '../features/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles()(theme => ({
  root: {
    paddingLeft: '.5rem',
    letterSpacing: '.1rem',
  },
  test: {
    height: '4rem',
    justifyContent: 'center',
    borderBottom: '2px solid #eeeeee',
  },
  darkPrimary: {
    color: theme.palette.primary.main,
  },
  toolbarStyles: {
    justifyContent: 'space-between',
  },
  icon: {
    margin: 'auto 5px',
  },
  badge: {
    color: theme.palette.primary.dark,
  },
}))
//nav links, toggle cart visibility.
export default function Navbar() {
  const dispatch = useDispatch()
  const { classes } = useStyles()
  const cartSize = useSelector(selectCartSize)
  const cartOpen = useSelector(selectCartOpen)
  
return (
    <AppBar position='sticky' color='secondary' className={classes.test}>
      <Toolbar className={classes.toolbarStyles} disableGutters>
        <Button component={Link} to='/' variant='contained' color='secondary' >

              <LocalBarIcon fontSize='large' className={classes.darkPrimary} />
              <Typography variant='h6' component='h2' className={`${classes.root} ${classes.darkPrimary}`}>Drinks</Typography>

        </Button>
        <div>
          <ButtonGroup  component='nav' color='secondary' variant='contained' size='large'>
          
            <Button component={Link} to='/'>home</Button>
          
            <Button component={Link} to='/about'>about</Button>
          
        </ButtonGroup>
        <IconButton className={classes.icon} onClick={()=>{cartOpen ? dispatch(UPDATE_CARTOPEN('closed')) : dispatch(UPDATE_CARTOPEN('open'))}}>
          <Badge badgeContent={cartSize} className={classes.badge} color='primary'>
            <ShoppingCartIcon fontSize='large' className={classes.darkPrimary}/>
          </Badge>
        </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}