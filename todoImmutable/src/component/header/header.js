import style from './header.less';
import cn from 'classnames';

class TodoHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className={style.title}>
                    todos
                </h1>
                <input type="text"
                       placeholder="what needs to be done?"
                       className={style['new-todo']}

                />
            </div>
        );
    }
}


export default TodoHeader;