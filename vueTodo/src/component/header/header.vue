<template>
    <div class="header">
        <h1 class="title">todos</h1>
        <input v-focus type="text" class="new-todo" placeholder="what needs to be done?" @keydown.enter="add($event)">
    </div>
</template>
<style lang="less" src="./header.less" scoped>


</style>
<script>

    import {Utils} from '../../utils/utils.js';
    import {mutation_type, APP_KEY} from '../../utils/constant.js';
    export default{
        name: 'todo-header',
        data(){
            return {
                msg: 'hello vue'
            }
        },

        methods: {
            add(e){
                let val = e.target.value.trim();
                if (!val) {
                    return false;
                }
                this.$store.commit({
                    type: mutation_type.ADD_TODO,
                    text: val
                });
                e.target.value = '';

            }

        },
        directives: {
            focus: {
                inserted(el){
                    el.focus();
                }
            }
        },

        components: {}
    }
</script>
