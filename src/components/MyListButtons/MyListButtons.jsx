import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ThemeProvider } from '@mui/material';
import theme from './MyListButtonstheme';



export function AddListItemButton() {
    return (

        <ThemeProvider theme={theme}> 
        <Link to="/AddListItemPage">
           
                
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1, height: 40}}  > Add New Item </Button>
            
        </Link>
        </ThemeProvider>
    );
};

export function ViewMyListButton() {
    return (
        <Link to="/ViewMyListPage">
            <ThemeProvider theme={theme}>
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1, height: 40 }} > List </Button>
            </ThemeProvider>
        </Link>
    );
};






