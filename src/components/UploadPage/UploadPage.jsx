import React from "react";
import { Link } from "react-router-dom"



//Material UI dialog box 
import Button from '@mui/material/Button';


import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';



function UploadPage() {

    const [Description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(Number['']);
    const [rating, setRating] = useState(Number['']);
    const [individualSelection, setIndividualSelecton] = useState('');

    const handleSubmit = () => {

    };






    return (
        <>

            <ViewMyListPageButton />
            <UploadPageButton />

            <h1> Upload files </h1>

            <form>
                <input
                    type="text"
                    placeholder="Description"
                    Value />


                <Button
                    component={Link}
                    to={"/UploadSuccessfulPage"}
                    variant="contained"
                    color="primary"
                > Upload </Button>

            </form>





        </>
    );
};

export default UploadPage; 