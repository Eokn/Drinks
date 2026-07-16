// import Counter from './components/Counter'
// import Greeting from './components/Greeting'
// // import Data from './components/Data'
// import './App.css'
import TourCard from './components/TourCard'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
      //     <Greeting name='here is where you put something' />
        
      // <Counter name='me' />
      
      // <section id="next-steps">
      //   <Data name='name of the user' userId={"nah"} />
        
      // </section>

      // <section id="spacer"></section>








function App() {
  
  return (
    <div>
      
      <Container>
        <Grid container spacing={5}>

        <TourCard/>
        <TourCard/>
        <TourCard/>
        <TourCard/>
        </Grid>
      
      </Container>





    </div>
  )
}

export default App
