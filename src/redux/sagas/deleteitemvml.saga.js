import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';


function* deleteListItemSaga(action) {
  try {
    const response = yield axios.delete(`/api/list/${action.payload.id}?isCompleted=${action.payload.isCompleted}`);
    console.log('Delete response:', response.data);
    // You might want to dispatch another action here to refresh the list
  } catch (error) {
    console.error('Delete list item request failed', error);
  }
}

// function* deleteListItemSaga(action) {
//   try {
//     if (!action.payload.is_completed) {
//       yield axios.delete(`/api/list/${action.payload.id}`);
//       yield put({ type: 'DELETE_LIST_ITEM', payload: action.payload.id });
//     } else {
//       console.log('Item is already completed and cannot be deleted');
//     }
//   } catch (error) {
//     console.error('Delete list item failed', error);
//   }
// }
function* deleteitemSaga() {
  yield takeLatest('DELETE_LIST_ITEM_SAGA', deleteListItemSaga);
}

export default deleteitemSaga;