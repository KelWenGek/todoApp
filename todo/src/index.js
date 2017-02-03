import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {todoApp} from './store/reducer/index.js';
import App from './component/app/app.js';
let store = createStore(todoApp);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
)