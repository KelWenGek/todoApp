import {action_type, APP_KEY, FILTER_TYPE} from '../../utils/constant.js';
import {Utils} from '../../utils/utils.js';
import {combineReducers} from 'redux-immutable';

function visibilityFilter(state = FILTER_TYPE.All, action) {
    switch (action.type) {
        case action_type.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function editing(state = null, action) {
    switch (action.type) {
        case action_type.EDIT_TODO:
            return action.id;

        case action_type.SAVE_TODO:
            return null;
        default:
            return state;
    }
}

function todos(state = Utils.store(APP_KEY), action) {

    switch (action.type) {
        //add a todo
        case action_type.ADD_TODO:

            state.some(todo => todo.text == action.text) || (
                state = state.add({
                    id: action.id,
                    text: action.text,
                    completed: false
                })
            );
            Utils.store(APP_KEY, state.toArray());
            return state;

        case action_type.CLEAR_COMPLETED:

            state = state.filter(todo => !todo.completed);
            Utils.store(APP_KEY, state.toArray());
            return state;
        case action_type.SAVE_TODO:

            state = state.map(todo => {
                if (action.id === todo.id) {
                    todo.text = action.text
                }
                return todo;
            });

            Utils.store(APP_KEY, state.toArray());
            return state;

        case action_type.DESTROY_TODO:
            state = state.filter(todo => todo.id !== action.id);
            Utils.store(APP_KEY, state.toArray());
            return state;

        case action_type.TOGGLE_TODO:

            state = state.map(todo => {
                if (action.id === todo.id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            Utils.store(APP_KEY, state.toArray());
            return state;
        case action_type.TOGGLE_ALL_TODO:

            state = state.map(todo => {

                todo.completed = !action.isToggleAll;

                return todo;
            });
            Utils.store(APP_KEY, state.toArray());
            return state;

        default:
            return state;
    }

}

export const todoApp = combineReducers({
    todos,
    // editing,
    visibilityFilter
});


