<template>
    <a-form-model
            ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol"
            :wrapper-col="wrapperCol" style="background: white">
        <a-form-model-item ref="goodsName" label="商品名" prop="goodsName">
            <a-input v-model="form.goodsName" :value="goods.goodsName"/>
        </a-form-model-item>

        <a-form-model-item ref="goodsPrice" label="商品价格" prop="goodsPrice">
            <a-input-number :min="0" v-model="form.goodsPrice" :value="goods.goodsPrice"/>
        </a-form-model-item>

        <a-form-model-item ref="goodsTypeName" label="商品类别" prop="goodsTypeName">
            <p>商品类别：{{goods.goodsTypeName}}</p>
            <a-select style="width: 120px" @change="handleChange" :default-value="goodsTypeList[0].goodsTypeName">
                <a-select-option v-for="(item,index) in goodsTypeList" v-bind:value="index" :key="index">
                    {{item.goodsTypeName}}
                </a-select-option>

            </a-select>
        </a-form-model-item>
        <a-form-model-item ref="goodsQrCodeQuantity" label="二维码数量" prop="goodsQrCodeQuantity"
        >
            <a-input-number :min="1" v-model="form.goodsQrCodeQuantity" :value="form.goodsQrCodeQuantity"/>
        </a-form-model-item>
        <a-form-model-item ref="goodsIntroduction" label="商品简介" prop="goodsIntroduction"
        >
            <a-textarea v-model="form.goodsIntroduction" :value="form.goodsIntroduction"></a-textarea>
        </a-form-model-item>
        <a-form-model-item label="商品照片" prop="goodsPictureFile">

            <a :href="goods.goodsPicture">商品图片</a>
            <input type="file" style="display: none" @change="getGoodsPicture($event)" id="goodsPicture">
            <a-button type="upload" onclick="document.getElementById('goodsPicture').click()">上传</a-button>
            <span v-if="goodsPicture!==''">&nbsp;&nbsp;&nbsp;{{goodsPicture}}</span>
            <span v-else style="color: red">&nbsp;&nbsp;&nbsp;请提交图片</span>
        </a-form-model-item>
        <a-form-model-item label="商品详情图片" prop="goodsDetailFile">
            <a :href="goods.goodsDetail">商品详情图</a>

            <input type="file" style="display: none" @change="getGoodsDetail($event)" id="goodsDetail"  >
            <a-button type="upload" onclick="document.getElementById('goodsDetail').click()">上传</a-button>
            <span v-if="goodsDetail!==''">{{goodsDetail}}&nbsp;&nbsp;&nbsp;</span>
            <span v-else style="color: red">&nbsp;&nbsp;&nbsp;请提交图片</span>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submit()">
                提交
            </a-button>

        </a-form-model-item>
    </a-form-model>
</template>

<script>

    import {updateGoods, goods} from '../api/admin'
    import {goodsType} from "../api/goods";

    export default {
        name: "UpdateGoods",
        created() {


            let goodsId = this.$route.query.goodsId;

            goodsType().then(res => {
                this.goodsTypeList = res.data.data;
                this.form.goodsTypeId=res.data.data[0].goodsTypeId;
                this.form.goodsTypeName=res.data.data[0].goodsTypeName;

            });


            goods(goodsId).then(res => {

                this.goods = res.data.data.list[0];
            });
        },
        data() {
            return {
                labelCol: {span: 4},
                wrapperCol: {span: 14},
                goodsPicture: '',
                goodsDetail: '',
                goodsTypeList: [],
                goodsTypeFirst:'',
                form: {
                    goodsName: '',
                    goodsTypeId: '',
                    goodsPrice: undefined,
                    goodsQrCodeQuantity: undefined,
                    goodsIntroduction: '',
                    goodsTypeName: '',
                    goodsPictureFile: {},
                    goodsDetailFile: {},

                },
                rules: {
                    goodsName: [{required: true, message: '商品名不能为空', trigger: 'blur'}],
                    goodsPrice: [{required: true, message: '商品价格不能为空', trigger: 'blur'}],
                    goodsType: [{required: true, message: '商品类别', trigger: 'blur'}],
                    goodsIntroduction: [{required: true, message: '商品简介不能为空', trigger: 'blur'}],
                    goodsQrCodeQuantity: [{required: true, message: '二维码数量不能为空', trigger: 'blur'}],
                    goodsPictureFile: [{required: true, message: '商品图片不能为空', trigger: 'change'}],
                    goodsDetailFile: [{required: true, message: '商品详情图片不能为空', trigger: 'change'}],

                },
                goods: {}
            }


        },
        methods: {

            handleChange(value) {

                this.form.goodsTypeName = this.goodsTypeList[value].goodsTypeName;
                this.form.goodsTypeId = this.goodsTypeList[value].goodsTypeId;
            },
            getGoodsPicture() {
                this.form.goodsPictureFile = event.target.files[0];
                this.goodsPicture = event.target.files[0].name;

            },

            getGoodsDetail() {
                this.form.goodsDetailFile = event.target.files[0];

                this.goodsDetail = event.target.files[0].name;
            },

            submit() {


                this.$refs.ruleForm.validate(valid => {
                    if (valid && this.form.goodsDetailFile !== null && this.form.goodsPictureFile !== null) {
                        let formData=new FormData();
                        formData.append('goodsName',this.form.goodsName)
                        formData.append('goodsPrice',this.form.goodsPrice)
                        formData.append('goodsTypeName',this.form.goodsTypeName)
                        formData.append('goodsIntroduction',this.form.goodsIntroduction)
                        formData.append('goodsQrCodeQuantity',this.form.goodsQrCodeQuantity)
                        formData.append('goodsPicture',this.form.goodsPictureFile);
                        formData.append('goodsDetail',this.form.goodsDetailFile);
                        updateGoods(formData).then(res=>{
                            if(res.data.code===200){
                                alert("添加成功！");
                                location.reload();
                            }else {
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
