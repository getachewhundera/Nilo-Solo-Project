import React from "react";
import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";



//Material UI dialog box 
import Button from '@mui/material/Button';


import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';




function UploadPage() {
    //State variable for file uploads 
    const [file, setFile] = useState(null)

    //storing the url of the preview 
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    // const [ progress, setProgress ] = useState({ started: false, pc: 0 }); 
    // const [ msg, setMsg ] = useState(null); 

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

//triggered when user selects a file 
    const fileChangedHandler = (event) => {
        const file = event.target.files[0]; //assumes a single file is selected 
        setFile(file); //updates the file state with the selected file 

        const reader = new FileReader();  //allows you to read the contents of the selected file for previewing. 
        //event handler that is called when the readAsDataURL operation is completed.
        //  updates the previewUrl with the data URL of the loaded file(used for previewing). 
        reader.onloadend = () => {         
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setIsFileUploaded(true);
    };

    const submitHandler = () => {
        // Dispatch the action to upload the file
        dispatch(uploadFileAction({ file, description }));
    };


    const handleCancelUpload = () => {
        //  cancel the file upload and reset state variables
        setFile(null);
        setPreviewUrl(null);
        setIsFileUploaded(false);
    };

    const handleChangeFile = () => { 
        setFile(''); 
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

            <div className="upload-container">
                {!isFileUploaded && (
                    <>
                        {/* <button className="button-left">Left</button>
                        <button className="button-right">Right</button> */}
                     
                        <input type="file" onChange={fileChangedHandler} />
                    </>
                )}
                {isFileUploaded && (
                    <div className="image-preview">
                        {previewUrl && <img src={previewUrl} alt="Preview" />}
                        {!previewUrl && <p>Please select an image or video.</p>}
                        <button className="button-left">Left</button>
                        <button className="button-right">Right</button>
                        <button className="plus-button" onClick={handleChangeFile}>+</button>
                        <button className="cancel-button" onClick={handleCancelUpload}>X</button>
                    </div>
                )}
                 <button onClick={submitHandler}>Upload File </button>
            </div>


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
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Street Address"
                    value={streetAddress || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="City"
                    value={city || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="State"
                    value={state || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />
                <input
                    type="number"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Zipcode"
                    value={zipcode || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Country"
                    value={country || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />

                <input
                    type="number"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Price"
                    value={price || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />

                <input
                    type="number"
                    style={{ width: '100px', height: '30px' }}
                    min={1} max={10}
                    placeholder="rating: 1-10"
                    value={rating || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
                />
                <input
                    type="text"
                    style={{ width: '100px', height: '30px' }}
                    placeholder="Solo or Group"
                    value={individualSelection || ''}
                    onChange={(event) => handleChangeFor(event.target.value)} 
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