
// Used to store class and number of unique animals in that class
const listReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST_ITEMS':
          return action.payload;
        default:
          return state;
    }
  }; 
  
  export default listReducer; 

