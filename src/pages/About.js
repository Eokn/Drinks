import React from "react";
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(theme => ({
  aboutContainer: {
    width:'80%',
    maxWidth:'40rem',
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem',
    margin: '10rem auto 0 auto',
  },
  title: {
      fontSize: '2rem',
  textTransform: 'capitalize',
  letterSpacing: '0.2rem',
  textAlign: 'center',
  marginBottom: '3.5rem',
  marginTop: '1rem',
  color: theme.palette.primary.dark,
  },
  paragraphFiller: {
    color: theme.palette.primary.dark,
    lineHeight: '1.5rem',
    letterSpacing: '.2rem',
    fontWeight: '400',
  },
}))

export default function About() {
  const classes = useStyles()
  return (
    <Card component='section' className={classes.aboutContainer}>
      <Typography variant='h5' component='h1' className={classes.title}>about us</Typography>
      <Typography variant='body2' component='p' className={classes.paragraphFiller}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        repudiandae architecto qui adipisci in officiis, aperiam sequi atque
        perferendis eos, autem maiores nisi saepe quisquam hic odio consectetur
        nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione
        hic aspernatur error blanditiis?
      </Typography>
    </Card>
  );
}
