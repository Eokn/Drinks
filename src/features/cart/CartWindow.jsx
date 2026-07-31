import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import { selectCart, selectTotal } from './cartSlice'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import CartItem from './CartItem'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { selectSignedIn } from '../profile/profileSlice';

const useStyles = makeStyles()((theme) => ({
    listStyles:{
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.secondary.light,
        position: 'fixed',
        right: '0',
        top:'4rem',
        overflow: 'auto',
        maxHeight: 300,
        border: '2px solid #eeeeee',
        borderRadius: '0px 0px 0px 5px',
        zIndex: '1',
        '&::-webkit-scrollbar': {
            width: '0.5em',
        },
        '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        },
    },
    centered:{
        textAlign:'center',
        margin: '0 auto',
        textTransform: 'capitalize',
        textDecoration: 'underline',
        letterSpacing: '0.2rem',
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    totalContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        wrap: 'nowrap',
        alignItems: 'center',
        width: '100%',
        marginTop: '0.5rem',
    },
    buttonCheckout: {
        backgroundColor: '#dad',

    }
}));
//map cart array to cart items, show navigation to checkout if cart has something in it.
const CartWindow = () => {
    const { classes } = useStyles()
    const cart = useSelector(selectCart)
    const total = useSelector(selectTotal)
    const signedIn = useSelector(selectSignedIn)
    console.log(signedIn)
    return (
        <List className={classes.listStyles}>

            {cart.map(item => 
            {return <CartItem key={item.id} {...item}/>})}
            {cart.length > 0 ? <ListItem>
                <div className={classes.totalContainer}>
                    <p className={classes.centered}>
                        Total: ${total}</p>
                    <Button component={Link} to={signedIn ? '/checkout' : '/login'} className={classes.buttonCheckout} variant='outlined'>
                    <SubdirectoryArrowRightIcon color='primary' />To Checkout</Button></div>
            </ListItem> : <p className={classes.centered}>Add some items!</p>}
        </List>
    )
}

export default CartWindow
