import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme=>({
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
}));

export default function Error() {
  const { classes } = useStyles()
  return (
    <Card component='section' className={classes.errContainer}>

        <h1 className={classes.errHeading}>oops! it's a dead end</h1>
        <Button component={Link} to="/" color='primary' variant='contained'>
          <SubdirectoryArrowRightIcon color='white' />back home
        </Button>

    </Card>
  );
}
