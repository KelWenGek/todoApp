<template>
    <div class="main">
        <input type="checkbox" class="toggle-all" @change="toggleAll"
               :checked="isToggleAll" :disabled="todos.length==0">

        <ul class="list">
            <li v-for="todo in visibleTodos" class="item" :class="{completed:todo.completed,editing:editing==todo.id}">
                <div class="view">
                    <input type="checkbox" class="toggle" :checked="todo.completed" @change.stop="toggle(todo.id)">
                    <label class="text" @dblclick="edit(todo.id)">{{todo.text}}</label>
                    <button class="destroy" @click="destroy(todo.id)"></button>
                </div>
                <input v-focus type="text" class="edit" v-model="todo.text" @blur="save(todo.id,$event)"
                       @keydown.enter="save(todo.id,$event)">
            </li>
        </ul>
    </div>
</template>
<style src="./list.less" lang="less" scoped>

</style>
<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import {mutation_type, FILTER_TYPE} from '../../utils/constant.js';

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

    export default{
        data(){
            return {
                editing: null
            }
        },
        computed: Object.assign({}, mapState({
            todos: 'todos',
            visibleFilter: 'visibleFilter'

        }), mapGetters({
            completedTodos: 'completedTodos'
        }), {
            visibleTodos(){
                return getVisibleTodos(this.todos, this.visibleFilter);
            },
            isToggleAll(){
                return this.todos.length && this.todos.length == this.completedTodos.length;
            }
        }),
        methods: Object.assign({}, mapMutations({}), {
            toggle(id){
                this.$store.commit({
                    type: mutation_type.TOGGLE_TODO,
                    id
                })
            },
            toggleAll(){

                if (!this.todos.length) {
                    return false;
                }

                this.$store.commit({
                    type: mutation_type.TOGGLE_ALL_TODO,
                    checked: this.isToggleAll
                })
            },
            edit(id){
                this.editing = id;
//                this.$store.commit({
//                    type: mutation_type.EDIT_TODO,
//                    id
//                })
            },
            save(id, e){
                this.editing = null;
//                this.$store.commit({
//                    type: mutation_type.SAVE_TODO
//                })
                let val = e.target.value.trim();
                if (!val) {
                    this.destroy(id);
                }
            },
            destroy(id){
                this.$store.commit({
                    type: mutation_type.DESTROY_TODO,
                    id
                })
            }

        }),
        directives: {
            focus: {
                update(el){
                    el.focus();
                }
            }
        },
        components: {}
    }
</script>
