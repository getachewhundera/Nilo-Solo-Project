// updatelistitemvml.saga.js
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga to handle the UPDATE_ITEM action
function* updateListItemSaga(action) {
  try {
    // Destructure the payload
    const { id, description, date, is_completed } = action.payload;
    const response = yield call(axios.put, `/api/list/${id}`, {
      description,
      date,
      is_completed,
    });
    yield put({ type: 'SET_UPDATED_ITEM', payload: response.data });
    yield put({ type: 'FETCH_LIST_ITEMS' });
  } catch (error) {
    console.error('Update list item failed', error);
    yield put({ type: 'UPDATE_ITEM_FAILED', payload: error.message });
  }
}
function* myUpdateItemSaga() {
  yield takeLatest('UPDATE_ITEM', updateListItemSaga);
}

export default myUpdateItemSaga;