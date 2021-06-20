import React from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>({
  errContainer:{
    margin: '10rem auto 0 auto',
    backgroundColor: theme.palette.secondary.main,
    width:'80%',
    maxWidth:'35rem',
    padding: '1rem',
    textAlign: 'center',
  },
  errHeading:{
    textTransform: 'capitalize',
    letterSpacing: '.2rem',
    marginBottom: '1rem',
  }
}))

export default function Error() {
  const classes = useStyles()
  return (
    <Card component='section' className={classes.errContainer}>

        <h1 className={classes.errHeading}>oops! it's a dead end</h1>
        <Button component={Link} to="/" color='primary' variant='contained'>
          <SubdirectoryArrowRightIcon color='white' />back home
        </Button>

    </Card>
  );
}
