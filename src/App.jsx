// import Counter from './components/Counter'
// import Greeting from './components/Greeting'
// // import Data from './components/Data'
// import './App.css'
// import TourCard from './components/TourCard'
// import Container from '@mui/material/Container'
// import Grid from '@mui/material/Grid'
      //     <Greeting name='here is where you put something' />
        
      // <Counter name='me' />
      
      // <section id="next-steps">
      //   <Data name='name of the user' userId={"nah"} />
        
      // </section>

      // <section id="spacer"></section>
import {ThemeProvider , createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/NavBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#e1bee7',
    },
  },
  
});




function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="about" element={ <About /> } />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

{/* <Route path="/drink/:id">
          <SingleDrink />
        </Route>
        <Route path='/checkout'>
          <Checkout />
        </Route>
        <Route path="*">
          <Error />
        </Route> */}


export default App
