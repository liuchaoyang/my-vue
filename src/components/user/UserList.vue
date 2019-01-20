<template>
    <div>
        <p>user list</p>

        <el-button type="text" @click="addFormVisible = true">新增</el-button>

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


        <!--dialog-->
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
                               action="https://jsonplaceholder.typicode.com/posts/"
                               :show-file-list="false"
                               :before-upload="beforeUpload">
                        <img v-if="form.logo" :src="form.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
        // props: {
        //     tableData: [{
        //         user: '刘朝阳',
        //         name: 'liuchaoyang'
        //     }]
        // },
        methods: {
            add: function () {
                const instance = axios.create({
                    baseURL: 'http://localhost:8086',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'token': '444'
                    }
                });
                instance.post('/product/form_insert', this.form)
                // axios
                //     .post('http://localhost:8086/product/form_insert', qs.stringify(this.form),
                //     {
                //         headers: {
                //             // 'Content-Type': 'multipart/form-data',
                //             "Content-Type": "multipart/form-data",
                //             'token': 'liuchaoyang'
                //         }
                //     })
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            beforeUpload: function (file) {
                return false;
            },
            handleClick: function (scope, row) {
                console.log(scope);
                console.log(row);
            }
        },
        mounted () {
            axios
                .get('http://localhost:8086/product/list_all')
                .then(response => {
                    this.tableData = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        name: "user-list"
    }
</script>

<style scoped>

</style>