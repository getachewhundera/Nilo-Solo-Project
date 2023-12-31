const initialState = {
  uploadedContent: [],
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
    case 'UPDATE_ALL_ITEMS_FOR_VIEWING':
      return {
        ...state,
        uploadedContent: [...action.payload],
      };
    case 'DELETE_POST_SUCCESS':
      return state.filter((post) => post.id !== action.payload);

    case 'DELETE_POST_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default uploadPostReducer;

