import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "SEND_POST_SERVER" actions
function* AddNewItem() {
  try {
    yield axios.post('/api/List', action.payload);
    yield put({ type: 'SET_LIST_ITEMS', payload: response.data });
  } catch (error) {
    alert('Somthing went wrong'); 
    // console.log(`Error in addUploadedPost: ${error}`);
    console.log('Adding list item to server failed', error);
    throw error
  }
}

function* uploadPost() {
  yield takeLatest('ADD_NEW_ITEM', AddNewItem);
}

export default uploadPost;

