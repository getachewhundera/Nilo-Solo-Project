import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ThemeProvider } from '@mui/material';
import theme from './RouteButtonstheme';



export function ViewMyListPageButton() {
    return (
        <ThemeProvider theme={theme}>
            <Link to="/ViewMyListPage">
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1, height: 40 }}  > Bucket List</Button>
            </Link>
        </ThemeProvider>
    );
};

export function UploadPageButton() {
    return (
        <ThemeProvider theme={theme}>
            <Link to="/UploadPage">
                <Button variant='contained' color='primary' sx={{ width: "9rem", padding: 1, margin: 1, height: 40 }}  > Snapshot  </Button>
            </Link>
        </ThemeProvider>

    );
};






