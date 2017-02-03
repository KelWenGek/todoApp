<template>
    <div class="footer" v-show="todos.length!=0">
            <span class="count">
                <strong>{{leftItem}}</strong>
                <span></span>
                <span>{{items}}</span>
                <span>left</span>

            </span>
        <ul class="filters">
            <li v-for="(filterValue,filterKey) in filters" class="filter">
                <a href="#" :class="{selected:filterValue==activeFilter}"
                   @click.prevent="setVisibleFilter(filterValue)">
                    {{filterKey}}
                </a>
            </li>

        </ul>
        <button class="clear-completed" v-show="completedTodos.length!=0" @click="clearCompleted">Clear completed
        </button>
    </div>
</template>
<style lang="less" src="./footer.less" scoped>


</style>
<script>
    import {Utils} from '../../utils/utils.js';
    import {mutation_type, FILTER_TYPE} from '../../utils/constant.js';
    import {mapState, mapGetters} from 'vuex';
    export default{
        name: 'todo-footer',
        data(){
            return {
                msg: 'hello vue'
            }
        },
        computed: Object.assign({}, mapState({
                todos: 'todos'
            }), mapGetters({
                completedTodos: 'completedTodos',
                unCompletedTodos: 'unCompletedTodos'

            }), mapState({
                activeFilter: 'visibleFilter'
            }),
            {
                leftItem(){
                    return this.unCompletedTodos.length;
                },
                items(){
                    return Utils.pluralize(this.unCompletedTodos.length, 'item')
                },
                filters(){
                    return FILTER_TYPE;
                }
            }),
        methods: {
            setVisibleFilter(filter){
                this.$store.commit({
                    type: mutation_type.SET_VISIBILITY_FILTER,
                    filter
                })
            },
            clearCompleted(){
                this.$store.commit({
                    type: mutation_type.CLEAR_COMPLETED
                })
            }
        },
        components: {}
    }
</script>
