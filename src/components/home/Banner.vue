<template>
    <div>
        <p>Banner配置</p>

        <el-form :model="form">
            <!--logo-->
            <el-form-item label="图片1" :label-width="formLabelWidth">
                <el-upload class="avatar-uploader"
                           action=""
                           :on-change="onChangeEvt"
                           :show-file-list="true"
                           :multiple="false"
                           :limit="1"
                           :file-list="logoPath"
                           :auto-upload="false"
                           :before-upload="beforeUpload">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

            </el-form-item>

            <!--banner-->
            <el-form-item label="图片2" :label-width="formLabelWidth">
                <el-upload class="avatar-uploader"
                           action=""
                           :on-change="onChangeEvt2"
                           :show-file-list="true"
                           :multiple="false"
                           :limit="1"
                           :file-list="bannerPath"
                           :auto-upload="false"
                           :before-upload="beforeUpload">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

            </el-form-item>

            <!--detail-->
            <el-form-item label="图片3" :label-width="formLabelWidth">
                <el-upload class="avatar-uploader"
                           action=""
                           :on-change="onChangeEvt3"
                           :show-file-list="true"
                           :multiple="false"
                           :limit="1"
                           :file-list="detailPath"
                           :auto-upload="false"
                           :before-upload="beforeUpload">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import qs from 'qs';
    import axios from 'axios'


    export default {
        data() {
            return {
                tableData: [],
                pic: [],
                bannerPath: [],
                detailPath: [],
                form: {
                    name: '',
                    summary: '',
                    yprice: '',
                    price: '',
                    logo: ''
                },
                addFormVisible: false,
                formLabelWidth: '120px'
            }
        },
        methods: {
            onChangeEvt (file, fileList) {
                this.uploadFile(1, fileList);
            },
            onChangeEvt2 (file, fileList) {
                this.uploadFile(2, fileList);
            },
            onChangeEvt3 (file, fileList) {
                this.uploadFile(3, fileList);
            },
            uploadFile(index, fileList) {
                let formData = new FormData();
                formData.append('file', fileList[0] ? fileList[0].raw : '');
                const instance = axios.create({
                    baseURL: 'https://www.yiyadr.com/my-doctor/',
                    // baseURL: 'http://localhost:8086/',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                instance.post('/home/banner/upload/'+index, formData)
                    .then(response => {
                        console.log(response.data);
                        this.addFormVisible = false;

                        this.refreshTable();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            beforeUpload: function (file, fileList) {
                return true;
            },
            refreshTable: function () {
            }
        },
        mounted () {
            this.refreshTable();
        },
        name: "banner"
    }
</script>

<style scoped>

</style>