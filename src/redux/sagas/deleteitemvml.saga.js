import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

function* deleteListItemSaga(action) {
  try {
    // Make an API call to delete the item from the database
    yield call(axios.delete, `/api/list/${action.payload.id}`);
    
    // Dispatch an action to remove the item from the Redux store
    yield put({ type: 'DELETE_LIST_ITEM', payload: action.payload.id });
  } catch (error) {
    console.error('Delete list item failed', error);
  }
}

function* deleteitemSaga() {
  yield takeLatest('DELETE_LIST_ITEM_SAGA', deleteListItemSaga);
}

export default deleteitemSaga;