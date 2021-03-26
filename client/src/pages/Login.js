
import { React, useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography, makeStyles, Button, Avatar, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';

import AuthService from "../services/auth.service";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paperStyle: {
        padding: 20,
        height: '60vh',
        width: 380,
        margin: '20px auto'
    },
    snack: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));



const Login = () => {
    const classes = useStyles();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [message, setmessage] = useState('');
    const [currentUser, setcurrentUser] = useState(undefined);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setcurrentUser(user);
        }
    });


    function onSubmit(e) {
        e.preventDefault()//blocks the postback event of the page
        AuthService.login(username, password).then(
            () => {
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setmessage(resMessage);
                handleClick();
            }
        );
    }
    return (
        <Grid>
            {currentUser ? (
                <Paper elevation={10} style={{ padding: 20, margin: '20px auto', width: 380, height: '10vh' }}>
                    <h3 align='center'>Logged in as {currentUser.username}</h3>
                </Paper>
            ) : (
                <Paper elevation={10} className={classes.paperStyle}>
                    <Grid align='center'>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Sign in</Typography>
                        <form className={classes.form} noValidate onSubmit={onSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={e => setusername(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setpassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
          </Button>
                        </form>
                    </Grid>
                </Paper>
            )}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
        </Alert>
            </Snackbar>
        </Grid>

    )
}

export default Login
