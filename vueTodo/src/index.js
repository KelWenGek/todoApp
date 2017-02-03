import App from './component/app/app.vue';
import {store} from './store/index.js';


let app = new Vue({
    el: '#root',
    store,
    render: h => h(App)
})