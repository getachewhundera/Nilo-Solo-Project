import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "ADD_NEW_ITEM" actions
function* AddNewItem(action) {
  try {
    const response = yield axios.post('/api/list', action.payload);
    // Dispatches a success action with the response data
    yield put({ type: 'ADD_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
    // Dispatches an action to handle the error with error response
    yield put({ type: 'ADD_ITEM_FAILED', payload: error.response.data });
  }
}

function* addItemSaga() {
  yield takeLatest('ADD_NEW_ITEM', AddNewItem);
}

export default addItemSaga;