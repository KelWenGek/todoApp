import Vuex from 'vuex';
import {Utils} from '../utils/utils.js';
import {mutation_type, FILTER_TYPE, APP_KEY} from '../utils/constant.js';
Vue.use(Vuex);


export const store = new Vuex.Store({

    state: {
        todos: Utils.store(APP_KEY),
        visibleFilter: FILTER_TYPE.All
    },
    mutations: {
        [mutation_type.ADD_TODO](state, {text}){
            state.todos = [...state.todos, {
                id: Utils.uuid(),
                text,
                completed: false
            }];
            Utils.store(APP_KEY, state.todos);
        },
        [mutation_type.TOGGLE_TODO](state, {id}){
            state.todos = Array.from(state.todos, (todo) => {
                if (todo.id == id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            Utils.store(APP_KEY, state.todos);
        },
        [mutation_type.TOGGLE_ALL_TODO](state, {checked}){
            state.todos = Array.from(state.todos, todo => {
                todo.completed = !checked;
                return todo;
            });
            Utils.store(APP_KEY, state.todos);
        },

        [mutation_type.DESTROY_TODO](state, {id}){
            state.todos = state.todos.filter(todo => todo.id != id);
            Utils.store(APP_KEY, state.todos);
        },
        [mutation_type.SET_VISIBILITY_FILTER](state, {filter}){
            state.visibleFilter = filter;
        },
        [mutation_type.CLEAR_COMPLETED](state){
            state.todos = state.todos.filter(todo => !todo.completed);
            Utils.store(APP_KEY, state.todos);
        }
    },

    getters: {
        completedTodos(state){
            return state.todos.filter(todo => todo.completed);
        },
        unCompletedTodos(state){
            return state.todos.filter(todo => !todo.completed);
        }
    }

});

