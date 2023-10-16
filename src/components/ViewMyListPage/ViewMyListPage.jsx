import React from "react";

import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../../MyListButtons/MyListButtons.jsx";
import { UploadPageButton } from "../RouteButtons/RouteButtons.jsx";







function ViewMyListPage() {





    return (
        <>
         
           
            <UploadPageButton />
            <br></br>
            <AddListItemButton /> 
            <ViewMyListButton />
            <CompletedButton />
            <MapPageButton />


            <h1> this is the View My List Item Page. </h1>


        </>
    );
};

export default ViewMyListPage; 