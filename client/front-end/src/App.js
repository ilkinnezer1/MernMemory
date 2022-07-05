import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from "./components/Nav Panel/Navbar"
import MainComponents from './components/MainComponent/MainComponents';
import Auth from './components/Auth/Auth';
import About from './components/About/About';
import ScrollToTop from './components/ScrollToTop';
import "./App.css"
import PostDetails from './components/Details/PostDetails';


const App = () => {

  //Checking the existence of user to remove directing auth page 
  const user = JSON.parse(localStorage.getItem("profile"))
  return (
    <div className="App">
      <Router>  
        <ScrollToTop/> 
        <Navbar/>  
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/posts"/>}/>
        <Route path="/posts" component={MainComponents}/>
        <Route path="/posts/search" component={MainComponents}/>
        <Route path="/auth" exact component={!user ? Auth : <Redirect to="/"/>}/>
        <Route path= "/aboutus" component={About}/>
        <Route path="/details/:id" component={user ? PostDetails : <Redirect to="/posts"/>}/>
     
      </Switch>
      </Router>
    </div>
  );
}

export default App;
