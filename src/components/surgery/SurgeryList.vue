<template>
    <div>
        <p>手术列表</p>

        <el-button type="primary" style="margin-bottom: 20px" @click="add()">新增</el-button>

        <br/>
        <el-table :data="tableData" border >
            <el-table-column prop="id" label="手术编号"></el-table-column>
            <el-table-column prop="name" label="手术名称" ></el-table-column>
            <el-table-column prop="summary" label="手术简介" ></el-table-column>
            <el-table-column prop="hospital" label="所属医院" ></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="100"></el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="100"></el-table-column>

            <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--add dialog-->
        <el-dialog title="收货地址" :visible.sync="addFormVisible">
            <el-form :model="form">
                <el-form-item label="手术名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手术简介" :label-width="formLabelWidth">
                    <el-input v-model="form.summary" autocomplete="off"></el-input>
                </el-form-item>
                <!--选择医院-->
                <el-form-item label="所属医院" :label-width="formLabelWidth">
                    <el-select v-model="levelOneOrgId" placeholder="请选择一级地区" :visible.sync="selectOrgVisible" @change="orgLevelOneChange">
                        <el-option
                                v-for="item in levelOne"
                                :key="item.id"
                                :label="item.orgname"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select v-model="levelTwoOrgId" placeholder="请选择二级地区" :visible.sync="selectOrgVisible" @change="orgLevelTwoChange">
                        <el-option
                                v-for="item in levelTwo"
                                :key="item.id"
                                :label="item.orgname"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select v-model="form.orgId" placeholder="请选择医院" :visible.sync="selectOrgVisible" @change="orgLevelThreeChange">
                        <el-option
                                v-for="item in levelThree"
                                :key="item.id"
                                :label="item.orgname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="手术医生" :label-width="formLabelWidth">
                    <el-select v-model="selectedDoctors" multiple placeholder="请选择医院" :visible.sync="selectOrgVisible" @change="selectDoctorChange">
                        <el-option
                                v-for="item in doctors"
                                :key="item.userId"
                                :label="item.name"
                                :value="item.userId">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
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
                levelOne: [],
                levelOneOrgId: '',
                levelTwo: [],
                levelTwoOrgId: '',
                levelThree: [],
                doctors: [],
                selectedDoctors: [],
                form: {
                    name: '',
                    summary: '',
                    orgId: '',
                    doctorIds: ''
                },
                addFormVisible: false,
                selectOrgVisible: true,
                formLabelWidth: '120px'
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
                    this.$message('请分配手术医生');
                    return false;
                }
                const instance = axios.create({
                    baseURL: 'https://www.yiyadr.com/my-doctor',
                });
                instance.post('/admin/surgery/insert', qs.stringify(this.form))
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
            orgLevelOneChange: function () {
                this.levelTwo = [];
                this.levelThree = [];
                this.levelTwoOrgId = '';
                this.form.orgId = '';
                this.doctors = [];
                this.selectedDoctors = [];
                this.form.doctorIds = '';
                axios
                    .get('https://www.yiyadr.com/my-doctor/org/list_by_parentId?parentId=' + this.levelOneOrgId)
                    .then(response => {
                        this.levelTwo = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            orgLevelTwoChange: function () {
                this.levelThree = [];
                this.form.orgId = '';
                this.doctors = [];
                this.selectedDoctors = [];
                this.form.doctorIds = '';
                axios
                    .get('https://www.yiyadr.com/my-doctor/org/list_by_parentId?parentId=' + this.levelTwoOrgId)
                    .then(response => {
                        this.levelThree = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            orgLevelThreeChange: function () {
                this.doctors = [];
                this.selectedDoctors = [];
                this.form.doctorIds = '';
                if (!this.form.orgId){
                    this.$message('请选择一个医院');
                    return false;
                }
                axios
                    .get('https://www.yiyadr.com/my-doctor/doctor/list_by_orgId?orgId=' + this.form.orgId)
                    .then(response => {
                        this.doctors = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            selectDoctorChange: function () {
                console.log(this.selectedDoctors);
                if(this.selectedDoctors) {
                    this.form.doctorIds = this.selectedDoctors.join(',');
                }
            },
            handleClick: function (row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.summary = row.summary;
                this.form.orgId = row.orgId;
                this.form.doctorIds = row.doctorIds;
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
            refreshTable: function () {
                axios
                    .get('https://www.yiyadr.com/my-doctor/admin/surgery/list')
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
        }
    }
</script>

<style scoped>

</style>