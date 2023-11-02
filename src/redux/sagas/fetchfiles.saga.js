import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* fetchFilesSaga() {
    try {
        // Make an API call to GET the files from server 
        const result = yield axios.get('/api/upload');
        console.log('these are the results', result); 

        // Dispatch an action to update redux store with all the files. 
       
        yield put({ type: 'UPDATE_ALL_ITEMS_FOR_VIEWING', payload: result.data });

    } catch (error) {
        console.error('Get all files failed', error);
    }
}

function* fetchFiles() {
    yield takeLatest('FETCH_ITEMS_FOR_FEED', fetchFilesSaga);
}

export default fetchFiles; 
