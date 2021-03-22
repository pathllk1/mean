import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import About from "./pages/about";
import Home from "./pages/Home";
import NavAppBar from './pages/layout/nav';

function App() {
  return (
    <div className="App">
      <NavAppBar />
    </div>
  );
}

export default App;
