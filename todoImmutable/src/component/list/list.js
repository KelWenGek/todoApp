import style from './list.less';
import TodoItem from './item.js';
import {FILTER_TYPE} from '../../utils/constant.js';
import {ENTER_KEY} from '../../utils/constant.js';
import {Map, is, fromJS} from 'immutable';
import cn from 'classnames';
function getVisibleTodos(todos, filter, search) {
    todos = todos.filter(todo => todo.text.includes(search));
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
            searchFilter: '',
            isSearching: false,
            editing: null
        };
        this.onEdit = this.onEdit.bind(this);
        this.onToggleSearch = this.onToggleSearch.bind(this);
        this.onSearchFilter = this.onSearchFilter.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.todos !== this.props.todos ||
	        nextProps.activeFilter !== this.props.activeFilter ||
            nextState.editing !== this.state.editing ||
            nextState.isSearching !== this.state.isSearching ||
            nextState.searchFilter !== this.state.searchFilter;
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isSearching && this.state.isSearching) {
            this.searchInput.focus();
        }
    }

    onEdit(id, val) {
        if (val) {
            this.setState((prevState) => ({
	            editing: null,
            }));
        } else {
            this.setState((prevState) => ({
                editing: id
            }));
        }
    }

    onToggleSearch() {
        this.setState((prevState) => ({
            isSearching: !prevState.isSearching,
            searchFilter: ''
        }));
    }

    onSearchFilter(searchFilter) {
        this.setState((prevState) => ({
            searchFilter: searchFilter
        }));
    }

    render() {

        let {onToggle, onSave, onDestroy, onToggleAll, todos, activeFilter}=this.props;
        let visibleTodos = getVisibleTodos(todos, activeFilter, this.state.searchFilter);
        let completedCount = todos.filter(todo => todo.completed).size;
        let isToggleAll = todos.size != 0 && completedCount == todos.size;
        return (
            <div className={style.main}>
                <input type="checkbox" className={style['toggle-all']} checked={isToggleAll}
                       onChange={(e) => {
                           if (todos.size == 0) {
                               return;
                           }
                           e.stopPropagation();
                           onToggleAll(isToggleAll);
                       }}/>
                <div onClick={this.onToggleSearch}
                     className={style.filter}
                >
                    Filter
                </div>
                <div className={cn(style.bar, [this.state.isSearching ? style.show : ''])}>
                    <input type="text"
                           className={style.search}
                           placeholder="what needs to be searched?"
                           ref={(input) => {
                               this.searchInput = input;
                           }}
                           onKeyDown={e => {
                               e.stopPropagation();
                               let searchVal = e.target.value.trim();
                               if (!searchVal) {
                                   return;
                               }
                               if (e.keyCode == ENTER_KEY) {
                                   this.onSearchFilter(searchVal);
                                   e.target.value = '';
                               }
                           }}
                    />
                    <div className={style.cancel}
                         onClick={this.onToggleSearch}
                    >
                        Cancel
                    </div>
                </div>
                <ul className={style.list}>
                    {
                        visibleTodos.map(todo => <TodoItem
                            todo={fromJS(todo)}
                            key={todo.id}
                            onToggle={() => onToggle(todo.id)}
                            onEdit={() => this.onEdit(todo.id)}
                            onSave={(text) => {
                                onSave(todo.id, text);
                                this.onEdit(todo.id, text);
	                            {/*this.setState({*/
	                            }
	                            {/*isSearching:false,*/
	                            }
	                            {/*searchFilter:''*/
	                            }
	                            {/*});*/
	                            }
                            }}
                            onDestroy={() => onDestroy(todo.id)}
                            editing={this.state.editing == todo.id}
                        />)
                    }
                </ul>
            </div>
        );
    };
}

export default TodoList;
