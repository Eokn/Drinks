import React from 'react'
import ListItem from '@mui/material/ListItem'
import { useDispatch } from 'react-redux'
import { makeStyles } from 'tss-react/mui';
import {ADD_TO_CART, DECREASE, REMOVE} from './cartSlice'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles()((theme) => ({
    imgName:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        borderRadius: '3px',
        width: 'content',
    },
    name:{
        marginBottom: '3px',
        width:'90%',
        textAlign:'center',
        color: theme.palette.primary.main,
    },
    image:{
        width:'50%',
        marginTop: '3px',
    },
    listItem:{
        backgroundColor: '#dad',
        borderBottom:'1px solid black',
    },
    priceArea:{
        margin:'3px auto',
        display:'flex',
        flexDirection:'column',
        alignSelf:'center',
    },
    priceText:{
        marginBottom: '3px',
        width:'90%',
        textAlign:'right',
        color: theme.palette.primary.main,
    },
    moveUp: {
        marginTop:'-8px'
    }
}));
// destructure the drink passed in for info, arbitrary price assignment based on number of ingredients.
const CartItem = ({image, name, id, category, ingredients, amount}) => {
    const dispatch = useDispatch()
    const { classes } = useStyles()
    const price = ((ingredients.filter(x=>x!=null).length * 200)-1)/100
    return (
        <ListItem alignItems='flex-start' disableGutters className={classes.listItem}>
            <div className={classes.imgName}>
                <img src={`${image}/preview`} alt={name} className={classes.image}/>
                <p className={classes.name}>{`${name} (${category})`}</p>
            </div>
            <div className={classes.priceArea}>
                <div>
                    
                    <IconButton onClick={()=>dispatch(DECREASE({name,id}))}>
                        <RemoveIcon/>
                    </IconButton>
                    <IconButton onClick={()=>dispatch(ADD_TO_CART({name,id}))}>
                        <AddIcon/>
                    </IconButton>
                </div>
                <p className={classes.priceText}>{`$${price}`}</p>
                <p className={classes.priceText}>{`X${amount}`}</p>
                <hr/>
                <p className={classes.priceText}>{`$${(price*amount).toFixed(2)}`}</p>
            </div>
            <IconButton size='small' className={classes.moveUp} onClick={()=>dispatch(REMOVE({name,id}))}>
                <CloseIcon  fontSize='large' color='primary'/>
            </IconButton>
        </ListItem>
    )
}

export default CartItem
