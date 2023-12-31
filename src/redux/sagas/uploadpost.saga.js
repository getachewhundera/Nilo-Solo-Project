import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadContent(action) {
  try {
    console.log('Dispatch made it to saga:', action.payload);
    const formData = new FormData();
    console.log('this is the form data', formData); 
    formData.append('image', action.selectedFile);
    const postUrl = `/api/upload/image?imageName=${encodeURIComponent(action.payload.fileName)}&imageType=${encodeURIComponent(action.payload.fileType)}`;
    // upload the image
    console.log('filename and filetype made it back', postUrl)
    const response = yield axios.post(postUrl, formData);
    console.log(response.data)
    // submit the form data along with the image url
    const results = yield axios.post('/api/upload', {...action.payload, file_url: response.data.file_url});
    console.log('Content was sent to server');
    
    yield put({ type: 'SET_UPLOADED_CONTENT', payload: results.data });
    yield put({ type: 'CLEAR_FORM' });
  } catch (error) {
    console.log('Upload content to server failed', error);
    alert('Something went wrong');
  }
}

function* uploadPost() {
  yield takeLatest('SEND_POST_SERVER', uploadContent);
}

export default uploadPost;