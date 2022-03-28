<template>
    <a-form-model :model="form" :rules="rules" ref="ruleForm" style="background: white;height: 650px">
        <a-form-model-item ref="noticeTittleName" prop="noticeTittleName">
            <a-input v-model="form.noticeTittleName" placeholder="标题名" style="width: 1000px"/>
        </a-form-model-item>
        <a-form-model-item ref="noticeMessage" prop="noticeMessage">
            <quill-editor
                    ref="noticeMessage"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)" style="height: 470px" v-model="form.noticeMessage">
            </quill-editor>


        </a-form-model-item>
        <br>
        <br>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 22 }">
        <a-button type="primary"  @click="submit">提交</a-button>
    </a-form-model-item>
    </a-form-model>
</template>

<script>
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
        ['blockquote', 'code-block'],     //引用，代码块

        [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
        [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
        [{'script': 'sub'}, {'script': 'super'}],   // 上下标
        [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
        [{'direction': 'rtl'}],             // 文本方向
        [{'size': ['small', false, 'large', 'huge']}], // 字体大小
        [{'header': [1, 2, 3, 4, 5, 6, false]}],     //几级标题
        [{'color': []}, {'background': []}],     // 字体颜色，字体背景颜色
        [{'font': []}],     //字体
        [{'align': []}],    //对齐方式
        ['clean'],    //清除字体样式
    ];


    import {addNotice} from "../api/admin";

    export default {
        name: "addNotice",
        created() {

        },
        data() {
            return {
                wrapperCol: {span: 14},
                noticeList: [],
                form:{
                  noticeTittleName:'',
                  noticeMessage:''
                },
                content: '', // 富文本编辑器默认内容
                editorOption: { //  富文本编辑器配置
                    modules: {
                        toolbar: {
                            container: toolbarOptions, // 工具栏
                        },
                    },
                    placeholder: '请输入正文...'
                },

                rules: {
                    noticeTittleName: [{required: true, message: '标题不能为空', trigger: 'blur'}],
                    noticeList: [{required: true, message: '内容不能为空', trigger: 'blur'}],

                }
            }
        },
        methods: {
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件
            saveHtml:function(event){
                console.log(event)
            },

            submit(){
                console.log(JSON.stringify(this.form));
                this.$refs.ruleForm.validate(valid=>{
                    if(valid){
                     addNotice(JSON.stringify(this.form)).then(res=>{
                         this.form.noticeMessage='';
                         this.form.noticeTittleName='';
                         if(res.data.code===200)
                             alert("添加成功！");
                     })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
