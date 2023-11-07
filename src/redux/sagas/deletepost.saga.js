import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';



function* deletePost(action) {
    try {
        const response = yield call(axios.delete, `/api/upload/${action.payload}`);
        if (response.status === 204) {
            yield put({ type: 'DELETE_POST_SUCCESS', payload: action.payload });
        }
    } catch (error) {
        console.log('Delete post request failed', error);
        yield put({ type: 'DELETE_POST_FAILURE', payload: error });
    }
}

function* deletePostSaga() {
    yield takeEvery('DELETE_POST', deletePost);
}


export default deletePostSaga;