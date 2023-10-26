const initialState = [];
  
  const addNewItemsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LIST_ITEMS':
        return [...state, action.payload];
      default:
        return state;
    }
  };
  export default addNewItemsReducer;


