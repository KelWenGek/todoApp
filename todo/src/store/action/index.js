import {action_type} from '../../utils/constant.js';
import {Utils} from '../../utils/utils.js';
export function addTodo(text) {
    return {
        type: action_type.ADD_TODO,
        id: Utils.uuid(),
        text
    }
}

export function toggleTodo(id) {
    return {
        type: action_type.TOGGLE_TODO,
        id: id

    }
}

export function toggleAllTodo(isToggleAll) {
    return {
        type: action_type.TOGGLE_ALL_TODO,
        isToggleAll
    }
}


export function editTodo(id) {
    return {
        type: action_type.EDIT_TODO,
        id: id
    }
}


export function saveTodo(id, text) {
    return {
        type: action_type.SAVE_TODO,
        id,
        text
    }
}

export function destroyTodo(id) {
    return {
        type: action_type.DESTROY_TODO,
        id
    }
}


export function clearCompleted() {
    return {
        type: action_type.CLEAR_COMPLETED
    }
}


export const setVisibilityFilter = (filter) => {
    return {
        type: action_type.SET_VISIBILITY_FILTER,
        filter
    }
}