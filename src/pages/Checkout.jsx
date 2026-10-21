import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import { makeStyles } from 'tss-react/mui';
import PaymentForm from '../features/cart/PaymentForm'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { ADD_TO_CART, DECREASE, REMOVE, selectCart, UPDATE_CARTOPEN } from '../features/cart/cartSlice'
import Paper from '@mui/material/Paper'


const useStyles = makeStyles()((theme) => ({
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
        padding: '.5em 0',
        justifyContent:'flex-start',
    },
    imgName:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRight:'2px solid',
        borderColor: theme.palette.secondary.main,
        width: '25%',
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,    
        textDecoration:'none',
        '&:hover':{
            textDecoration:'underline',
        }
    },
    name:{
        marginBottom: '3px',
        color: theme.palette.primary.main,
        marginRight:'auto',
        overflow:'hidden',
        
    },
    image:{
        width:'50%',
        marginTop: '3px',
    },
    textSpace:{
        width:'25%',
        textAlign:'center',
        alignSelf:'stretch',
        justifyContent:'center',
        alignContent:'center',
        borderRight:'2px solid',
        marginLeft:'.4rem',
        
    },
    textSpaceStart:{
        width:'25%',
        textAlign:'start',
        borderRight:'2px solid',
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

        alignSelf:'stretch',
        borderRight:'2px solid',
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
}));
//map out the cart's contents along with their price and methods to add subtract and remove them from cart, show total and paymentform.
const Checkout = () => {
    const { classes } = useStyles()
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
                <Paper component={Link} color='secondary' className={classes.imgName} to={`/drink/${id}`}>
                <img src={`${image}/preview`} alt={name} className={classes.image}/>
                <p className={classes.name}>{`${name}`}</p>
            </Paper>
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
                <Card variant='outlined' className={classes.paymentContainer}>
                    <PaymentForm />
                </Card>
            </ListItem>
            {cart.length === 0 ? <div className={classes.backContainer}><p className={classes.centered}>cart empty.</p><Button component={Link} to='/' className={classes.buttonCheckout} variant='outlined'><SubdirectoryArrowRightIcon color='primary' />Back to store</Button></div> : ''}
            </List>
        </Container>
    )
}

export default Checkout
