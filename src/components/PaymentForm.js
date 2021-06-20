import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { selectCartSize, REMOVEALL } from '../dataSlice'
import { selectTotal } from '../dataSlice'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
    formContainer: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        width:'content',

    },
    labelText: {
        letterSpacing: '0.2rem',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        
        borderBottom: '1px solid grey',
        margin: '0',
    },
    outlined: {
        border: '1px solid grey',
        borderRadius: '.3rem',
        paddingLeft: '.2rem',
        
    },
    inputMargin: {
        marginBottom:'1rem',
    },
    finalText:{
        maxWidth: '18rem',
        padding:'.3rem',
        overflowWrap: 'break-word',
        textAlign:'center',
    },
    error:{
        color: 'red',
    }
}))
//validate credit card info, clear cart upon purchase.
const PaymentForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const cardnumber = React.useRef()
    const cardexp = React.useRef()
    const cardCVV = React.useRef()
    const cartSize = useSelector(selectCartSize)
    const totalCost = useSelector(selectTotal)
    const [input, setInput] = React.useState({cardNumber:'',cardExp:[],cardCVV:''})
    const [payState, setPayState] = React.useState({payment:'',text:'',cost:totalCost,})
    const handleSubmit = (e) => {
        e.preventDefault();
        const thisDate = new Date()
        if (input.cardNumber.length < 16){
            setPayState({payment:'error',text:'Please enter a valid credit card number.'})
            } else if(input.cardExp[0] < thisDate.getFullYear() || (input.cardExp[0] === thisDate.getFullYear() && input.cardExp[1] <= thisDate.getMonth()+1)){
                setPayState({...payState, payment:'error',text:'Your credit card might be invalid. Check the expiration date again.'})
            } else if(input.cardCVV.length < 3){
                setPayState({...payState, payment:'error',text:'Make sure to enter the card\'s CVV ( The three numbers on the back )'})
            } else {
                const costCopy = totalCost.slice(0)
                dispatch(REMOVEALL())
                setPayState({payment:'accepted',text:`Payment of $${costCopy} accepted. Your order has been placed.`, cost:costCopy})
            }

    }
    const cardUpdate = () => { if(!/\D/g.test(cardnumber.current.value) && (cardnumber.current.value.length < 17)){ setInput({...input, cardNumber:cardnumber.current.value})}}
    const expUpdate = () => {setInput({...input, cardExp:cardexp.current.value.toString().split('-')})}
    const CVVUpdate = () => { if(!/\D/g.test(cardCVV.current.value) && (cardCVV.current.value.length < 4)){ setInput({...input, cardCVV:cardCVV.current.value})} }

    return (
        
        <Paper component='form' className={classes.formContainer} onSubmit={handleSubmit} variant='outlined' >
            <p className={classes.labelText}>Total: ${payState.payment !== 'accepted' ? totalCost : payState.cost}. Pay below.</p>
            <FormControl className={classes.formControl}>
                <label htmlFor='cardNum' ></label>
                <Input required fullWidth={false} disableUnderline={true} autoFocus={false} value={input.cardNumber} className={`${classes.outlined} ${classes.inputMargin}`} placeholder='Card number'
            type='text'
            name='cardNum'
            id='cardNum'
            inputRef={cardnumber}
            onChange={cardUpdate}
            />
                </FormControl>
                <FormControl className={`${classes.formControl} ${classes.outlined}`}>
                <label htmlFor='cardExp' className={classes.labelText}>Card expiration date</label>
                <Input required fullWidth={false} disableUnderline={true} autoFocus={false} placeholder='Card number' className={classes.inputMargin}
            type='month'
            name='cardExp'
            id='cardExp'
            onChange={expUpdate}
            inputRef={cardexp}
            />
                </FormControl>
                <FormControl className={classes.formControl}>
                <label htmlFor='cardCVV' className={classes.labelNoMargin}></label>
                <Input required fullWidth={false} disableUnderline={true} autoFocus={false} value={input.cardCVV} className={`${classes.outlined} ${classes.inputMargin}`} placeholder='CVV (3 numbers on back)'
            type='text'
            name='cardCVV'
            id='cardCVV'
            inputRef={cardCVV}
            onChange={CVVUpdate}
            />
                </FormControl>
                <Button className={classes.buttonSubmit} disabled={cartSize === 0} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <p className={`${classes.finalText} ${payState.payment === 'error' ? classes.error : ''}`}>{payState.text}</p>
            </Paper>
    )
}

export default PaymentForm
