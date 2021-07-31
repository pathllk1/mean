import { React, useState, useEffect } from 'react'
import { Grid, Paper, TextField, Typography, makeStyles, Button, Avatar, Snackbar } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { XGrid } from '@material-ui/x-grid';
import axios from 'axios';
import authHeader from '../../services/auth-header';

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
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        axios.get('/.netlify/functions/api/exp/list_all', { headers: authHeader() })
            .then((response) => {
                console.log(response.data);
                setRowData(response.data);
            })
    }, []);

    const columns = [
        { field: "id", headerName: "id", width: 120},
        { field: "dt", headerName: "DATE", width: 250 },
        { field: "pto", headerName: "PAID TO", width: 450 },
        { field: "head", headerName: "HEAD", width: 300 },
    ];

    return (
        <div style={{ height: 550, width: '100%' }}>
            <XGrid 
            pagination pageSize={100000}
            columns={columns}
            rows={rowData}
            id="id"
            density="compact"
             />
        </div>
    )
}

export default Exp

