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
                uploadFormData.individualSelection.indexOf(selectOption) === -1 //=== -1 ternary conditional expression that checks if the result of indexOf found selectOption if not -1 is returned. 
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
        price: Number[''],
        rating: Number[''],
        individualSelection: '',
    });

    // Limit to specific file types.
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/wepb'];

    const fileChangedHandler = async (event) => {

        setIsLoading(true);
        const fileToUpload = event.target.files[0]; //event.target.files returns a FileList object(its array-like, but not  an array). Array.from converts it to an array.

        // Resize and compress the image. 
        const copyFile = new Blob([fileToUpload], { type: fileToUpload.type, name: fileToUpload.name });
        const resizedFile = await readAndCompressImage(copyFile, {
            quality: 1.0,    // 100% quality
            maxHeight: 1000, // max height of the image
        });


        // Check if the file is one of the allowed types.
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            // Resizing the image removes the name, store it in a separate variable
            setUploadFormData(prevState => ({
                ...prevState,
                fileName: (encodeURIComponent(fileToUpload.name)), 
                fileType: (encodeURIComponent(fileToUpload.type)),
            }));
            
            // Save the resized file
            setSelectedFile(resizedFile);

        } else {
            alert('Please select an image');
        }

        console.log('files being filtered for acceptedtypes:', fileToUpload);
        //checks if the file's type is included in the acceptedImagesTypes array. 
        //file represents a single file object from the selectedFiles array
        //file.type. 
        const validFiles = [fileToUpload];//fileToUpload.filter(file => acceptedImageTypes.includes(file.type));
        //checking if they are not equal (!== strict inequality:two operands are not equal, returning boolean results)
        if (validFiles.length !== fileToUpload.length) {
            alert('Some files are not valid image types');
        }

        const newPreviewUrlsArray = [];

        // usedPromise.allSettled to ensure all promises either fulfill or reject
        Promise.allSettled(validFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result); // Resolve the promise with the reader result
                reader.onerror = reject; // Reject the promise if there's an error
                reader.readAsDataURL(file);
            });
        })).then(results => {
            const newPreviewUrlsArray = results.map(result => result.status === "fulfilled" ? result.value : null);
            // setUploadFormData(prevState => ({
            //     ...prevState,
            //     files: validFiles
            // }));
            setPreviewUrls(newPreviewUrlsArray);
            setCurrentPreviewIndex(0); // Reset the preview index
            setIsFileUploaded(true); // Indicate that files are uploaded
        });
        setIsLoading(false);
    };



    //     const previewUrlsPromises = validFiles.map((file, index) => {
    //         return new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => resolve({ status: 'fulfilled', value: reader.result }) ;
    //             console.log(reader.result)
    //             reader.onerror = () => reject({ status: 'rejected', reason: `Failed to load image ${index + 1}: ${file.name}` });
    //             reader.readAsDataURL(file);
    //         });
    //     });

    //     const results = await Promise.allSettled(previewUrlsPromises);
    //     const successfulResults = results.filter(result => result.status === 'fulfilled').map(result => result.value);
    //     const failedResults = results.filter(result => result.status === 'rejected');

    //     failedResults.forEach(result => {
    //         alert(result.reason);
    //     });

    //     if (successfulResults.length === 0) {
    //         alert('Failed to load all images');
    //     } else {
    //         setPreviewUrls(prevUrls => [...prevUrls, ...successfulResults]);
    //         setCurrentPreviewIndex(0);
    //         setIsFileUploaded(true);
    //     }

    //     setUploadFormData(prevState => ({
    //         ...prevState,
    //         files: [...prevState.files, ...validFiles]
    //     }));

    //     setIsLoading(false);
    // };

    //   const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    // const fileChangedHandler = async (event) => {
    //     const selectedFiles = Array.from(event.target.files);

    //     const validFiles = [];
    //     const newPreviewUrlsArray = [];

    //     for (const file of selectedFiles) {
    //         if (acceptedImageTypes.includes(file.type)) {
    //             validFiles.push(file);
    //             const reader = new FileReader();
    //             reader.onloadend = () => newPreviewUrlsArray.push(reader.result);
    //             reader.readAsDataURL(file);
    //         } else {
    //             alert('Please select a valid image file');
    //         }
    //     }

    //     setUploadFormData(prevState => ({
    //         ...prevState,
    //         files: validFiles
    //     }));

    //     setPreviewUrls(newPreviewUrlsArray);
    //     setCurrentPreviewIndex(0);
    //     setIsFileUploaded(true);
    // };

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
            rating: '',
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

            <h1> Upload files </h1>
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