import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import './AddListItemPage.css';

// Imported button components
import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../MyListButtons/MyListButtons";
import { UploadPageButton } from "../RouteButtons/RouteButtons";

// Imported the CustomizedSnackbars component
import CustomizedSnackbars from "./AddItemAlert";

// Imported the Alert component from MUI
import MuiAlert from '@mui/material/Alert';

// Created an Alert component using MUI's Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddListItemPage() {
  const dispatch = useDispatch();
  const [customSnackbarOpen, setCustomSnackbarOpen] = useState(false);
  const [addNewItem, setNewItem] = useState('');
  const [newExperienceCreatedDate, setNewExperienceCreatedDate] = useState('');

  const handleInput = (event) => {
    event.preventDefault();

    const addBucketListItem = {
      description: addNewItem,
      date: newExperienceCreatedDate
    };

    console.log('AddListItemPage.jsx line 23: Action was dispatched');
    // Dispatch the action to add a new item
    dispatch({ type: 'ADD_NEW_ITEM', payload: addBucketListItem });

    //Open the custom Snackbar 
    setCustomSnackbarOpen(true);

    // Reset the form fields
    setNewItem('');
    setNewExperienceCreatedDate('');
  };

  const handleCloseCustomSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCustomSnackbarOpen(false);
  };



  return (

    <>

      <div className="MuiButton">

        <UploadPageButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120, // you can use numbers for pixel values
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey' // example for hover state
            }
          }} />

        <AddListItemButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120, // you can use numbers for pixel values
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey' // example for hover state
            }
          }} />

        <ViewMyListButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120, // you can use numbers for pixel values
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey' // example for hover state
            }
          }} />

        <CompletedButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120, // you can use numbers for pixel values
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey' // example for hover state
            }
          }} />

        <MapPageButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120, // you can use numbers for pixel values
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey' // example for hover state
            }
          }} />
      </div>



      <div className="addnewexperiencecontainer" >

        <h1> Add New Experience </h1>
        <div className="addingnewexp-inputsandbutton">

          <form id='taskFormInput'>
            <input id="createdDateInput"
              type="date"
              value={newExperienceCreatedDate}
              placeholder='Created Date: DD-MM-YYYY'
              onChange={(event) => setNewExperienceCreatedDate(event.target.value)}
            />


            <textarea
              type="text"
              placeholder="Description"
              value={addNewItem}
              onChange={(event) => setNewItem(event.target.value)}
            />


            <Button onClick={handleInput} variant="contained" color="primary">
              Add Experience
            </Button>
          </form>

          <CustomizedSnackbars open={customSnackbarOpen} autoHideDuration={6000} onClose={handleCloseCustomSnackbar}>
            <Alert onClose={handleCloseCustomSnackbar} severity="success" sx={{ width: '100%' }}>
              Bucket list item added.
            </Alert>
          </CustomizedSnackbars>
          
        </div>

      </div >












    </>
  );
};

export default AddListItemPage;


