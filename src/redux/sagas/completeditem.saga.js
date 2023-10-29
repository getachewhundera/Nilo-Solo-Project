import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* completedSaga(action) {
    try {
        // Make an API call to GET the items that are true(isCompleted = TRUE) from the database. 
        const response = yield axios.get('/api/list/completed');

        // Dispatch an action to update redux store with all the items that are completed (isCompleted = TRUE). 
        yield put({ type: 'UPDATE_ALL_COMPLETED_LIST_ITEMS', payload: response.data });

    } catch (error) {
        console.error('Get completed list item failed', error);
    }
}

function* completedListSaga() {
    yield takeLatest('GET_COMPLETED_LIST_ITEMS', completedSaga); 
}

export default completedListSaga; 