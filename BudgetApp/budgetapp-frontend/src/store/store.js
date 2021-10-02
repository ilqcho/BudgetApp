import {createStore} from 'redux';

const initialState = {
    operations: []
}

function reducer(state = initialState, action) {

    const newState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case 'ADD_OPERATION':
            newState.operations?.push(action.posts);
            return newState;

        case 'LIST_OPERATIONS':
            newState.operations = action.list;
            return newState;

        case 'DELETE_OPERATION':
            newState.operations = newState.operations.filter((oneOperation) => oneOperation.id !== action.idToRemove);
            return newState;

        default:
            return state;
    }
};

export default createStore(reducer);