<template>
    <div class="app">
        <todo-header/>
        <todo-list/>
        <todo-footer/>
    </div>
</template>
<style lang="less" src="./app.less">

</style>
<script>
    import TodoHeader from '../header/header.vue';
    import TodoList from '../list/list.vue';
    import TodoFooter from '../footer/footer.vue';
    export default{
        name: 'todo-app',
        components: {
            'todo-header': TodoHeader,
            'todo-list': TodoList,
            'todo-footer': TodoFooter
        }
    }
</script>
