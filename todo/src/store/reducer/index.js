import {action_type, APP_KEY, FILTER_TYPE} from '../../utils/constant.js';
import {Utils} from '../../utils/utils.js';
import {combineReducers} from 'redux';

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
        case action_type.ADD_TODO:


            let todos = [
                ...state, {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
            Utils.store(APP_KEY, todos);
            return todos;
        case action_type.CLEAR_COMPLETED:
            let clearedTodos = state.filter(todo => !todo.completed);
            Utils.store(APP_KEY, clearedTodos);
            return clearedTodos;
        case action_type.SAVE_TODO:
            let edited_todos = Array.from(state, todo => {
                if (action.id === todo.id) {
                    todo.text = action.text
                }
                return todo;
            });
            Utils.store(APP_KEY, edited_todos);
            return edited_todos;

        case action_type.DESTROY_TODO:
            let destroy_todos = state.filter(todo => todo.id !== action.id);
            Utils.store(APP_KEY, destroy_todos);
            return destroy_todos;

        case action_type.TOGGLE_TODO:

            return Array.from(state, todo => {
                if (action.id === todo.id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });


        case action_type.TOGGLE_ALL_TODO:

            return Array.from(state, todo => {
                todo.completed = !action.isToggleAll;
                return todo;
            })
        default:
            return state;
    }

}


export const todoApp = combineReducers({
    todos,
    editing,
    visibilityFilter
});


