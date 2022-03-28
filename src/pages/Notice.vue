<template>

    <a-layout>

            <h1 style="text-align: center"><strong>{{notice.noticeTittleName}}</strong></h1>
            <span style="text-align: center">编辑于：{{notice.gmtCreated}}</span>
            <div v-html="notice.noticeMessage" style="margin: 0 auto;width: 800px;background: white">
                {{notice.noticeMessage}}
            </div>
    </a-layout>
</template>

<script>

    import {notice} from '@/api/admin';

    export default {
        name: "Notice",
        data() {
            return {
                notice: {

                },
            }
        },
        created() {
            console.log(this.$route.query.noticeId);
            notice({noticeId: this.$route.query.noticeId}
            ).then(res => {
                // eslint-disable-next-line no-debugger
                this.notice=res.data.data.list[0];
            })
        },
        methods: {},
    }
</script>

<style scoped>

</style>
