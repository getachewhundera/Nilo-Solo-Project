import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* saveListItemSaga(action) {
  try {
    // Make an API call to update the isCompleted status in the database
    const response = yield axios.put(`/api/list/${action.payload.id}`, { isCompleted: !action.payload.isCompleted });

    // Dispatch an action to update the Redux store
    yield put({ type: 'UPDATE_LIST_ITEM', payload: response.data });

    // Dispatch an action to remove the item from the local state if it is marked as completed
    if (response.data.isCompleted) {
      yield put({ type: 'REMOVE_ITEM_FROM_LIST', payload: response.data.id });
    }
    
    } catch (error) {
      console.error('Save list item failed', error);
    }
  }

function* mysaveditemsaga() {
    yield takeLatest('MARK_ITEM_COMPLETE', saveListItemSaga);
  }



  export default mysaveditemsaga;