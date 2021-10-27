import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Redirect } from 'react-router';
import Login from './components/Auhentication/login';

require('dotenv').config();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login"> <Login/> </Route>
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
