import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './ViewMyListPage.css';
import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../MyListButtons/MyListButtons.jsx";
import { UploadPageButton } from "../RouteButtons/RouteButtons.jsx";
import StarBorderIcon from '@mui/icons-material/StarBorder';


function ViewMyListPage() {
    const dispatch = useDispatch();

    let list = useSelector(store => store.listReducer.listItems);

    useEffect(() => {
        console.log('in useEffect');
        dispatch({ type: 'GET_ADDED_LIST_ITEMS' });
    }, [dispatch]);

    const handleSave = (listItem) => {
        console.log('Save item:', listItem);
        dispatch({ type: 'MARK_ITEM_COMPLETE', payload: listItem });
    };

    const handleDelete = (listItem) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch({ type: 'DELETE_LIST_ITEM_SAGA', payload: listItem });
        }
    };

    console.log('List:', list);


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
                    <thead className="tablehead">
                        <tr>
                            <th>My List: </th>
                        </tr>
                    </thead>
                    <tbody className="tablebody">
                        {list.map((listItem, i) => (
                            <tr key={listItem.id || i}>
                                <td><StarBorderIcon />{listItem.description}</td>
                                <td>
                                    <button onClick={() => handleSave(listItem)}>Save</button>
                                    <button onClick={() => handleDelete(listItem)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewMyListPage; 