import style from './app.less';
import AddTodo from '../../container/todoAdd.js';
import VisibleTodoList from '../../container/visibleTodoList.js';
import FilterBar from '../../container/filterBar.js';
class App extends React.Component {


    render() {

        return (
            <div className={style.app}>
                <AddTodo/>
                <VisibleTodoList/>
                <FilterBar/>
            </div>

        );


    }

}

export default App;