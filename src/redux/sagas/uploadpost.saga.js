import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "SEND_POST_SERVER" actions

function* uploadContent(action) {
  try {
    console.log('Dispatch made it to saga:', action.payload);
    const formData = new FormData();
    formData.append('image', action.selectedFile);
    const postUrl = `/api/upload/image?imageName=${encodeURIComponent(action.payload.fileName)}&imageType=${encodeURIComponent(action.payload.fileType)}`;
    // upload the image
    const response = yield axios.post(postUrl, formData);
    console.log(response.data)
    // submit the form data along with the image url
    const results = yield axios.post('/api/upload', {...action.payload, file_url: response.data.file_url})
    console.log('Content was sent to server');
    
    yield put({ type: 'SET_UPLOADED_CONTENT', payload: results.data });
    yield put({ type: 'CLEAR_FORM' }); // Dispatch an action to clear the form
  } catch (error) {
    console.log('Upload content to server failed', error);
    alert('Something went wrong');
  }
}

// const sendPhotoToServer = (event) => {
//   event.preventDefault();
//   const formData = new FormData();
//   formData.append('image', selectedFile);
//   let postUrl = `/api/images?imageName=${fileName}&imageType=${fileType}`;
//   axios.post(postUrl, formData).then(response => {
//     console.log('Success!');
//     alert('Success!');
//     clearForm();
//     getImages();
//   }).catch(error => {
//     console.log('error', error);
//     alert('Something went wrong');
//   })
// }


function* uploadPost() {
  yield takeLatest('SEND_POST_SERVER', uploadContent);
}

export default uploadPost;

