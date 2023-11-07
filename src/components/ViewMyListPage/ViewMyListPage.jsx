import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ViewMyListPage.css';
import {
    AddListItemButton,
    ViewMyListButton,
    CompletedButton,
    MapPageButton
} from "../MyListButtons/MyListButtons.jsx";
import { UploadPageButton } from "../RouteButtons/RouteButtons.jsx";
import axios from 'axios';
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
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function ViewMyListPage() {
    const dispatch = useDispatch();
    const listItems = useSelector((state) => state.listReducer.listItems);
    const [editMode, setEditMode] = useState({});

    useEffect(() => {
        dispatch({ type: 'FETCH_LIST_ITEMS' }); // Dispatch action to request list items
    }, [dispatch]);

    const handleToggleCompletion = (listItem) => {
        // Dispatch action to toggle completion status
        dispatch({ type: 'TOGGLE_ITEM_COMPLETION', payload: listItem.id });
    };

    const handleDelete = (itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch({ type: 'DELETE_ITEM', payload: itemId }); // Dispatch action to delete item
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
                id: listItem.id, // make sure you send the id
                description: newDescription,
                date: newDate,
                is_completed: listItem.is_completed, // make sure this matches your database schema
            }
        });

        setEditMode({ ...editMode, [listItem.id]: false });
    };



    return (
        <div>
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>Experiences</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> </TableCell>
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
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            edge="start"
                                            checked={isItemCompleted}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${listItem.id}` }}
                                            onChange={() => handleToggleCompletion(listItem)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {editMode[listItem.id] ? (
                                            <TextField
                                                type="date"
                                                defaultValue={listItem.date}
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
                                            listItem.date
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