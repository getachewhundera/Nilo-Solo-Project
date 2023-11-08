import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import './AddListItemPage.css';

// Imported button components
import { AddListItemButton, ViewMyListButton } from "../MyListButtons/MyListButtons";
import { UploadPageButton } from "../RouteButtons/RouteButtons";

// Imported the CustomizedSnackbars component
import CustomizedSnackbars from "./AddItemAlert";

// Imported the Alert component from MUI
import MuiAlert from '@mui/material/Alert';

import { useSelector } from "react-redux";

// Created an Alert component using MUI's Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddListItemPage() {
  const dispatch = useDispatch();
  const [addNewItem, setNewItem] = useState('');
  const [newExperienceCreatedDate, setNewExperienceCreatedDate] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const error = useSelector(state => state.listReducer.error);

  const handleInput = async (event) => {
    event.preventDefault();
    const addBucketListItem = {
      description: addNewItem,
      date: newExperienceCreatedDate
    };

    try {
      // Dispatch the action to add a new item
      dispatch({ type: 'ADD_NEW_ITEM', payload: addBucketListItem });

      setSnackbarMessage('Bucket list item added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Failed to add bucket list item.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setNewItem('');
      setNewExperienceCreatedDate('');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };



  return (

    <>

      <div className="MuiButton">

        <UploadPageButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120,
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey'
            }
          }} />

        <AddListItemButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120,
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey'
            }
          }} />

        <ViewMyListButton
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: 120,
            height: 40,
            '&:hover': {
              backgroundColor: 'darkgrey'
            }
          }} />
      </div>



      <div className="addnewexperiencecontainer" >

        <CustomizedSnackbars
          className="custom-snackbar"
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />

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



        </div>

      </div >












    </>
  );
};

export default AddListItemPage;


