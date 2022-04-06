<template>
  <el-table
    :data="tasks"
    stripe
    row-key="id"
    empty-text="Aucune tâche"
    style="width: 100%"
    v-loading="areTasksLoading"
    element-loading-text="Veuillez patienter..."
    element-loading-background="rgba(249, 152, 41, 0.8)"
    :element-loading-svg="svg"
    class="custom-loading-svg"
  >
    <el-table-column prop="name" label="Tâche"> </el-table-column>

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
            delete: sendDelete,
          }"
          @copyTaskname="copyToClipboard(scope.row.name)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
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
    };
  },
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
    sendDelete(data) {
      this.$emit("delete", data);
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
  },
};
</script>
