import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "SEND_POST_SERVER" actions

function* uploadContent(action) {
  try {
    console.log('Dispatch made it to saga:', action.payload);
    const formData = new FormData();
    formData.append('image', action.payload.selectedFile);
    const postUrl = `/api/image?imageName=${encodeURIComponent(action.payload.fileName)}&imageType=${encodeURIComponent(action.payload.fileType)}`;
    const response = yield call(axios.post, postUrl, formData);
    console.log('Content was sent to server');
    yield put({ type: 'SET_UPLOADED_CONTENT', payload: response.data });
    yield put({ type: 'CLEAR_FORM' }); // Dispatch an action to clear the form
  } catch (error) {
    console.log('Upload content to server failed', error);
    alert('Something went wrong');
  }
}

function* uploadPost() {
  yield takeLatest('SEND_POST_SERVER', uploadContent);
}

export default uploadPost;

