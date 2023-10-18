const uploadPostReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_UPLOADED_CONTENT':
        return action.payload;
      default:
        return state;
    }
  };

  export default uploadPostReducer;
