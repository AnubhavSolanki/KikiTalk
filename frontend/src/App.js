import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Redirect } from 'react-router';
import Home from './components/home/home';
import Login from './components/authentication/login';
import Navbar from './components/navbar/navbar';

require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Switch>
          <Route path="/login"> <Login/> </Route>
          <Route path="/home"> <Home/> </Route>
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
