import React from "react";
import { Link } from "react-router-dom"



//Material UI dialog box 
import Button from '@mui/material/Button';



function UploadSuccessfulPage() {


    return(
        <>
        <h1> Upload complete! </h1> 



        <h2> Upload Sucessful. Thank You! </h2>

        <Button
                component={Link}
                to={"/UploadPage"}
                variant="contained"
                color="primary"
            > New Upload</Button>
        
    
        
        
        
        </>
    )
};

export default UploadSuccessfulPage; 