<template>
    <a-button type="primary">按钮</a-button>
</template>

<script>

    import {goods} from '@/api';

    export default {
        name: "Hello",
        created() {
            goods().then(res=>{
                console.log(res.data);
            })
        }
    }
</script>

<style scoped>

</style>
