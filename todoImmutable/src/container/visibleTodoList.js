import { toggleTodo, saveTodo, destroyTodo, toggleAllTodo} from '../store/action/index.js';
import {connect} from 'react-redux';
import TodoList from '../component/list/list.js';


function mapStateToProps(state) {
    return {
        activeFilter: state.get('visibilityFilter'),
        todos: state.get('todos')

    }
}


function mapDispatchToProps(dispatch) {
    return {
        onToggle: (id) => {
            dispatch(toggleTodo(id));
        },
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
