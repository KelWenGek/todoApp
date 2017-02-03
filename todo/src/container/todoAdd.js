import style from '../component/header/header.less';
import {ENTER_KEY} from '../utils/constant.js';
import {addTodo} from '../store/action/index.js';
import {connect} from 'react-redux';
import TodoHeader from '../component/header/header.js';


let AddTodo = ({dispatch}) => {


    return (
        <div>
            <h1 className={style.title}>
                todos
            </h1>
            <input type="text"
                   placeholder="what needs to be done?"
                   className={style['new-todo']}
                   autoFocus={true}
                   onKeyDown={(e) => {
                       e.stopPropagation();
                       let val = e.target.value.trim();
                       if (!val) {
                           return;
                       }
                       if (e.keyCode == ENTER_KEY) {
                           dispatch(addTodo(val));
                           e.target.value = '';
                       }
                   }}
            />
        </div>

    );


}


AddTodo = connect()(AddTodo);

export default AddTodo;