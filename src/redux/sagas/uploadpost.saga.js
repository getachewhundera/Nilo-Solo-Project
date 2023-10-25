import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "SEND_POST_SERVER" actions
function* uploadContent(action) {
  try {
    console.log('dispatch made it too saga;', action.payload); 
    const response = yield axios.post('/api/upload', action.payload);
    console.log('content was sent to server'); 
    yield put({ type: 'SET_UPLOADED_CONTENT', payload: response.data });
  } catch (error) {
    alert('Somthing went wrong'); 
    // console.log(`Error in addUploadedPost: ${error}`);
    console.log('Upload Content to server failed', error);
    throw error
  }
}

function* uploadPost() {
  yield takeLatest('SEND_POST_SERVER', uploadContent);
}

export default uploadPost;


