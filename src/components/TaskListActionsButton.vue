<template>
  <el-button size="mini" class="button-copy" round
    ><slot></slot
    ><strong class="text-button-actions"
      ><slot name="text">Action</slot></strong
    ></el-button
  >
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 12px;
  padding: 8px 10px;
}
strong.text-button-actions {
  margin: 10px;
  font-weight: 500;
}
</style>

<!--  handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
},-->
