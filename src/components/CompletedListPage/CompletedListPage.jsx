import React from "react";



import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../../MyListButtons/MyListButtons.jsx";
import { UploadPageButton } from "../RouteButtons/RouteButtons";


function CompletedListPage() {





    return (
        <>
            
         
            <UploadPageButton />
            <br></br>
            <AddListItemButton />
            <ViewMyListButton />
            <CompletedButton />
            <MapPageButton />

            <h1> this is the Completed List Item Page. </h1>


        </>
    );
};

export default CompletedListPage; 