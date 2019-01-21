<template>
    <div>
        <p>user list</p>

        <el-button type="primary" style="margin-bottom: 20px" @click="addFormVisible = true">新增</el-button>

        <br/>
        <el-table :data="tableData" border >
            <el-table-column v-show="false" prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="姓名" ></el-table-column>
            <el-table-column prop="summary" label="简介" ></el-table-column>
            <el-table-column prop="yprice" label="原价" ></el-table-column>
            <el-table-column prop="price" label="价格" ></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="100"></el-table-column>

            <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--add dialog-->
        <el-dialog title="收货地址" :visible.sync="addFormVisible">
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
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
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
            add: function () {
                let formData = new FormData();
                // 创建了 FormData 对象的时候传入了表单但是读不出来表单数据，不知道哪里的问题。所以下面用 append 方法添加参数，想打印出来看看的话可以 formData.get('id')
                formData.append('name', this.form.name);
                formData.append('summary', this.form.summary);
                formData.append('yprice', this.form.yprice);
                formData.append('price', this.form.price);
                // 这里文件上传的字段一定要设置文件列表中的 raw 参数 this.cert_path[0].raw
                formData.append('logo', this.logoPath[0] ? this.logoPath[0].raw : '');

                const instance = axios.create({
                    baseURL: 'http://localhost:8086',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'token': '555'
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
            beforeUpload: function (file, fileList) {
                return true;
            },
            handleClick: function (scope, row) {
                console.log(scope);
                console.log(row);
            },
            refreshTable: function () {
                axios
                    .get('http://localhost:8086/product/list_all')
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