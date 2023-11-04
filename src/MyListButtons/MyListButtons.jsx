import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ThemeProvider } from '@mui/material';
import theme from './MyListButtonstheme';



export function AddListItemButton() {
    return (

        <ThemeProvider theme={theme}> 
        <Link to="/AddListItemPage">
           
                
                <Button variant='contained' color='primary'  > Add New Item </Button>
            
        </Link>
        </ThemeProvider>
    );
};

export function ViewMyListButton() {
    return (
        <Link to="/ViewMyListPage">
            <ThemeProvider theme={theme}>
                <Button variant='contained' color='primary' > List </Button>
            </ThemeProvider>
        </Link>
    );
};
export function CompletedButton() {
    return (
        <Link to="/CompletedListPage">
            <ThemeProvider theme={theme}>
                <Button variant='contained' color='primary'> Completed  </Button>
            </ThemeProvider>
        </Link>

    );
};
export function MapPageButton() {
    return (
        <Link to="/MapPage">
            <ThemeProvider theme={theme}>
                <Button variant='contained' color='primary'> Map </Button>
            </ThemeProvider>
        </Link>
    );
};







