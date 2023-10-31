const initialState = {
  uploadedContent: null,
  fileName: '',
  fileType: '',
  selectedFile: null,
  imagePreview: null,
};

function uploadPostReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_UPLOADED_CONTENT':
      return { ...state, uploadedContent: action.payload };
    case 'CLEAR_FORM':
      return { ...state, fileName: '', fileType: '', selectedFile: null, imagePreview: null };
    default:
      return state;
  }
}

export default uploadPostReducer;
