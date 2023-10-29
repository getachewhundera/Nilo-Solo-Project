const initialState = [];
// Used to store class and number of unique animals in that class
const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIST_ITEMS':
            return [...state, action.payload];
        case 'UPDATE_LIST_ITEM':
            return state.map(item =>
                item.id === action.payload.id ? { ...item, isCompleted: !item.isCompleted } : item
            );
        case 'REMOVE_ITEM_FROM_LIST':
            return state.filter(item => item.id !== action.payload);
        case 'DELETE_LIST_ITEM':
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};

export default listReducer;

