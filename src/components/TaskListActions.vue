<template>
  <el-button size="mini" @click="sendCopyTaskname" class="button-copy" circle
    ><el-icon
      ><copy-document /><svg
        class="icon"
        width="200"
        height="200"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-042ca774=""
      >
        <path
          fill="currentColor"
          d="M768 832a128 128 0 01-128 128H192A128 128 0 0164 832V384a128 128 0 01128-128v64a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64h64z"
        ></path>
        <path
          fill="currentColor"
          d="M384 128a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64V192a64 64 0 00-64-64H384zm0-64h448a128 128 0 01128 128v448a128 128 0 01-128 128H384a128 128 0 01-128-128V192A128 128 0 01384 64z"
        ></path></svg></el-icon
  ></el-button>

  <el-button
    size="mini"
    @click="sendRestart"
    type="primary"
    class="button-play"
    circle
    ><el-icon
      ><video-play /><svg
        class="icon"
        width="200"
        height="200"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-042ca774=""
      >
        <path
          fill="currentColor"
          d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656l249.472 166.336a48 48 0 010 79.872L474.624 718.272A48 48 0 01400 678.336V345.6a48 48 0 0174.624-39.936z"
        ></path></svg></el-icon
  ></el-button>

  <el-button
    size="mini"
    @click="deleteTask(taskID)"
    class="button-stop"
    type="danger"
    circle
    ><el-icon
      ><delete /><svg
        class="icon"
        width="200"
        height="200"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-042ca774=""
      >
        <path
          fill="currentColor"
          d="M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32zm192 0a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32z"
        ></path></svg></el-icon
  ></el-button>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    taskID: {
      type: String,
      required: true,
    },
  },
  emits: ["restart", "copyTaskname"],
  methods: {
    ...mapActions(["deleteTask"]),
    sendRestart() {
      this.$emit("restart", this.taskID);
    },
    sendCopyTaskname() {
      this.$emit("copyTaskname");
    },
  },
};
</script>

<style lang="scss" scoped></style>

<!--  handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
},-->
