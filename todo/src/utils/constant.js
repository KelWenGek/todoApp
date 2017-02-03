export const action_type = {
    ADD_TODO: Symbol('add_todo'),
    TOGGLE_TODO: Symbol('toggle_todo'),
    TOGGLE_ALL_TODO: Symbol('toggle_all_todo'),
    EDIT_TODO: Symbol('edit_todo'),
    SAVE_TODO: Symbol('save_todo'),
    DESTROY_TODO: Symbol('destroy_todo'),
    CLEAR_COMPLETED: Symbol('clear_completed'),
    SET_VISIBILITY_FILTER: Symbol('set_visibility_filter')
}


export const APP_KEY = 'react-todo';


export const ENTER_KEY = 13;


export const FILTER_TYPE = {
    All: 'SHOW_ALL',
    Active: 'SHOW_ACTIVE',
    Completed: 'SHOW_COMPLETED'
}