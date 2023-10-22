import * as React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";



//Import for dropdown selection for individualselection input. 

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './UploadPage.css';


//Material UI dialog box 
import Button from '@mui/material/Button';


import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';


function UploadPage() {

    // For the individualSelection dropdown select: 
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const individualSelectOptions = [
        'Solo',
        'Group',
    ];

    function getStyles(selectOption, uploadFormData, theme) {
        return {
            fontWeight:
                uploadFormData.individualSelection.indexOf(selectOption) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }


    const theme = useTheme();

    const handleOptionChange = (event) => {
        const newSelection = event.target.value;
        setUploadFormData(prevState => ({
            ...prevState,
            individualSelection: newSelection, // updates the individualSelection field within the state object.
        }));
    };



    //State variable for file uploads that are not being sent with the form(to separate them out).
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

    //data within the form that will be sent to the server then database. 
    const [uploadFormData, setUploadFormData] = useState({
        files: [],
        description: '',
        houseNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        price: Number[''],
        rating: Number[''],
        individualSelection: '',
    });


    //switched from using for loop to promise loop to allow uploads to happen at the same time. 
    const fileChangedHandler = (event) => {
        const selectedFiles = Array.from(event.target.uploadFormData.files); // directly converting FileList to array

        const newPreviewUrlsArray = [];

        // usedPromise.allSettled to ensure all promises either fulfill or reject
        Promise.allSettled(selectedFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result); // Resolve the promise with the reader result
                reader.onerror = reject; // Reject the promise if there's an error
                reader.readAsDataURL(file);
            });
        })).then(results => {
            const newPreviewUrlsArray = results.map(result => result.status === "fulfilled" ? result.value : null);
            uploadFormData.files(selectedFiles);
            setPreviewUrls(newPreviewUrlsArray);
            setCurrentPreviewIndex(0); // Reset the preview index
            setIsFileUploaded(true); // Indicate that files are uploaded
        });
    };

    const goToNextPreview = () => {
        setCurrentPreviewIndex((prevIndex) => (prevIndex + 1) % files.length); // Go to the next preview, loop back to the first after the last
    };

    const goToPreviousPreview = () => {
        setCurrentPreviewIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length); // Go to the previous preview, loop back to the last after the first
    };

    const handleCancelUpload = () => {
        //  cancel the file upload and reset state variables
        uploadFormData.files([]);
        setPreviewUrls([]);
        setIsFileUploaded(false);
        setCurrentPreviewIndex(0); // Reset the preview index
    };



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUploadFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('action was dispatched')
        dispatch({
            type: 'SEND_POST_SERVER', payload: uploadFormData
        });
        // Reset the state to initial values
        setUploadFormData({
            files: [],
            description: '',
            houseNumber: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            price: '',
            rating: '',
            individualSelection: ''
        });

        setPreviewUrls([]);
        setIsFileUploaded(false);
        setCurrentPreviewIndex(0);

    };




    return (
        <div id="uploadpage">

            <ViewMyListPageButton />
            <UploadPageButton />

            <h1> Upload files </h1>
            <div className="mainuploadcontainer">
                <form>
                    <div className="grid-container">
                        <div className="grid-item">
                            <div id="uploadfilecontainer">
                                <div className="upload-container">
                                    {!isFileUploaded && (
                                        <>
                                            <input name="files" type="file" onChange={fileChangedHandler} multiple />
                                        </>
                                    )}
                                    {isFileUploaded && previewUrls.length > 0 && (
                                        <div className="image-preview">
                                            <img src={previewUrls[currentPreviewIndex]} alt="Preview" />
                                            <button className="button-left" onClick={goToPreviousPreview}>Left</button>
                                            <button className="button-right" onClick={goToNextPreview}>Right</button>
                                            {/* <button className="plus-button" onClick={handleChangeFile}>+</button> */}
                                            <button className="cancel-button" onClick={handleCancelUpload}>X</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="grid-item">
                            <div id="uploadformcontainer">
                                <div className="formContainer">

                                    <div className='textarea-box'>

                                        <textarea
                                            className='description-box'
                                            name="Description"
                                            type="text"
                                            placeholder="Description"
                                            value={uploadFormData.description}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* address inputs are grouped together  */}
                                    <div className='address-group'>
                                        <input
                                            name="houseNumber"
                                            type="number"
                                            placeholder="House Number"
                                            value={uploadFormData.houseNumber || ''}
                                            onChange={handleChange}
                                        />
                                        <input
                                            name="streetAddress"
                                            type="text"
                                            placeholder="Street Address"
                                            value={uploadFormData.streetAddress || ''}
                                            onChange={handleChange}
                                        />
                                        <input
                                            name="city"
                                            type="text"
                                            placeholder="City"
                                            value={uploadFormData.city || ''}
                                            onChange={handleChange}

                                        />
                                        <input
                                            name="state"
                                            type="text"
                                            placeholder="State"
                                            value={uploadFormData.state || ''}
                                            onChange={handleChange}
                                        />
                                        <input
                                            name="zipcode"
                                            type="number"
                                            placeholder="Zipcode"
                                            value={uploadFormData.zipcode || ''}
                                            onChange={handleChange}
                                        />
                                        <input
                                            name="country"
                                            type="text"
                                            placeholder="Country"
                                            value={uploadFormData.country || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* price, rating, and selection are grouped together for formatting */}

                                    <div className='bottom-element'>
                                        <input
                                            name="price"
                                            type="number"
                                            placeholder="Price"
                                            value={uploadFormData.price || ''}
                                            onChange={handleChange}
                                        />

                                        <input
                                            name="rating"
                                            type="number"
                                            min={1} max={10}
                                            placeholder="rating: 1-10"
                                            value={uploadFormData.rating || ''}
                                            onChange={handleChange}
                                        />

                                        <div className='bottom-element-selection'>

                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <InputLabel id="demo-option-label">Choose Selection </InputLabel>
                                                <Select
                                                    labelId="demo--option-label"
                                                    id="demo-option"
                                                    name="individualSelection"
                                                    value={uploadFormData.individualSelection}
                                                    onChange={handleOptionChange}
                                                    input={<OutlinedInput label="Choose Selection" />}
                                                    MenuProps={MenuProps}
                                                >
                                                    {individualSelectOptions.map((selectOption) => (
                                                        <MenuItem
                                                            key={selectOption}
                                                            value={selectOption}
                                                            style={getStyles(selectOption, uploadFormData, theme)}
                                                        >
                                                            {selectOption}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>

                                    </div>



                                </div>

                                <div className='uploadFormButton'>
                                    <Button
                                        onClick={handleSubmit}
                                        component={Link}
                                        to={"/UploadSuccessfulPage"}
                                        variant="contained"
                                        color="primary"
                                    > Upload </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>



            </div>





        </div>
    );
};

export default UploadPage;

//U4