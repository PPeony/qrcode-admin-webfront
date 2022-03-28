<template>
  <a-layout>

    <a-layout-content>
      <a-table bordered :data-source="goodsList" :columns="columns" :pagination="false" style="background: white">
        <template slot="isDelete" slot-scope="text,record">
          <span v-if="record.isDeleted===0">已上架</span>
          <span v-else>已下架</span>
        </template>

        <template slot="operation" slot-scope="text,record">
          <!--          <a-popconfirm-->
          <!--              v-if="goodsList.length"-->
          <!--              title="删除?"-->
          <!--              @confirm="() => onDelete(record.goodsId)"-->
          <!--          >-->
          <!--            <a href="javascript:;">删除</a>-->
          <!--          </a-popconfirm>-->
          <el-tag v-if="record.goodsStatus === 0">
            <el-button type="text" @click="openDialog(record.goodsId)">促销该商品</el-button>
          </el-tag>
          <el-tag v-else-if="record.goodsStatus === 1">
            <el-button type="text" @click="stopPromotionBtn(record.goodsId)">停止促销</el-button>
          </el-tag>
          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
            <!--            //开始时间，持续时间，促销价格，总数-->
            促销开始时间(格式为：YYYY-MM-DD hh:mm:ss，例如：2021-09-01 12:00:00):
            <el-input v-model="promotionStartTime" placeholder="请输入促销开始时间"></el-input>
            促销持续时间(单位分钟):<el-input v-model="promotionDuration" placeholder="请输入促销持续时间"></el-input>
            促销商品个数:<el-input v-model="promotionCount" placeholder="请输入促销商品个数"></el-input>
            促销价格:<el-input v-model="promotionValue" placeholder="请输入促销价格"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit(record.goodsId)">提 交</el-button>
              </span>
          </el-dialog>

        </template>
      </a-table>
      <br>
      <a-pagination :default-current="currentPage" :total="total" @change="changePage" v-model="currentPage"
                    style="float: right;margin-right: 4px"/>
    </a-layout-content>
  </a-layout>
</template>

<script>

import {deleteGoods, goods, createGoodsPromotion,stopPromotion} from "../api/admin";

export default {
  name: "GoodsPromotion",
  watch: {
    $route: {
      handler() {

        let pageNum = this.$route.query.pageNum;
        let pageSize = this.$route.query.pageSize;
        let goodsName = this.$route.query.goodsName;
        let goodsPrice = this.$route.query.goodsPrice;
        let beginTime = this.$route.query.beginTime;
        let goodsTypeName = this.$route.query.goodsTypeName;
        let endTime = this.$route.query.endTime;

        goods({
          pageNum: pageNum,
          pageSize: pageSize,
          beginTime: beginTime,
          endTime: endTime,
          goodsName: goodsName,
          goodsPrice: goodsPrice,
          goodsTypeName: goodsTypeName,
        }).then(res => {
          this.goodsList = res.data.data.list;


        })
        //深度监听，同时也可监听到param参数变化
      },
      deep: true,
    }
  },
  components: {},
  data() {
    return {
      promotionStartTime:'',
      promotionDuration:0,
      promotionCount:0,
      promotionValue:1,
      dialogVisible: false,
      baseURL: 'http://localhost:8080/QRCodeMall/',
      goodsList: [],
      goodsName: '',
      goodsPrice: undefined,
      beginTime: undefined,
      goodsTypeName: '',
      endTime: undefined,
      pageNum: 1,
      currentPage: 1,
      total: 0,
      isFirstPage: true,
      isLastPage: true,
      prePage: 0,
      nextPage: 0,
      hasPreviousPage: false,
      hasNextPage: false,
      columns: [
        {
          title: '商品名',
          dataIndex: 'goodsName',
        },
        {
          title: '商品价格',
          dataIndex: 'goodsPrice',
        },
        {
          title: '商品类型',
          dataIndex: 'goodsTypeName',
        }, {
          title: '二维码数量',
          dataIndex: 'goodsQrcodeQuantity',
        }, {
          title: '商品状态',
          dataIndex: 'isDeleted',
          scopedSlots: {customRender: 'isDeleted'},
        }, {
          title: '商品类型',
          dataIndex: 'goodsTypeName',
        },

        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'},
        },
      ],
    }
  },


  created() {

    // eslint-disable-next-line no-debugger

    let pageNum = this.$route.query.pageNum;
    let pageSize = this.$route.query.pageSize;
    let goodsName = this.$route.query.goodsName;
    let goodsPrice = this.$route.query.goodsPrice;
    let beginTime = this.$route.query.beginTime;
    let goodsTypeName = this.$route.query.goodsTypeName;
    let endTime = this.$route.query.endTime;

    goods({
      pageNum: pageNum,
      pageSize: pageSize,
      beginTime: beginTime,
      endTime: endTime,
      goodsName: goodsName,
      goodsPrice: goodsPrice,
      goodsTypeName: goodsTypeName,
    }).then(res => {
      this.goodsList = res.data.data.list;
      this.currentPage = res.data.data.pageNum;
      this.isFirstPage = res.data.data.isFirstPage;
      this.isLastPage = res.data.data.isLastPage;
      this.isFirstPage = res.data.data.isFirstPage;
      this.prePage = res.data.data.prePage;
      this.nextPage = res.data.data.nextPage;
      this.hasPreviousPage = res.data.data.hasPreviousPage;
      this.hasNextPage = res.data.data.hasNextPage;
      this.total = res.data.data.total;
      // eslint-disable-next-line no-debugger
      console.log(this.currentPage);
      console.log(this.total);

    })


  },

  methods: {
    submit(goodsId) {
      console.log("submit--->",goodsId)
      let promotionGoods = {promotionStartTime: this.promotionStartTime,
        promotionDuration: this.promotionDuration,
      promotionCount:this.promotionCount,
      promotionValue:this.promotionValue,
      goodsId:goodsId};
      createGoodsPromotion(JSON.stringify(promotionGoods)).then(res => {
        if(res.data.code===200){
          console.log('promotion insert success')
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$router.go(0);
        } else {
          console.log('promotion insert error---->',res.data)
          this.$message.error('添加失败 ',res.data.message);
        }

      })
      this.dialogVisible = false
      this.promotionStartTime=''
      this.promotionDuration=0
      this.promotionCount=0
      this.promotionValue=1
    },
    stopPromotionBtn(goodsId) {
      console.log("stop promotion-->",goodsId)
      stopPromotion({goodsId:goodsId}).then(
          res => {
            if(res.data.code===200){
              console.log('stop promotion success')
              this.$message({
                message: '停止促销设置成功',
                type: 'success'
              });
              this.$router.go(0);
            } else {
              console.log('promotion insert error---->',res.data)
              this.$message.error('停止促销失败 ',res.data.message);
            }

          }
      )

    },
    openDialog(params) {
      this.dialogVisible = true
      console.log('opendialog->>',params)
    },
    handleClose(done) {
      console.log('close--------------',done)
      this.dialogVisible = false;
      this.promotionStartTime=''
      this.promotionDuration=0
      this.promotionCount=0
      this.promotionValue=1
     }
     ,

    filterIsDelete() {
      let goodsListTemp = [];
      // eslint-disable-next-line no-debugger

      for (let i = 0; i < this.goodsList.length; i++) {
        if (this.goodsList[i].isDeleted === 0) {
          goodsListTemp.push(this.goodsList[i]);
        }
      }

      this.goodsList = goodsListTemp;
    },

    onDelete(goodsId) {
      deleteGoods({
        goodsId: goodsId
      }).then(() => {
        this.$router.go(0);
      })
      // eslint-disable-next-line no-debugger

    },
    dateChange(date, dateString) {
      this.beginTime = dateString[0];
      this.endTime = dateString[1];
    },

    changePage(pageNum) {
      let goodsName = this.$route.query.goodsName;
      let goodsPrice = this.$route.query.goodsPrice;
      let beginTime = this.$route.query.beginTime;
      let goodsTypeName = this.$route.query.goodsTypeName;
      let endTime = this.$route.query.endTime;
      this.$router.push({
        path: 'goodsPromotion', query: {
          beginTime: beginTime,
          endTime: endTime,
          goodsName: goodsName,
          goodsPrice: goodsPrice,
          goodsTypeName: goodsTypeName,
          pageNum: pageNum
        }
      });
    },
    search() {
      // eslint-disable-next-line no-debugger

      this.$router.push({
        path: 'goodsPromotion', query: {
          beginTime: this.beginTime,
          endTime: this.endTime,
          goodsName: this.goodsName,
          goodsPrice: this.goodsPrice,
          goodsTypeName: this.goodsTypeName,
        }
      });

    }
  }
}
</script>

<style scoped>
.ant-layout-header {
  background: #F0F2F5;
}
</style>