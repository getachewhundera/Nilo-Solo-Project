import React from "react";

import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../../MyListButtons/MyListButtons";
import { UploadPageButton } from "../RouteButtons/RouteButtons";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";


function AddListItemPage() {


    const dispatch = useDispatch();

    let [addNewItem, setNewItem] = useState('');

    const handleChangeFor = (value) => {
        console.log('event happened');
        setNewItem('');
    };

    const handleInput = (event) => {
        event.preventDefault();
        console.log('action was dispatched')
        dispatch({ type: 'ADD_NEW_ITEM', payload: addNewItem });
        setNewItem('');
    };




    return (

        <>

            <UploadPageButton />
            <br></br>
            <AddListItemButton />
            <ViewMyListButton />
            <CompletedButton />
            <MapPageButton />

            <h1> Add New Experience </h1>

            <form>
                <textarea
                    type="text"
                    placeholder="Description"
                    value={addNewItem}
                    onChange={(event) => handleChangeFor(event.target.value)}
                />


                <Button
                    onClick={handleInput}
                    variant="contained"
                    color="primary"
                >Add Experience </Button>

            </form>












        </>
    );
};

export default AddListItemPage;


