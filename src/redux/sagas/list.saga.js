import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';


export function* rootSaga() {
  yield takeLatest('GET_ADDED_LIST_ITEMS', fetchListItems);
}; 


function* fetchListItems() {
  try { 
    const response = yield axios.get('/api/list'); 
    const action = { type: 'SET_LIST_ITEMS', payload: response.data }; 
    yield put(action)
  } catch (error) { 
    console.log(`Erorr in fetchListItems: ${error}`); 
    throw error 
  }
}
