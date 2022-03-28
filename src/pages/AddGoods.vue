<template>

  <a-layout>

    <a-form-model
        ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol"
        :wrapper-col="wrapperCol">
      <a-form-model-item ref="goodsName" label="商品名" prop="goodsName">
        <a-input v-model="form.goodsName"/>
      </a-form-model-item>

      <a-form-model-item ref="goodsPrice" label="商品价格" prop="goodsPrice">
        <a-input-number :min="0" v-model="form.goodsPrice"/>
      </a-form-model-item>

      <a-form-model-item ref="goodsTypeName" label="商品类别" prop="goodsTypeName">
        <a-select style="width: 120px" @change="handleChange" >
          <a-select-option v-for="(item,index) in goodsTypeList" v-bind:value="index" :key="index">
            {{item.goodsTypeName}}
          </a-select-option>

        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="goodsQrCodeQuantity" label="二维码数量" prop="goodsQrCodeQuantity"
      >
        <a-input-number :min="1" v-model="form.goodsQrCodeQuantity"/>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submit()">
          提交
        </a-button>

      </a-form-model-item>
    </a-form-model>

  </a-layout>

</template>

<script>


import {goodsType} from "../api/goods";
import {addGoods} from "../api/admin";

export default {
  name: "AddGoods",

  created() {
    goodsType().then(res => {
      this.goodsTypeList = res.data.data;

    })
  },
  data() {
    return {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      goodsTypeList: [],
      goodsTypeFirst: '',
      form: {
        goodsName: '',
        goodsTypeId: '',
        goodsPrice: undefined,
        goodsQrCodeQuantity: undefined,
        goodsTypeName: '',

      },
      rules: {
        goodsName: [{required: true, message: '商品名不能为空', trigger: 'blur'}],
        goodsPrice: [{required: true, message: '商品价格不能为空', trigger: 'blur'}],
        goodsType: [{required: true, message: '商品类别', trigger: 'blur'}],
        goodsQrCodeQuantity: [{required: true, message: '二维码数量不能为空', trigger: 'blur'}],


      }
    }
  },
  methods: {
    handleChange(value) {

      this.form.goodsTypeName = this.goodsTypeList[value].goodsTypeName;
      this.form.goodsTypeId = this.goodsTypeList[value].goodsTypeId;
    },

    submit() {

      console.log(JSON.stringify(this.form));

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append('goodsName', this.form.goodsName)
          formData.append('goodsPrice', this.form.goodsPrice)
          formData.append('goodsTypeId', this.form.goodsTypeId)
          formData.append('goodsTypeName', this.form.goodsTypeName)
          formData.append('goodsQrcodeQuantity', this.form.goodsQrCodeQuantity)
          formData.append('goodsStatus', 0);
          addGoods(formData).then(res => {

            if (res.data.code === 201) {
              alert("添加成功！");
              console.log(res.data);
              location.reload();
            } else {
              alert("添加失败！");
            }
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>