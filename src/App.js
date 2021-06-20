import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SingleDrink from "./pages/SingleDrink";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import CartWindow from './components/CartWindow'
import Navbar from "./components/Navbar";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

const theme = createMuiTheme({
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
  const cartVisible = useSelector(state => state.data.cartOpen === 'open')
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Navbar />
      {cartVisible ? <CartWindow /> : ''}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/drink/:id">
          <SingleDrink />
        </Route>
        <Route path='/checkout'>
          <Checkout />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

export default App;
