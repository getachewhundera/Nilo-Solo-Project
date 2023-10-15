import React from "react";
import { Link } from "react-router-dom"



//Material UI dialog box 
import Button from '@mui/material/Button';





function UploadPage() {





    return (
        <> 

 

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