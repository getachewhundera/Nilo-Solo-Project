import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* fetchFilesSaga() {
    try {       
        const result = yield axios.get('/api/upload');
        console.log('these are the results', result); 
        yield put({ type: 'UPDATE_ALL_ITEMS_FOR_VIEWING', payload: result.data });
    } catch (error) {
        console.error('Get all files failed', error);
    }
}

function* fetchFiles() {
    yield takeLatest('FETCH_ITEMS_FOR_FEED', fetchFilesSaga);
}

export default fetchFiles; 
