import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '../Home';
import About from '../about';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router>
                <AppBar position="static" color='secondary'>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            ANJAN
          </Typography>
                        <Link to="/" color="inherit">Home</Link>
                        <Link to="/about" color="inherit">About</Link>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                <Route path="/"><Home/></Route>
                <Route path="/about"><About/></Route>
                </Switch>
            </Router>
        </div>
    );
}
