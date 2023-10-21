import React from "react";

import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../../MyListButtons/MyListButtons";
import { UploadPageButton } from "../RouteButtons/RouteButtons";




function MapPage() {





    return (
        <>
        
     
        
            <UploadPageButton />
            <br></br>
            <AddListItemButton />
            <ViewMyListButton />
            <CompletedButton />
            <MapPageButton />
            <h1> this is the Map Page. </h1>


        </>
    );
};

export default MapPage; 