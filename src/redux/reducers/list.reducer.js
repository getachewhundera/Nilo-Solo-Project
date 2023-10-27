
// Used to store class and number of unique animals in that class
const listReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST_ITEMS':
            return action.payload;
        case 'UPDATE_LIST_ITEM':
            return state.map(item =>
                item.id === action.payload.id ? { ...item, isCompleted: !item.isCompleted } : item
            );
        default:
            return state;
    }
};

export default listReducer;

