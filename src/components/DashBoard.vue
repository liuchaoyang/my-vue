<template>
    <div>
        <el-container>
            <el-header class="header">
                <Header></Header>
            </el-header>

            <el-container>
                <el-aside width="200px">
                    <NavMenu></NavMenu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
    </div>

</template>

<script>
    import NavMenu from '@/components/NavMenu'
    import Header from '@/components/Header'

    export default {
        name: "dash-board",
        components: {
            NavMenu,
            Header
        }
    }
</script>

<style>
    .el-header {
        background: url("../assets/header.png") no-repeat left bottom;
        /*background-color: #B3C0D1;*/
        color: #333;
        text-align: left;
        line-height: 60px;
        margin-bottom: 5px;
    }
</style>