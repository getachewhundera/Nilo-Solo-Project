const initialState = {
    listItems: [],
    error: null,
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM_SUCCESS':
            return {
                ...state,
                listItems: [...state.listItems, action.payload],
                error: null, // Clear any errors
            };
        case 'ADD_ITEM_FAILED':
            return {
                ...state,
                error: action.payload, // Set the error received from the saga
            };
        case 'FETCH_UPDATED_LIST_ITEMS': // case to handle fetched list items
            return {
                ...state,
                listItems: action.payload,
                error: null,
            };
        case 'UPDATE_LIST_ITEM':
            return {
                ...state,
                listItems: state.listItems.map(item =>
                    item.id === action.payload.id ? { ...item, isCompleted: !item.isCompleted } : item
                ),
            };
        case 'REMOVE_ITEM_FROM_LIST':
            return {
                ...state,
                listItems: state.listItems.filter(item => item.id !== action.payload),
            };
        case 'DELETE_LIST_ITEM':
            return {
                ...state,
                listItems: state.listItems.filter(item => item.id !== action.payload),
            };
        default:
            return state;

    }
};

export default listReducer;

