<template>
<a-layout>

   <!-- <a-layout-head style="margin-bottom: 10px">
        <a-row>
            <a-input v-model="goodsTypeName" @change="makeDisable" style="width: 200px" />
            &nbsp;
            <a-button :disabled="flag" type="primary" @click="addGoodsType">添加</a-button>
        </a-row>
    </a-layout-head>-->
    <a-layout-content>
        <a-table bordered :data-source="goodsTypeList" :columns="columns"   style="background: white">

            <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                        v-if="goodsTypeList.length"
                        title="删除?"
                        @confirm="() => deleteGoodsType(record.goodsTypeId)"
                >
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
            </template>
        </a-table>
    </a-layout-content>

</a-layout>
</template>

<script>

    import {add,deleteGoodsType,all} from "../api/goodsType";

    export default {
        name: "GoodsTypes",
        created() {
          this.fetchData();
        },
        data(){
            return{

                goodsTypeName:'',
                goodsTypeList:[],
                flag:true,
                columns:[
                    {
                        title: '商品类型名',
                        dataIndex: 'goodsTypeName',

                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                    },
                ]


            }
        },
        methods:{


          fetchData(){
            all().then(res=>{
              this.goodsTypeList=res.data.data;
            })
          },
            addGoodsType(){
                add(JSON.stringify({goodsTypeName:this.goodsTypeName})).then(res=>{
                    if(res.data.code===200){
                        alert("添加成功");
                       this.fetchData();
                    }else {
                        alert(res.data.message);
                    }
                })
            },
            deleteGoodsType(goodsTypeId){
                deleteGoodsType({
                    goodsTypeId:goodsTypeId
                }).then(res=>{
                    if(res.data.code===200){
                       this.fetchData();
                    }else {
                        alert(res.data.message);
                    }
                })
            },
            makeDisable(){
                // eslint-disable-next-line no-debugger

                this.flag = this.goodsTypeName === '';
            }
        }
    }
</script>

<style scoped>

</style>
