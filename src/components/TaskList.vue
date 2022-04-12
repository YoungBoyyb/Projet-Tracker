<template>
  <el-select
    style="--el-border-radius-base: 0px, --el-popper-border-radius: 0px"
    v-model="sortBy"
    class="m-2 select-taches"
    placeholder="Ordre des tâches"
    size="large"
  >
    <el-option label="La plus récente" value="descending" />
    <el-option label="La plus ancienne" value="ascending" />
  </el-select>

  <el-table
    :data="tasks || []"
    :row-class-name="checkHighlight"
    row-key="id"
    @row-click="setHighlight"
    empty-text="Aucune tâche"
    style="width: 100%"
    v-loading="areTasksLoading"
    element-loading-text="Veuillez patienter..."
    element-loading-background="rgba(249, 152, 41, 0.8)"
    :element-loading-svg="svg"
    class="custom-loading-svg"
    ref="table"
  >
    <el-table-column prop="name" sort-by="startTime" label="Tâche">
    </el-table-column>

    <el-table-column align="right" label="Début et fin" width="150">
      <template #header></template>
      <template #default="scope">
        {{ formatTimestamp(scope.row.startTime) }} -
        {{ formatTimestamp(scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column align="right" label="Durée" width="100">
      <template #header></template>
      <template #default="scope">
        {{ durationBetweenTimestamps(scope.row.startTime, scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column align="right" label="Actions" width="150">
      <template #header></template>
      <template #default="scope">
        <TaskListActions
          :taskID="scope.row.id"
          v-on="{
            restart: sendRestart,
          }"
          @copyTaskname="copyToClipboard(scope.row.name)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
import TaskListActions from "./TaskListActions.vue";

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`;

export default {
  components: {
    TaskListActions,
  },
  data() {
    return {
      tsFormatter: Intl.DateTimeFormat("fr", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      defaultSortBy: "descending",
      sortBy:
        this.$route.query.sortBy === "ascending" ? "ascending" : "descending",
    };
  },
  computed: {
    ...mapState(["tasks", "areTasksLoading"]),
  },

  watch: {
    sortBy(newVal) {
      this.$router.push({
        query: { sortBy: newVal === this.defaultSortBy ? undefined : newVal },
      });
      this.sortTable();
    },
    tasks: {
      deep: true,
      handler() {
        this.sortTable();
      },
    },
  },
  methods: {
    formatTimestamp(ts) {
      return this.tsFormatter.format(ts);
    },
    durationBetweenTimestamps(start, end) {
      let seconds = Math.floor(end / 1000 - start / 1000);
      let minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      seconds = seconds % 60;
      minutes = minutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    },
    sendRestart(data) {
      this.$emit("restart", data);
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
    sortTable() {
      this.$refs.table.sort("name", this.sortBy);
    },
    checkHighlight({ row }) {
      if (this.$route.params.taskID && row.id === this.$route.params.taskID) {
        return "highlight-line";
      } else {
        return "";
      }
    },
    setHighlight(row) {
      this.$router.push({ path: "/home/" + row.id });
    },
  },
  mounted() {
    this.sortTable();
  },
};
</script>

<style lang="scss" scoped>
.el-input__inner {
  color: var(--el-input-text-color, var(--el-text-color-regular));
}
.el-input {
  --el-input-text-color: var(--el-color-black);
}
.el-select-dropdown__item.selected {
  color: var(--el-color-black);
}
.el-select .el-input.is-focus .el-input__inner {
  --el-select-input-focus-border-color: var(--el-color-black);
}
.el-select .el-input__inner:focus {
  border-color: var(--el-color-black) !important;
}
.el-select:hover:not(.el-select--disabled) .el-input__inner {
  border-color: var(--el-text-color-regular);
}
.el-select .el-input .el-select__caret {
  color: var(--el-color-black);
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item {
  transition: 0.4s;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #00000014;
  transition: 0.4s;
}
.el-select-dropdown__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default {
  background: white;
}
.el-select-dropdown__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default
  .el-select-dropdown__list {
  margin: 0px !important;
}
.el-input {
  --el-input-border-radius: var(--el-border-radius-base);
}
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
.el-select {
  float: right;
  margin: 15px 0px;
}
</style>
