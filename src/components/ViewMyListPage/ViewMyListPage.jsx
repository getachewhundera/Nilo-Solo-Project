import React from "react";
import './ViewMyListPage.css';

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

    const handleSave = (item) => {
        console.log('Save item:', item);
        dispatch({ type: 'MARK_ITEM_COMPLETE', payload: item });
      };

    const handleDelete = (item) => {
        console.log('Delete item:', item);
        // Add your delete logic here
    };





    return (
        <>
            <div className="buttons-container">
                <div className="mylistbuttons">
                    <AddListItemButton />
                    <ViewMyListButton />
                    <CompletedButton />
                    <MapPageButton />

                </div>
                <div className="vmluploadpagebutton">
                    <UploadPageButton />
                </div>
            </div>

            <div className="viewmylist-title">
                <h1> Experiences </h1>
            </div>

            <div className="bucketlistcontainer">
                <table className="bucket-list-items">
                    <div className="tablehead">
                        <thead>
                            <tr>
                                <th>My List: </th>
                            </tr>
                        </thead>
                    </div>
                    <div className="tablebody">
                        <tbody>
                            {list.map((listItem, i) => (
                                <tr key={i}>
                                    <td>{listItem.description}</td>
                                    <td>
                                        <button onClick={() => handleSave(listItem)}>Save</button>
                                        <button onClick={() => handleDelete(listItem)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </div>

                </table>
            </div>









        </>
    );
};

export default ViewMyListPage; 