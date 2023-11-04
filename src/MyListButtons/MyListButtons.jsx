import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ThemeProvider } from '@mui/material';
import theme from './MyListButtonstheme';



export function AddListItemButton() {
    return (

        <ThemeProvider theme={theme}> 
        <Link to="/AddListItemPage">
           
                
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1}}  > Add New Item </Button>
            
        </Link>
        </ThemeProvider>
    );
};

export function ViewMyListButton() {
    return (
        <Link to="/ViewMyListPage">
            <ThemeProvider theme={theme}>
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1 }} > List </Button>
            </ThemeProvider>
        </Link>
    );
};
export function CompletedButton() {
    return (
        <Link to="/CompletedListPage">
            <ThemeProvider theme={theme}>
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1 }}> Completed  </Button>
            </ThemeProvider>
        </Link>

    );
};
export function MapPageButton() {
    return (
        <Link to="/MapPage">
            <ThemeProvider theme={theme}>
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1 }}> Map </Button>
            </ThemeProvider>
        </Link>
    );
};







