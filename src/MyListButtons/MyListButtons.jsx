import React from 'react';
import { Link } from 'react-router-dom';




export function AddListItemButton() {
    return (
        <Link to="/AddListItemPage"><button> Add New Item </button></Link>
    );
};

export function ViewMyListButton() {
    return (
        <Link to="/ViewMyListPage"><button> List </button></Link>
    );
};
export function CompletedButton() {
    return (
        <Link to="/CompletedListPage"><button> Completed  </button></Link>
    );
};
export function MapPageButton() {
    return (
        <Link to="/MapPage"><button> Map </button></Link>
    );
};







