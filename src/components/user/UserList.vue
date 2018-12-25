<template>
    <div>
        <p>user list</p>

        <el-button @click="initTable">初始化数据</el-button>
        <br/>
        <el-table :data="tableData" border >
            <el-table-column v-show="false" prop="id" label="id"></el-table-column>
            <el-table-column prop="user" label="用户" ></el-table-column>
            <el-table-column prop="name" label="姓名" ></el-table-column>
            <el-table-column prop="date" label="日期" ></el-table-column>

            <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        // props: {
        //     tableData: [{
        //         user: '刘朝阳',
        //         name: 'liuchaoyang'
        //     }]
        // },
        methods: {
            initTable: function () {
                this.tableData = [{
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    user: '上海市普陀区金沙江路 1518 弄'
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    user: '上海市普陀区金沙江路 1517 弄'
                }];
                console.log(this.tableData);
            },
            handleClick: function (scope, row) {
                console.log(scope);
                console.log(row);
            }
        },
        name: "user-list"
    }
</script>

<style scoped>

</style>