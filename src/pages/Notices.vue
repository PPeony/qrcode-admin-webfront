<template>
    <a-layout>
        <a-layout-content>
            <a-table bordered :data-source="noticeList" :columns="columns" :pagination="false"
                     style="background: white">

                <template slot="watch" slot-scope="text, record">
                    <router-link :to="{path: 'noticeDetail',query: {noticeId:record.noticeId}}">查看</router-link>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <a-popconfirm
                            v-if="noticeList.length"
                            title="删除?"
                            @confirm="() => deleteNotice(record.noticeId)"
                    >
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </template>
            </a-table>
        </a-layout-content>
    </a-layout>
</template>

<script>
    import {deleteNotice, notice} from "../api/admin";

    export default {
        name: "Notices",
        created() {
            let noticeTittleName = this.$route.query.noticeName;
            let beginTime = this.$route.query.beginTime;
            let endTime = this.$route.query.endTime;
            if (noticeTittleName === undefined) {
                notice().then(res => {
                    this.noticeList = res.data.data.list;
                });
            } else {
                notice({
                    noticeTittleName:noticeTittleName,
                    beginTime:beginTime,
                    endTime:endTime
                }).then(res => {
                    this.noticeList = res.data.data.list;
                });
            }

        },
        data() {
            return {
                columns: [
                    {
                        title: '公告标题',
                        dataIndex: 'noticeTittleName',
                    },
                    {
                        title: '查看原文',
                        dataIndex: 'watch',
                        scopedSlots: {customRender: 'watch'},
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: {customRender: 'operation'},
                    },
                ],
                noticeList: [],
                noticeTitleName: '',
                flag: true,
                beginTime: '',
                endTime: '',
            }
        },
        methods: {


            onchange() {
                this.flag = this.beginTime === '' && this.endTime === '' && this.noticeTitleName === '';
            },
            search() {
                this.$router.push({
                    path: 'notices',
                    query: {noticeTittleName: this.noticeTitleName, beginTime: this.beginTime, endTime: this.endTime}
                });
            },
            deleteNotice(noticeId) {
                deleteNotice({
                    noticeId: noticeId
                }).then(res => {
                    if (res.data.code === 200) {
                        location.reload();
                    } else {
                        console.log(res.data.message);
                    }
                });
            }
        },

    }
</script>

<style scoped>

</style>
