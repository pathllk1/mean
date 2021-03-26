import { React, useState, useEffect } from 'react'
import JqxGrid, { jqx } from '../../assets/jqwidgets-react/react_jqxgrid';
import { Grid, Paper, TextField, Typography, makeStyles, Button, Avatar, Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 20,
        height: '80vh',
        width: 1080,
        margin: '20px auto'
    },
    snack: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

const Exp = () => {
    const classes = useStyles();

    const source = {
        datafields: [
            { name: 'username', type: 'string' },
            { name: 'email', type: 'string' }
        ],
        datatype: 'json',
        url: '/.netlify/functions/api/admin/get_all_user'
    };

    const dataAdapter = new jqx.dataAdapter(source);
    return (
        <div>
            <JqxGrid
                        width={'1050px'} height={"100%"} columns={
                            [
                                { text: 'User Name', datafield: 'username', width: 250 },
                                { text: 'Email', datafield: 'email', cellsalign: 'right', align: 'right' }
                            ]
                        }
                        source={dataAdapter}
                    />
        </div>
    )
}

export default Exp

