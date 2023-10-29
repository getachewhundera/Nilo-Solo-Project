import React from "react";
import { AddListItemButton, ViewMyListButton, CompletedButton, MapPageButton } from "../../MyListButtons/MyListButtons.jsx";
import { UploadPageButton } from "../RouteButtons/RouteButtons";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder.js";

function CompletedListPage() {

    const dispatch = useDispatch();
    let completedList = useSelector(store => store.completedReducer);

    // on load, dispatch the saga action
    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'GET_COMPLETED_LIST_ITEMS' };
        dispatch(action);
    }, []);

    const handleDelete = (listitem) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          dispatch({ type: 'DELETE_LIST_ITEM_SAGA', payload: { ...listitem, isCompleted: true } });
        }
      };
    
    // dispatch({ type: 'DELETE_LIST_ITEM_SAGA', payload: listitem });


    return (
        <>
            <div className="cp-buttons-container">
                <div className="cp-mylistbuttons">
                    <AddListItemButton />
                    <ViewMyListButton />
                    <CompletedButton />
                    <MapPageButton />

                </div>
                <div className="cp-uploadpagebutton">
                    <UploadPageButton />
                </div>
            </div>

            <div className="completedlist-title">
                <h1> Completed Experiences </h1>
            </div>


            <div className="completedListItems">
                <table className="bucket-list-items">
                    <tr>
                        <th>My List: </th>
                    </tr>
                    <tbody>
                        {completedList.map((completedItem, i) => (
                            <tr key={i}>
                                <td><StarBorderIcon></StarBorderIcon>{completedItem.description}</td>
                                <td>
                                    <button onClick={() => handleDelete(completedItem)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>



            </div>





        </>
    );
};

export default CompletedListPage; 