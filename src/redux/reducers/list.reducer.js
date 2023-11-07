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
                error: null,
            };
        case 'ADD_ITEM_FAILED':
            return {
                ...state,
                error: action.payload,
            };

        case 'SET_LIST_ITEMS':
            return {
                ...state,
                listItems: action.payload,
                error: null,
            };
        case 'FETCH_LIST_ITEMS_FAILED':
            return {
                ...state,
                error: action.payload,
            };
        case 'SET_UPDATED_ITEM':
            return {
                ...state,
                listItems: state.listItems.map(item =>
                    item.id === action.payload.id ? { ...action.payload } : item
                ),
            };
        case 'UPDATE_ITEM_FAILED':
            return {
                ...state,
                error: action.payload,
            };
        case 'DELETE_ITEM_FAILED':
            return {
                ...state,
                error: action.payload,
            };       
        case 'REMOVE_ITEM_FROM_LIST':
            return {
                ...state,
                listItems: state.listItems.filter(item => item.id !== action.payload),
            };       
        default:
            return state;

    }
};

export default listReducer;

