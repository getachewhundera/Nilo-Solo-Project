import React from "react";
import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";



//Material UI dialog box 
import Button from '@mui/material/Button';


import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';
import { use } from "passport";



function UploadPage() {
    const [file, setFile] = useState(null)
    const [ progress, setProgress ] = useState({ started: false, pc: 0 }); 
    const [ msg, setMsg ] = useState(null); 
    const [Description, setDescription] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState(Number['']);
    const [rating, setRating] = useState(Number['']);
    const [individualSelection, setIndividualSelecton] = useState('');


    function handleFileUpload() {
        if (!file) {
            console.log("No file selected")
            return; 
        }

        const fd = new FormData(); 
        fd.append('file', file); 


        axios.post('http://httpbin.org/post', fd, {
            onUploadProgress: (progressEvent) => { console.log(progressEvent.progress*100) },  
            headers: {
                "Custom-Header": "value", 
            } 
        })
        .then(res => console.log(res.data))
        .catch(err => console.error(err)); 

    }


    const handleChangeFor = (value) => {
        console.log('event happened');
        setDescription('');
        setHouseNumber(Number(value));
        setStreetAddress('');
        setCity('');
        setState('');
        setZipCode(Number(value));
        setCountry('');
        setPrice(Number(value));
        setRating(Number(value));
        setIndividualSelecton('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('action was dispatched')
        dispatch({
            type: 'SEND_POST_SERVER', payload: image, Description, houseNumber, streetAddress,
            city, state, zipcode, country, price, rating, individualSelection
        });
        setFile(null);
        setDescription(null);
        setLocation(null);
        setPrice('');
        setRating('');
        setIndividualSelecton('');
    };




    return (
        <>

            <ViewMyListPageButton />
            <UploadPageButton />

            <h1> Upload files </h1>

            <input
                type="file"
                name="file"
                onChange={(e) => { setFile(e.target.file[0]) }}
            />
            <button onClick={handleFileUpload}> Upload Image </button>

            <form>


                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Description"
                    Value={Description}
                    onChange={(event) => handleChangeFor(event.target.value)}
                />
                <input
                    type="number"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="House Number"
                    value={houseNumber || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Street Address"
                    value={streetAddress || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="City"
                    value={city || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="State"
                    value={state || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />
                <input
                    type="number"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Zipcode"
                    value={zipcode || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Country"
                    value={country || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />

                <input
                    type="number"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Price"
                    value={price || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />

                <input
                    type="number"
                    style={{ width: '100px', height: '30px' }}
                    min={1} max={10}
                    placeholder="rating: 1-10"
                    value={rating || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Solo or Group"
                    value={individualSelection || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} //will be stored in state as a string
                />


                <Button
                    onClick={handleSubmit}
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