import style from './list.less';
import TodoItem from './item.js';
import {FILTER_TYPE} from '../../utils/constant.js';

function getVisibleTodos(todos, filter) {

    switch (filter) {

        case FILTER_TYPE.All:
            return todos;
        case FILTER_TYPE.Completed:
            return todos.filter(todo => todo.completed);
        case FILTER_TYPE.Active:
            return todos.filter(todo => !todo.completed);

    }

}


class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: null
        };
        this.onEdit = this.onEdit.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.editing !== this.state.editing || nextProps.todos !== this.props.todos;
    }


    onEdit(id, val) {
        if (val) {
            this.setState((prevState) => ({
                editing: null
            }));
        } else {
            this.setState((prevState) => ({
                editing: id
            }));
        }


    }


    render() {


        let {onToggle, onEdit, onSave, onDestroy, onToggleAll, todos, activeFilter}=this.props;

        let visibleTodos = getVisibleTodos(todos, activeFilter);


        let completedCount = todos.filter(todo => todo.completed).length;

        let isToggleAll = todos.length != 0 && completedCount == todos.length ? true : false;
        return (
            <div className={style.main}>
                <input type="checkbox" className={style['toggle-all']} checked={isToggleAll}
                       onChange={(e) => {

                           if (todos.length == 0) {
                               return;
                           }
                           e.stopPropagation();
                           onToggleAll(isToggleAll);
                       }}/>
                <ul className={style.list}>
                    {
                        visibleTodos.map(todo =>
                            <TodoItem
                                todo={todo}
                                key={todo.id}
                                onToggle={(id) => onToggle(id)}
                                onEdit={(id) => this.onEdit(id)}
                                onSave={(text) => {
                                    onSave(todo.id, text);
                                    this.onEdit(todo.id, text);
                                }}
                                onDestroy={() => onDestroy(todo.id)}
                                editing={this.state.editing == todo.id}
                            />)
                    }

                    {/*(id) => onEdit(id)*/}
                </ul>
            </div>

        );
    };
}


export default TodoList;
