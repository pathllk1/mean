import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import About from './pages/About';
import Home from "./pages/Home";
import NavAppBar from './pages/layout/nav';
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div>
        <NavAppBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
