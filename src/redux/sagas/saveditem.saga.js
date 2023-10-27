import { takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

function* saveListItemSaga(action) {
  try {
    // Make an API call to update the isCompleted status in the database
    const response = yield axios.put(`/api/list/${action.payload.id}`, { isCompleted: !action.payload.isCompleted });
    
    // Dispatch an action to update the Redux store
    yield put({ type: 'UPDATE_LIST_ITEM', payload: response.data });
  } catch (error) {
    console.error('Save list item failed', error);
  }
}

function* mysaveditemsaga() {
  yield takeLatest('MARK_ITEM_COMPLETE', saveListItemSaga);
}

export default mysaveditemsaga;