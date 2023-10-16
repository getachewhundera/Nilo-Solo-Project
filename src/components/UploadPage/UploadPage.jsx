import React from "react";
import { Link } from "react-router-dom"



//Material UI dialog box 
import Button from '@mui/material/Button';


import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';



function UploadPage() {





    return (
        <>

            <ViewMyListPageButton />
            <UploadPageButton />

            <Button
                component={Link}
                to={"/UploadSuccessfulPage"}
                variant="contained"
                color="primary"
            > Upload </Button>


        </>
    );
};

export default UploadPage; 