import {editTodo, toggleTodo, saveTodo, destroyTodo, toggleAllTodo} from '../store/action/index.js';
import {connect} from 'react-redux';
import TodoList from '../component/list/list.js';


function mapStateToProps(state) {

    return {
        activeFilter: state.visibilityFilter,
        todos: state.todos
        // editing: state.editing

    }
}


function mapDispatchToProps(dispatch) {
    return {
        onToggle: (id) => {
            dispatch(toggleTodo(id));
        },
        // onEdit: (id) => {
        //     dispatch(editTodo(id));
        // },
        onSave: (id, text) => {
            dispatch(saveTodo(id, text))
        },
        onDestroy: (id) => {
            dispatch(destroyTodo(id))
        },
        onToggleAll: (isToggleAll) => {
            dispatch(toggleAllTodo(isToggleAll))
        }
    }
}


let VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
