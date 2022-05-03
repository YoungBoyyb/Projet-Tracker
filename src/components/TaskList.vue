<template>
  <el-select
    style="--el-border-radius-base: 0px, --el-popper-border-radius: 0px, "
    v-model="sortBy"
    class="m-2 select-taches --el-color-white input-asc-desc"
    placeholder="Ordre des tâches"
    size="large"
  >
    <el-option label="La plus récente" value="descending" />
    <el-option label="La plus ancienne" value="ascending" />
  </el-select>

  <div v-for="(dayTasks, dayTS) in tasksByDay" :key="dayTS">
    <h2 class="h3-date">{{ fullDateFormatter.format(dayTS) }}</h2>
    <el-table
      :data="dayTasks"
      :row-class-name="checkHighlight"
      row-key="id"
      @row-click="setHighlight"
      empty-text="Aucune tâche"
      style="width: 100%"
      v-loading="areTasksLoading"
      element-loading-text="Veuillez patienter..."
      element-loading-background="rgba(249, 152, 41, 0.8)"
      :element-loading-svg="svg"
      class="custom-loading-svg table-app"
      :ref="dayTS"
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
          {{
            durationBetweenTimestamps(scope.row.startTime, scope.row.endTime)
          }}
        </template>
      </el-table-column>

      <el-table-column align="right" label="Actions" width="425">
        <template #header></template>
        <template #default="scope">
          <TaskListActions :taskID="scope.row.id" :taskname="scope.row.name" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TaskListActions from "./TaskListActions.vue";
import { useTimestamps } from "../features/useTimestamps.js";

export default {
  components: {
    TaskListActions,
  },
  setup() {
    const { durationBetweenTimestamps, formatTimestamp, fullDateFormatter } =
      useTimestamps();
    return {
      durationBetweenTimestamps,
      formatTimestamp,
      fullDateFormatter,
    };
  },
  data() {
    return {
      defaultSortBy: "descending",
      sortBy:
        this.$route.query.sortBy === "ascending" ? "ascending" : "descending",
    };
  },
  computed: {
    ...mapState({
      areTasksLoading: (state) => state.tasks.areTasksLoading,
    }),
    ...mapGetters({
      tasksByDay: "tasks/tasksByDay",
    }),
  },
  watch: {
    sortBy(newVal) {
      this.$router.push({
        query: { sortBy: newVal === this.defaultSortBy ? undefined : newVal },
      });
      this.sortTable();
    },
    tasksByDay: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.sortTable();
        });
      },
    },
  },
  methods: {
    sortTable() {
      for (let dayTS in this.tasksByDay) {
        this.$refs[dayTS].sort("name", this.sortBy);
      }
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
<style>
.el-select .el-input .el-select__caret {
  color: white !important;
}
input.el-input__inner {
  color: white;
}
.el-select-dropdown__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default
  .el-select-dropdown__list {
  list-style: none;
  margin: 0px 0 !important;
}

.el-select-dropdown__item {
  color: white !important;
}
.el-select-dropdown__item:hover {
  color: #550203 !important;
}
.input-asc-desc {
  background: transparent;
}

input.el-input__inner {
  background: #550203;
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
    inset;
}
.el-select-dropdown__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default {
  background-color: #550203;
}
.el-select .el-input.is-focus .el-input__inner {
  box-shadow: 0 0 0 1px white inset !important;
}
input.el-input__inner {
  border-radius: 0px;
}
.table-app.el-table {
  --el-table-row-hover-bg-color: #55020363 !important;
}
.el-select__popper.el-popper[role="tooltip"] .el-popper__arrow::before {
  border: 1px solid #550203 !important;
}
.el-popper.is-light .el-popper__arrow::before {
  background: #550203 !important;
}
.el-input--large {
  font-size: 12px !important;
  line-height: 38px;
}
</style>

<style lang="scss" scoped>
.el-input__inner {
  color: var(--el-input-text-color, var(--el-text-color-regular));
}
.el-input {
  --el-input-text-color: var(--el-color-black);
}
.el-select-dropdown__item.selected {
  color: white;
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
  background-color: #ffb5c2;
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
  --el-table-tr-bg-color: #ffffff;
  --el-table-border-color: #ffb5c2;
  --el-table-border: 1px solid #ffb5c2;
  --el-table-text-color: #550203;
  --el-table-header-bg-color: #ffb5c2 !important;
  --el-table-header-text-color: white;
  --el-table-row-hover-bg-color: var(--el-bg-color);
  --el-table-current-row-bg-color: var(--el-color-primary-light-9);
  --el-table-header-text-color: #550203;
}
tr.el-table__row:hover {
  --el-table-text-color: red !important;
}

.h3-date {
  text-align: left;
  text-transform: capitalize;
  color: #550203;
  font-weight: 400;
  font-size: 2vh;
}
</style>
