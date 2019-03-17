<template>
    <div>
        <p>预约手术列表</p>

        <br/>
        <el-table :data="tableData" border >
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column prop="user_name" label="患者姓名" ></el-table-column>
            <el-table-column prop="user_mobile" label="患者手机号" ></el-table-column>
            <el-table-column prop="name" label="手术项目" ></el-table-column>
            <el-table-column prop="orderTime" label="预约时间" ></el-table-column>

            <el-table-column label="处理状态" >
                <template slot-scope="scope">
                    <span>{{ scope.row.over == 0?'未处理' : '已处理' }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">处理</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout=" prev, pager, next, sizes, total"
                :total="total">
        </el-pagination>

        <!--add dialog-->
        <el-dialog title="订单处理状态设置" :visible.sync="overFormVisible">
            <el-form :model="form">
                <el-form-item label="订单编号" :label-width="formLabelWidth">
                    <el-input v-model="form.orderId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="患者姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.user_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手术项目" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="处理状态" :label-width="formLabelWidth">
                    <!--<el-input v-model="form.over"></el-input>-->
                    <el-select v-model="form.over" placeholder="请选择">
                        <el-option
                                v-for="item in overOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="overFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="overSave">确 定</el-button>
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
                currentPage: 1,
                total: 0,
                page: 1,
                pageSize: 10,
                pageNum:1,

                form: {
                    orderId: '',
                    user_name: '',
                    name: '',
                    over: ''
                },
                overFormVisible: false,
                formLabelWidth: '120px',

                overOptions: [{
                    value: 0,
                    label: '未处理'
                }, {
                    value: 1,
                    label: '已处理'
                }]
            }
        },
        methods: {
            overSave: function () {
                const instance = axios.create({
                    baseURL: 'https://www.yiyadr.com/my-doctor',
                });
                instance.post('/admin/surgery/order/over', qs.stringify(this.form))
                    .then(response => {
                        console.log(response.data);
                        this.overFormVisible = false;

                        this.refreshTable(1,10);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            handleClick: function (row) {
                this.form.orderId = row.id;
                this.form.user_name = row.user_name;
                this.form.name = row.name;
                this.form.over = row.over;

                this.overFormVisible = true;
            },
            //改变时
            handleSizeChange(val) {
                // this.pageSize = val;
                this.refreshTable(1,val);
            },
            //条目改变时
            handleCurrentChange(val) {
                // this.pageNum = val;
                this.refreshTable(val, this.pageSize);
            },
            refreshTable: function (p, ps) {
                axios
                    .get('https://www.yiyadr.com/my-doctor/admin/surgery/order/list_all?page=' + p + '&pageSize=' + ps)
                    // .get('http://localhost:8086/admin/surgery/order/list_all?page=' + p + '&pageSize=' + ps)
                    .then(response => {
                        this.tableData = response.data.data.rows
                        this.page = response.data.data.page
                        this.currentPage = response.data.data.page
                        this.pageSize = response.data.data.size
                        this.total = response.data.data.count
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted () {
            this.refreshTable(1,10);
        }
    }
</script>

<style scoped>

</style>