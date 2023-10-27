import React from "react";

import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../../MyListButtons/MyListButtons.jsx";
import { UploadPageButton } from "../RouteButtons/RouteButtons.jsx";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';





function ViewMyListPage() {

    const dispatch = useDispatch();
    let list = useSelector(store => store.listReducer);

    // on load, dispatch the saga action
    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'GET_ADDED_LIST_ITEMS' };
        dispatch(action);
    }, []);





    return (
        <>
            <UploadPageButton />
            <br></br>
            <AddListItemButton />
            <ViewMyListButton />
            <CompletedButton />
            <MapPageButton />


            <h1> this is the View My List Item Page. </h1>

            <table className="bucket-list-items">
                <thead>
                    <tr>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((listItem, i) => (
                        <tr key={i}>
                            <td>{listItem.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>




        </>
    );
};

export default ViewMyListPage; 