import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchListItems() {
    try {
        const response = yield axios.get('/api/list');
        yield put({ type: 'SET_LIST_ITEMS', payload: response.data }); 
    } catch (error) {
        console.log(`Error in fetchListItems: ${error}`);
        yield put({ type: 'FETCH_LIST_ITEMS_FAILED', payload: error.message }); 
    }
}

function* listSaga() {
    yield takeLatest('FETCH_LIST_ITEMS', fetchListItems); 
};

export default listSaga;