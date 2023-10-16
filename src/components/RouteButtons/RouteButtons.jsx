import React from 'react';
import { Link } from 'react-router-dom';




export function ViewMyListPageButton() {
    return (
        <Link to="/ViewMyListPage"><button> View My List </button></Link>
    );
};

export function UploadPageButton() {
    return (
        <Link to="/UploadPage"><button> Upload </button></Link>
    );
};






