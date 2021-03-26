import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    Button,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    CssBaseline,
    Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import Home from '../Home';
import About from '../About';
import Login from '../Login';

import AuthService from "../../services/auth.service";
import Exp from "../exp/exp";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        marginRight: "auto"
    },
    drawer: {
        width: 250
    },
    content: {
        padding: theme.spacing(3)
    }
}));

const NavAppBar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [showModeratorBoard, setshowModeratorBoard] = useState(false);
    const [showAdminBoard, setshowAdminBoard] = useState(false);
    const [currentUser, setcurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setcurrentUser(user);
            setshowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setshowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
        }
    });

    function logout() {
        AuthService.logout();
    }

    return (
        <Router>
            <div>
                <CssBaseline />
                <Drawer open={open} onClose={() => setOpen(false)}>
                    <List disablePadding className={classes.drawer} onMouseLeave={() => setOpen(false)}>
                        <ListItem button>
                            <Button color='inherit' component={Link} to="/">Home</Button>
                        </ListItem>
                        {showModeratorBoard && (
                            <ListItem button>
                                <Button color='inherit' component={Link} to="/mod">Moderator</Button>
                            </ListItem>
                        )}
                        {showAdminBoard && (
                            <ListItem button>
                                <Button color='inherit' component={Link} to="/admin">Admin</Button>
                            </ListItem>
                        )}
                        {currentUser && (
                            <ListItem button>
                                <Button color='inherit' component={Link} to="/user">User</Button>
                            </ListItem>
                        )}
                        <Divider />
                        {currentUser && (
                            <ListItem button>
                                <Button color='inherit' component={Link} to="/exp">Expnenses</Button>
                            </ListItem>
                        )}
                    </List>
                </Drawer>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            onMouseEnter={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            ANJAN
          </Typography>
                        {currentUser ? (
                            <Button color="inherit" href="/login" onClick={logout}>{currentUser.username}</Button>
                        ) : (
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                        )}

                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/login" component={Login} />
                        <Route path="/exp" component={Exp} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default NavAppBar;