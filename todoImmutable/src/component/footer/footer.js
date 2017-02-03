import style from './footer.less';
import {Utils} from '../../utils/utils.js';
import cn from 'classnames';
import {FILTER_TYPE} from '../../utils/constant.js';
class TodoFooter extends React.Component {

    render() {
        let {activeFilter, onFilter, onClear, todos}=this.props;

        let leftItem = todos.filter(todo => !todo.completed).size;

        let completedCount = todos.filter(todo => todo.completed).size;

        return (

            <div className={cn(style.footer, [todos.size != 0 ? style.show : ''])}>

                <span className={style.count}>
                    <strong>{leftItem}</strong>
                    <span>&nbsp;</span>
                    <span>{Utils.pluralize(leftItem, 'item')}</span>
                    <span>&nbsp;</span>
                    <span>left</span>
                </span>

                <ul className={style.filters}>


                    {Reflect.ownKeys(FILTER_TYPE).map(filter => (

                        <li className={style.filter} key={filter}>
                            <a href="#" className={cn(activeFilter == FILTER_TYPE[filter] ? style.selected : '')}
                               onClick={(e) => {
                                   e.preventDefault();
                                   onFilter(FILTER_TYPE[filter]);
                               }}>
                                {filter}
                            </a>
                        </li>

                    ))}


                </ul>
                <button className={style['clear-completed']}
                        style={completedCount == 0 ? {display: 'none'} : {display: 'block'}}
                        onClick={onClear}>
                    Clear completed
                </button>

            </div>



        );
    }
}

export default TodoFooter;