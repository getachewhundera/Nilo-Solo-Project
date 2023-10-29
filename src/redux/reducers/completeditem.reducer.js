// Used to store class and number of unique animals in that class
const completedReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_ALL_COMPLETED_LIST_ITEMS':
            return action.payload;
        default:
            return state;
    }
};

export default completedReducer;
