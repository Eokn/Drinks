import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { UPDATE_CARTOPEN, selectCart } from '../dataSlice'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import {ADD_TO_CART, DECREASE, REMOVE} from '../dataSlice'
import PaymentForm from '../components/PaymentForm'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    checkoutContainer: {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '.5rem',
        margin: '6rem auto 1rem auto',
        width: '90%',
        letterSpacing: '0.2rem',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: theme.palette.primary.main,
    },
    listKey: {
        display: 'flex',
        justifyContent:'center',
    },
    imgName:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',

        width: '25%',
    },
    name:{
        marginBottom: '3px',
        color: theme.palette.primary.main,
        
    },
    image:{
        width:'50%',
        marginTop: '3px',
    },
    textSpace:{
        width:'25%',
        textAlign:'center',
    },
    textSpaceStart:{
        width:'25%',
        textAlign:'start',
    },
    buttonCheckout: {
        backgroundColor: '#dad',
        marginBottom:'0.8rem',
    },
    centered: {
        marginBottom: '0.4rem',
        paddingTop: '0.4rem',

    },
    backContainer:{

        textAlign:'center',
    },
    amntContainer:{
        width:'25%',
        display:'flex',

        justifyContent:'center',
    },
    marginFix:{
        margin:'auto 0',
    },
    marginFixRight:{
        margin:'auto'
    },
    lastListItem:{
        justifyContent:'center'
    },
    paymentContainer:{
        backgroundColor: '#dad',
        padding: '.3rem',
    },
}))
//map out the cart's contents along with their price and methods to add subtract and remove them from cart, show total and paymentform.
const Checkout = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const cart = useSelector(selectCart)
    React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(UPDATE_CARTOPEN('closed'))
  }, [pathname])
    return (
        <Container maxWidth='md' component='main' className={classes.checkoutContainer}>
            <List className={classes.productList}>
                <ListItem divider className={classes.listKey}><span className={classes.textSpaceStart}>Item</span><span className={classes.textSpace}>Price</span><span className={classes.textSpace}>Amount</span><span className={classes.textSpace}>Subtotal</span></ListItem>
            {cart.map(item => 
            {const {image, name, id, category, ingredients, amount} = item; return <ListItem key={item.id} divider dense disableGutters className={classes.listKey}>
                <div className={classes.imgName}>
                <img src={`${image}/preview`} alt={name} className={classes.image}/>
                <p className={classes.name}>{`${name} (${category})`}</p>
            </div>
            <p className={classes.textSpace}>{`$${((ingredients.filter(x=>x!==null).length*200 - 1)/100).toFixed(2)}`}</p>
                <div className={classes.amntContainer}>
                    
                    <IconButton color='primary' onClick={()=>dispatch(DECREASE({name,id}))}>
                        <RemoveIcon/>
                    </IconButton>
                    <p className={classes.marginFix}>{amount}</p>
                    <IconButton color='primary' onClick={()=>dispatch(ADD_TO_CART({name,id}))}>
                        <AddIcon/>
                    </IconButton>
                </div>
                <div className={`${classes.textSpace} ${classes.listKey}`}>
                    <p className={classes.marginFixRight}>${(amount*((ingredients.filter(x=>x!==null).length*200 - 1)/100)).toFixed(2)}</p>
                <IconButton color='primary' size='small'  onClick={()=>dispatch(REMOVE({name,id}))}>
                    <CloseIcon />
                </IconButton>
                </div>
                </ListItem>
                })}
            <ListItem className={classes.lastListItem}>
                <Card variant='outlined' className={classes.paymentContainer}><PaymentForm /></Card>
            </ListItem>
            {cart.length === 0 ? <div className={classes.backContainer}><p className={classes.centered}>cart empty.</p><Button component={Link} to='/' className={classes.buttonCheckout} variant='outlined'><SubdirectoryArrowRightIcon color='primary' />Back to store</Button></div> : ''}
            </List>
        </Container>
    )
}

export default Checkout
