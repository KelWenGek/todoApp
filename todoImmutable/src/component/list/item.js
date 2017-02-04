import style from './list.less';
import cn from 'classnames';
import {ENTER_KEY} from '../../utils/constant.js';
import {is} from 'immutable';
class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !is(nextProps.todo, this.props.todo) ||
            nextProps.editing !== this.props.editing;
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            this.textInput.focus();
        }
    }

    handleSubmit(e) {
        let val = e.target.value;
        if (val) {
            this.props.onSave(val);
        } else {
            this.props.onDestroy();
        }
    }

    render() {
        let todo = this.props.todo;
        return (
            <li className={cn(style.item, [todo.get('completed') ? style.completed : '', this.props.editing ? style.editing : ''
            ])}>
                <div className={style.view}>
                    <input type="checkbox" className={style.toggle} checked={todo.get('completed')}
                           onChange={(e) => {
                               e.stopPropagation();
                               this.props.onToggle();
                           }}/>
                    <label className={style.text} onDoubleClick={(e) => {
                        e.stopPropagation();
                        this.props.onEdit();
                    }}
                    >{todo.get('text')}</label>
                    <button className={style.destroy} onClick={e => {
                        e.stopPropagation();
                        this.props.onDestroy();
                    }}/>
                </div>
                <input ref={(input) => {
                    this.textInput = input;
                }} type="text" className={style.edit} defaultValue={todo.get('text')}
                       onKeyDown={(e) => {
                           e.stopPropagation();
                           if (e.keyCode == ENTER_KEY) {
                               this.handleSubmit(e);
                           }
                       }}
                       onBlur={
                           e => {
                               e.stopPropagation();
                               this.handleSubmit(e);
                           }
                       }
                />
            </li>
        );
    }
}

export default TodoItem;