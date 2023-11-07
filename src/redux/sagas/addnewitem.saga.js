import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* AddNewItem(action) {
  try {
    const response = yield axios.post('/api/list', action.payload);
   
    yield put({ type: 'ADD_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
  
    yield put({ type: 'ADD_ITEM_FAILED', payload: error.response.data });
  }
}

function* addItemSaga() {
  yield takeLatest('ADD_NEW_ITEM', AddNewItem);
}

export default addItemSaga;