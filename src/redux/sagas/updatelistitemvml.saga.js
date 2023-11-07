// updatelistitemvml.saga.js
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga to handle the UPDATE_ITEM action
function* updateListItemSaga(action) {
  try {
    // Destructure the payload
    const { id, description, date, is_completed } = action.payload;

    // Call the API endpoint to update the item
    const response = yield call(axios.put, `/api/list/${id}`, {
      description,
      date,
      is_completed,
    });

    // If the request is successful, dispatch a SET_UPDATED_ITEM action with the updated item data
    yield put({ type: 'SET_UPDATED_ITEM', payload: response.data });

    // Optionally, you might want to refetch the list items to have the most updated data
    yield put({ type: 'FETCH_LIST_ITEMS' });
  } catch (error) {
    // If the request fails, log the error and dispatch an UPDATE_ITEM_FAILED action
    console.error('Update list item failed', error);
    yield put({ type: 'UPDATE_ITEM_FAILED', payload: error.message });
  }
}

// Watcher saga to take the latest dispatched UPDATE_ITEM action
function* myUpdateItemSaga() {
  yield takeLatest('UPDATE_ITEM', updateListItemSaga);
}

export default myUpdateItemSaga;