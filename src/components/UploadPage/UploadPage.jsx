import * as React from 'react';
import { Link } from "react-router-dom";
import './UploadPage.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
//Import for dropdown selection for individualselection input. 
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//Material UI dialog box 
import Button from '@mui/material/Button';
//Page Buttons 
import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';
import { readAndCompressImage } from 'browser-image-resizer';

//Material ui rating component (rating input)
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function UploadPage() {

    const dispatch = useDispatch();

    //For the individualSelection dropdown select: 
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
                uploadFormData.individualSelection === selectOption
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular,
        };
    }

    // function getStyles(selectOption, uploadFormData, theme) {
    //     return {
    //         fontWeight:
                // uploadFormData.individualSelection.indexOf(selectOption) === -1 //=== -1 ternary conditional expression that checks if the 
                //result of indexOf found selectOption if not -1 is returned. 
    //            theme.typography.fontWeightRegular
    //                 : theme.typography.fontWeightMedium,
    //     };
    // }


    const theme = useTheme();

    // const handleOptionChange = (event) => {
    //     const newSelection = event.target.value;
    //     setUploadFormData(prevState => ({
    //         ...prevState,
    //         individualSelection: newSelection, // updates the individualSelection field within the state object.
    //     }));
    // };



    //State variable for file uploads that are not being sent with the form(to separate them out).
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);  //state variable for loading status of files 
    const [selectedFile, setSelectedFile] = useState();


    //data within the form that will be sent to the server then database. 
    const [uploadFormData, setUploadFormData] = useState({
        fileName: '',
        fileType: '',
        description: '',
        houseNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        price: '',
        rating: 0,
        individualSelection: '',
    });





    // Limit to specific file types.
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/wepb'];

    const fileChangedHandler = async (event) => {
        const filesToUpload = Array.from(event.target.files); // Convert FileList to Array
        // Filter out invalid file types
        const validFiles = filesToUpload.filter(file => acceptedImageTypes.includes(file.type));
        if (validFiles.length !== filesToUpload.length) {
            alert('Some files are not valid image types');
        }

        const processedFilesPromises = validFiles.map(async (file) => {
            try {
                // Resize and compress the image
                const copyFile = new Blob([file], { type: file.type });
                const resizedFile = await readAndCompressImage(copyFile, {
                    quality: 1.0,    // 100% quality
                    maxHeight: 1000, // max height of the image
                });

                // Read the resized file for preview
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve({
                        resizedFile,
                        dataUrl: reader.result,
                        originalName: file.name // Preserve the original file name
                    });
                    reader.onerror = reject;
                    reader.readAsDataURL(resizedFile);
                });
            } catch (error) {
                console.error('Error processing file:', error);
                return Promise.reject(error);
            }
        });

        try {
            const processedFiles = await Promise.all(processedFilesPromises);
            const newPreviewUrls = processedFiles.map(file => file.dataUrl);

            // Update form data with the first valid (and processed) file's name and type
            if (processedFiles.length > 0) {
                const { resizedFile, originalName } = processedFiles[0];
                setUploadFormData(prevState => ({
                    ...prevState,
                    fileName: encodeURIComponent(originalName), // Use the preserved original name
                    fileType: encodeURIComponent(resizedFile.type),
                }));
                setSelectedFile(resizedFile); // Save the resized file
            }

            setPreviewUrls(newPreviewUrls);
            setCurrentPreviewIndex(0); // Reset the preview index
            setIsFileUploaded(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error reading files:', error);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUploadFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const goToNextPreview = () => {
        setCurrentPreviewIndex((prevIndex) => (prevIndex + 1) % uploadFormData.files.length); // Go to the next preview, loop back to the first after the last
    };

    const goToPreviousPreview = () => {
        setCurrentPreviewIndex((prevIndex) => (prevIndex - 1 + uploadFormData.files.length) % uploadFormData.files.length); // Go to the previous preview, loop back to the last after the first
    };

    const handleCancelUpload = () => {
        //  cancel the file upload and reset state variables
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
        setCurrentPreviewIndex(0); // Reset the preview index
    };


    //---------Submitting formData------------------//
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('this is right before it gets dispatched:', uploadFormData.individualSelection); 

        // Dispatch an action to send the form data to the server
        dispatch({
            type: 'SEND_POST_SERVER',
            payload: uploadFormData,
            selectedFile,
        });

        // Log to the console for debugging purposes

        // Reset the state to clear the form and remove the file previews
        setUploadFormData({
            fileName: '',
            fileType: '',
            files: [],
            description: '',
            houseNumber: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            price: '',
            rating: 0,
            individualSelection: ''
        });
        setPreviewUrls([]);
        setIsFileUploaded(false);
        setCurrentPreviewIndex(0);

        // Log to the console for debugging purposes
        console.log('Form and state reset');
    };




    return (
        <div id="uploadpage">

            <ViewMyListPageButton />
            <UploadPageButton />

            <h1> Catalog An Experience: </h1>
            <div className="mainuploadcontainer">
                <form>
                    <div className="grid-container">
                        <div className="grid-item">
                            <div id="uploadfilecontainer">
                                <div className="upload-container">
                                    {!isFileUploaded && (
                                        <>
                                            <input name="files" type="file" accept='image/*' onChange={fileChangedHandler} multiple />
                                            {isLoading && <div className="loading-spinner">Loading...</div>}
                                        </>
                                    )}
                                    {isFileUploaded && previewUrls.length > 0 && (
                                        <div className="image-preview">
                                            <img src={previewUrls[currentPreviewIndex]} alt="Preview" onError={(e) => console.error("Error loading image", e)} />
                                            {/* <button className="button-left" onClick={goToPreviousPreview}>Left</button>
                                            <button className="button-right" onClick={goToNextPreview}>Right</button> */}
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
                                            name="description"
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
                                            placeholder="House Number - optional"
                                            value={uploadFormData.houseNumber || ''}
                                            onChange={handleChange}
                                        />
                                        <input
                                            name="streetAddress"
                                            type="text"
                                            placeholder="Street Address - optional"
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
                                            placeholder="Zipcode - optional"
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
                                            placeholder="Price - optional"
                                            value={uploadFormData.price || ''}
                                            onChange={handleChange}
                                        />

                                        <div className='bottom-element-rating'>                                                                                
                                           <Box
                                                sx={{
                                                    '& > legend': { mt: 2 },
                                                }}
                                            >
                                                <Typography component="legend"> Rating: </Typography>
                                                <Rating
                                                    name="rating"
                                                    value={Number(uploadFormData.rating) || 0}                                                   
                                                    onChange={handleChange}
                                                />
                                            </Box>                                    
                                        </div>

                                        <div className='bottom-element-selection'>

                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <InputLabel id="demo-option-label">Choose Selection </InputLabel>
                                                <Select
                                                    labelId="demo--option-label"
                                                    id="demo-option"
                                                    name="individualSelection"
                                                    value={uploadFormData.individualSelection || ''}
                                                    onChange={handleChange}
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