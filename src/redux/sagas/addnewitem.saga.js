import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "SEND_POST_SERVER" actions
function* AddNewItem(action) {
  try {
    console.log('Action payload in saga:', action.payload);
    const response = yield axios.post('/api/list', action.payload ); 
    yield put({ type: 'SET_LIST_ITEMS', payload: response.data });
  } catch (error) {
    alert('Add item failed');
    // console.log(`Error in addUploadedPost: ${error}`);
    console.log('Adding list item to server failed', error);
    throw error
  }
}

function* addItem() {
  yield takeLatest('ADD_NEW_ITEM', AddNewItem);
}

export default addItem;

