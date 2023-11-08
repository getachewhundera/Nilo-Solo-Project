import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteListItemSaga(action) {
  try {
   
    const response = yield axios.delete(`/api/list/${action.payload}`);
    if (response.status === 204) {
      yield put({ type: 'REMOVE_ITEM_FROM_LIST', payload: action.payload });
    } else {
    
      yield put({ type: 'DELETE_ITEM_FAILED', payload: `Unexpected response code: ${response.status}` });
    }
  } catch (error) {
    console.error('Delete list item request failed', error);
    
    yield put({ type: 'DELETE_ITEM_FAILED', payload: error.response?.data || error.message });
  }
}

function* deleteitemSaga() {
  yield takeLatest('DELETE_ITEM', deleteListItemSaga);
}

export default deleteitemSaga;