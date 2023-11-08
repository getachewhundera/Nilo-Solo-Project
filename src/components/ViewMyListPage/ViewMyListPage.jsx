import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ViewMyListPage.css';
import {
    AddListItemButton,
    ViewMyListButton
} from "../MyListButtons/MyListButtons.jsx";
import { UploadPageButton } from "../RouteButtons/RouteButtons.jsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function ViewMyListPage() {
    const dispatch = useDispatch();
    const listItems = useSelector((state) => state.listReducer.listItems);
    const [editMode, setEditMode] = useState({});

    useEffect(() => {
        dispatch({ type: 'FETCH_LIST_ITEMS' }); 
    }, [dispatch]);


    const handleDelete = (itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch({ type: 'DELETE_ITEM', payload: itemId }); 
        }
    };

    const handleEdit = (listItem) => {
        setEditMode({
            ...editMode,
            [listItem.id]: !editMode[listItem.id]
        });
    };

    const handleSave = (listItem, newDescription, newDate) => {
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                id: listItem.id, 
                description: newDescription,
                date: newDate,
                is_completed: listItem.is_completed, 
            }
        });

        setEditMode({ ...editMode, [listItem.id]: false });
    };


    const formatDate = (dateString) => {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };



    return (
        <div>
            <div className="buttons-container">
                <div className="mylistbuttons">
                    <AddListItemButton />
                    <ViewMyListButton />
                </div>
                <div className="vmluploadpagebutton">
                    <UploadPageButton />
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>Experiences</TableCell>
                        </TableRow>
                        <TableRow>                            
                            <TableCell>Date Created</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listItems.map((listItem) => {
                            const isItemCompleted = listItem.is_completed;
                            return (
                                <TableRow key={listItem.id} sx={{ textDecoration: isItemCompleted ? 'line-through' : 'none' }}>
                                    <TableCell>
                                        {editMode[listItem.id] ? (
                                            <TextField
                                                type="date"
                                                defaultValue={formatDate(listItem.date)}
                                                // defaultValue={listItem.date}
                                                sx={{ width: 220 }}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(event) => {
                                                    const updatedList = listItems.map((item) =>
                                                        item.id === listItem.id ? { ...item, date: event.target.value } : item
                                                    );
                                                    dispatch({ type: 'SET_LIST_ITEMS', payload: updatedList });
                                                }}
                                            />
                                        ) : (
                                            formatDate(listItem.date)
                                            // listItem.date
                                        )}
                                    </TableCell>
                                    <TableCell style={{ maxWidth: '200px' }}>
                                        {editMode[listItem.id] ? (
                                            <TextField
                                                fullWidth
                                                defaultValue={listItem.description}
                                                onChange={(event) => {
                                                    const updatedList = listItems.map((item) =>
                                                        item.id === listItem.id ? { ...item, description: event.target.value } : item
                                                    );
                                                    dispatch({ type: 'SET_LIST_ITEMS', payload: updatedList });
                                                }}
                                            />
                                        ) : (
                                            listItem.description
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {editMode[listItem.id] ? (
                                            <IconButton edge="end" aria-label="save" onClick={() => handleSave(listItem, listItem.description, listItem.date)}>
                                                <CheckBoxIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(listItem)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(listItem.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewMyListPage;