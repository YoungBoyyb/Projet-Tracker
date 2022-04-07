<template>
  <div>
    <h1>Accueil</h1>
    <TaskList
      :tasks="tasks || []"
      :areTasksLoading="areTasksLoading"
      v-on="{
        restart: sendRestart,
        delete: sendDelete,
      }"
    />
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";

export default {
  components: {
    TaskList,
  },
  emits: ["restart", "delete"],
  props: {
    tasks: {
      type: Array,
      default: [],
    },
    areTasksLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    sendRestart(data) {
      this.$emit("restart", data);
    },
    sendDelete(data) {
      this.$emit("delete", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
}
.layout-container-demo {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
.el-table {
  --el-table-tr-bg-color: transparent;
  --el-table-border-color: #f99829;
  --el-table-border: 1px solid #f99829;
  --el-table-text-color: #f99829;
  --el-table-header-bg-color: #f99829 !important;
  --el-table-header-text-color: white;
  --el-table-row-hover-bg-color: var(--el-bg-color);
  --el-table-current-row-bg-color: var(--el-color-primary-light-9);
}
tr.el-table__row:hover {
  --el-table-text-color: red !important;
}
</style>
