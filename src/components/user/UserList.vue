<template>
    <div>
        <p>商品列表</p>

        <el-button type="primary" style="margin-bottom: 20px" @click="add()">新增</el-button>

        <br/>
        <el-table :data="tableData" border >
            <el-table-column prop="id" label="商品编号"></el-table-column>
            <el-table-column prop="name" label="商品名称" ></el-table-column>
            <!--<el-table-column prop="summary" label="简介" ></el-table-column>-->
            <el-table-column prop="yprice" label="原价" ></el-table-column>
            <el-table-column prop="price" label="现格" ></el-table-column>
            <el-table-column prop="sort" label="优先级" ></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="100"></el-table-column>

            <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDetailClick(scope.row)" type="text" size="small">详情上传</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--add dialog-->
        <el-dialog title="商品编辑" :visible.sync="addFormVisible">
            <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth">
                    <el-input v-model="form.summary" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="原价" :label-width="formLabelWidth">
                    <el-input v-model="form.yprice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="现价" :label-width="formLabelWidth">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="优先级" :label-width="formLabelWidth">
                    <el-input v-model="form.sort"></el-input>
                    <el-alert
                            title="请填写数字，越大表示优先级越高"
                            type="success">
                    </el-alert>
                </el-form-item>

                <!--logo-->
                <el-form-item label="logo" :label-width="formLabelWidth">
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
                        <div slot="tip" class="el-upload__tip">高450，宽750，只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                </el-form-item>

                <!--banner-->
                <el-form-item label="banner图片" :label-width="formLabelWidth">
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
                        <div slot="tip" class="el-upload__tip">高450，宽750，只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                </el-form-item>

                <!--detail-->
                <el-form-item label="详情图片" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="onChangeEvt3"
                               :show-file-list="true"
                               :multiple="true"
                               :limit="5"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">高450，宽750，只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>





        <!--详情 dialog-->
        <el-dialog title="详情图片上传" :visible.sync="detailFormVisible">
            <el-form>
                <el-tag type="danger">图片要求：尺寸:高450，宽75, 大小不超过500kb</el-tag>
                <el-form-item label="图片1" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt0"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>
                <el-form-item label="图片2" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt1"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>

                <el-form-item label="图片3" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt2"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>

                <el-form-item label="图片4" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt3"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>

                <el-form-item label="图片5" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt4"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>
                <el-form-item label="图片6" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt5"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>
                <el-form-item label="图片7" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt6"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>
                <el-form-item label="图片8" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt7"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>
                <el-form-item label="图片9" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt8"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>
                <el-form-item label="图片10" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader"
                               action=""
                               :on-change="detailChangeEvt9"
                               :show-file-list="true"
                               :multiple="false"
                               :limit="1"
                               :file-list="detailPath"
                               :auto-upload="false"
                               :before-upload="beforeUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import qs from 'qs';
    import axios from 'axios'


    export default {
        data() {
            return {
                tableData: [],
                logoPath: [],
                bannerPath: [],
                detailPath: [],
                form: {
                    name: '',
                    summary: '',
                    yprice: '',
                    price: '',
                    sort: '',
                    logo: ''
                },
                addFormVisible: false,
                detailFormVisible: false,
                formLabelWidth: '120px'
            }
        },
        methods: {
            add: function () {
                this.logoPath = [];
                this.bannerPath = [];
                this.detailPath = [];
                this.form = {
                    name: '',
                    summary: '',
                    yprice: '',
                    price: '',
                    logo: ''
                };
                this.addFormVisible = true;
            },
            save: function () {
                let formData = new FormData();
                // 创建了 FormData 对象的时候传入了表单但是读不出来表单数据，不知道哪里的问题。所以下面用 append 方法添加参数，想打印出来看看的话可以 formData.get('id')
                if(this.form.id) {
                    formData.append('id', this.form.id);
                }
                formData.append('name', this.form.name);
                formData.append('summary', this.form.summary);
                formData.append('yprice', this.form.yprice);
                formData.append('price', this.form.price);
                formData.append('sort', this.form.sort);
                // 这里文件上传的字段一定要设置文件列表中的 raw 参数 this.cert_path[0].raw
                formData.append('logo', this.logoPath[0] ? this.logoPath[0].raw : '');
                formData.append('banner', this.bannerPath[0] ? this.bannerPath[0].raw : '');

                this.detailPath.forEach((img,index) => {
                    formData.append('details', img.raw);
                });

                const instance = axios.create({
                    // baseURL: 'http://localhost:8086',
                    baseURL: 'https://www.yiyadr.com/my-doctor/',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                instance.post('/product/form_insert', formData)
                    .then(response => {
                        console.log(response.data);
                        this.addFormVisible = false;

                        this.refreshTable();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            onChangeEvt (file, fileList) {
                this.logoPath = fileList;
            },
            onChangeEvt2 (file, fileList) {
                this.bannerPath = fileList;
            },
            onChangeEvt3 (file, fileList) {
                this.detailPath = fileList;
            },
            beforeUpload: function (file, fileList) {
                return true;
            },
            handleClick: function (row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.summary = row.summary;
                this.form.yprice = row.yprice;
                this.form.price = row.price;

                this.logoPath = [];
                this.bannerPath = [];
                this.detailPath = [];
                this.addFormVisible = true;
            },
            handleDetailClick: function (row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.summary = row.summary;
                this.form.yprice = row.yprice;
                this.form.price = row.price;

                this.logoPath = [];
                this.bannerPath = [];
                this.detailPath = [];
                this.detailFormVisible = true;
            },


            //详情图片上传
            detailChangeEvt0 (file, fileList) {
                this.uploadDetailFile(0, fileList);
            },
            detailChangeEvt1 (file, fileList) {
                this.uploadDetailFile(1, fileList);
            },
            detailChangeEvt2 (file, fileList) {
                this.uploadDetailFile(2, fileList);
            },
            detailChangeEvt3 (file, fileList) {
                this.uploadDetailFile(3, fileList);
            },
            detailChangeEvt4 (file, fileList) {
                this.uploadDetailFile(4, fileList);
            },
            detailChangeEvt5 (file, fileList) {
                this.uploadDetailFile(5, fileList);
            },
            detailChangeEvt6 (file, fileList) {
                this.uploadDetailFile(6, fileList);
            },
            detailChangeEvt7 (file, fileList) {
                this.uploadDetailFile(7, fileList);
            },
            detailChangeEvt8 (file, fileList) {
                this.uploadDetailFile(8, fileList);
            },
            detailChangeEvt9 (file, fileList) {
                this.uploadDetailFile(9, fileList);
            },
            uploadDetailFile(index, fileList) {
                let formData = new FormData();
                formData.append('file', fileList[0] ? fileList[0].raw : '');
                formData.append('productId', this.form.id);
                const instance = axios.create({
                    baseURL: 'https://www.yiyadr.com/my-doctor/',
                    // baseURL: 'http://localhost:8086/',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                instance.post('/product/detail/upload/'+index, formData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            refreshTable: function () {
                axios
                    .get('https://www.yiyadr.com/my-doctor/product/list_all')
                    .then(response => {
                        this.tableData = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted () {
            this.refreshTable();
        },
        name: "user-list"
    }
</script>

<style scoped>

</style>