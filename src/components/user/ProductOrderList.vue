<template>
    <div>
        <p>商品购买列表</p>

        <br/>
        <el-table :data="tableData" border >
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column prop="name_" label="客户姓名" ></el-table-column>
            <el-table-column prop="productName" label="商品名称" ></el-table-column>
            <el-table-column prop="count" label="个数" ></el-table-column>
            <el-table-column prop="price" label="价格" ></el-table-column>
            <el-table-column prop="price" label="价格" ></el-table-column>
            <el-table-column prop="create_time" label="下单时间" ></el-table-column>
            <el-table-column prop="update_time" label="更新时间" ></el-table-column>

            <!--<el-table-column fixed="right" label="操作" >-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
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
                pageNum:1
            }
        },
        methods: {
            add: function () {
                this.form = {
                    name: '',
                    summary: '',
                    orgId: '',
                    doctorIds: ''
                };
                this.addFormVisible = true;
                axios
                    .get('https://www.yiyadr.com/my-doctor/org/list_by_parentId')
                    .then(response => {
                        this.levelOne = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            save: function () {
                if (!this.form.orgId){
                    this.$message('请选择一个医院');
                    return false;
                }
                if (!this.form.doctorIds){
                    this.$message('请分配理疗医生');
                    return false;
                }
                const instance = axios.create({
                    baseURL: 'https://www.yiyadr.com/my-doctor',
                });
                instance.post('/admin/physical/insert', qs.stringify(this.form))
                    .then(response => {
                        console.log(response.data);
                        this.addFormVisible = false;

                        this.refreshTable();
                    })
                    .catch(error => {
                        console.log(error)
                    })
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
                    .get('https://www.yiyadr.com/my-doctor/admin/product/order/list?page=' + p + '&pageSize=' + ps)
                    // .get('http://localhost:8086/admin/product/order/list?page=' + p + '&pageSize=' + ps)
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