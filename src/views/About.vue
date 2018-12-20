<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      If Element is successfully added to this project, you'll see an
      &lt;!&ndash;<code v-text="'this is a code'" v-show="true"></code>&ndash;&gt;
      below
    </p>
    <div>
      <el-button @click="visible = true">Dialog Button</el-button>
      <el-dialog :visible.sync="visible" title="Hello world">
        <p>This is a dialog!</p>
      </el-dialog>
    </div>
  </div>


</template>

<script>
  export default {
      data: function () {
          return {visible: false}
      }
  }
</script>
