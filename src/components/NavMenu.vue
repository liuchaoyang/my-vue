<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                     unique-opened
                     router
                     background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>DashBoard</span>
                    </template>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/user/list">选项1</el-menu-item>
                        <el-menu-item index="/user/hello">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>系统设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/user/list">选项1</el-menu-item>
                        <el-menu-item index="/user/hello">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>