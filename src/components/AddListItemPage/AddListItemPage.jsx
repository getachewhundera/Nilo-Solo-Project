import React from "react";

import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../../MyListButtons/MyListButtons";
import { UploadPageButton } from "../RouteButtons/RouteButtons";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";

import './AddListItemPage.css';

function AddListItemPage() {


  const dispatch = useDispatch();

  const [addNewItem, setNewItem] = useState('');
  const [newExperienceCreatedDate, setNewExperienceCreatedDate] = useState('');

  const handleInput = (event) => {
    event.preventDefault();
    console.log('Action was dispatched');
    dispatch({ type: 'ADD_NEW_ITEM', payload: addNewItem, newExperienceCreatedDate });
    setNewItem('');
  };





  return (

    <>

      <div className="addnewexpimportedbuttons">
        <UploadPageButton />
        <br></br>
        <AddListItemButton />
        <ViewMyListButton />
        <CompletedButton />
        <MapPageButton />


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
        </div>

      </div >












    </>
  );
};

export default AddListItemPage;


