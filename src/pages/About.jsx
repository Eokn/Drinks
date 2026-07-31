import React from "react";
import Typography from '@mui/material/Typography'
import { makeStyles } from 'tss-react/mui';
import Card from '@mui/material/Card'

const useStyles = makeStyles()(theme => ({
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
}));

export default function About() {
  const { classes } = useStyles()
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
















// import React from 'react'
// import Greeting from '../features/profile/Greeting'
// import Counter from '../features/profile/Counter'
// import Data from '../features/profile/Data'
// import { Link } from 'react-router-dom'
// const About = () => {
//   return (
//     <main>About
//       <Greeting />
//       <Counter />
//       <Data />
      

//       <Link to='/'>Link to the Home page!</Link>
//     </main>
//   )
// }

// export default About