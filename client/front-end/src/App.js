import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Nav Panel/Navbar"
import MainComponents from './components/MainComponent/MainComponents';
import Auth from './components/Auth/Auth';




const App = () => {


  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={MainComponents}/>
        <Route path="/auth" exact component={Auth}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
