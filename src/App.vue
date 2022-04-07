<template>
  <el-container>
    <el-aside width="200px">
      <TheMenu />
    </el-aside>

    <el-container>
      <el-header height="60px">
        <TheTopTask ref="TheTopTask" @newTask="addTask($event)" />
      </el-header>

      <el-main>
        <router-view
          :tasks="tasks || []"
          :areTasksLoading="areTasksLoading"
          v-on="{
            restart: sendRestartTask,
            delete: deleteTask,
          }"
        ></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ElNotification } from "element-plus";
import { v4 as uuid } from "@lukeed/uuid";
import * as TaskService from "./services/TaskService.js";
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import TheMenu from "./components/TheMenu.vue";
import TheTopTask from "./components/TheTopTask.vue";
import TaskList from "./components/TaskList.vue";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
  components: {
    TheMenu,
    TheTopTask,
    TaskList,
  },
  data() {
    return {
      tasks: null,
      areTasksLoading: true,
    };
  },
  watch: {
    tasks: {
      // Mise à jour de toutes les tâches en API dès que tasks change
      deep: true,
      async handler(newVal, oldVal) {
        if (newVal !== null && oldVal !== null) {
          try {
            await TaskService.updateAll(this.tasks);
          } catch (e) {
            console.error(e);
            this.$notify({
              title: "Mode hors-ligne",
              message: `Synchronisation des tâches impossible`,
              type: "error",
              offset: 50,
              duration: 3000,
            });
          }
        }
      },
    },
  },
  methods: {
    async addTask({ name, startTime }) {
      // Ajout de la tâche
      this.tasks.unshift({
        id: uuid(),
        name,
        startTime,
        endTime: Date.now(),
      });
    },
    sendRestartTask(taskID) {
      // Récupération du nom de l'ancienne tâche
      let newTaskname = null;
      this.tasks.forEach((task) => {
        if (task.id === taskID) {
          newTaskname = task.name;
        }
      });
      // Relancement de la tâche
      this.$refs.TheTopTask.restartTask(newTaskname);
    },
    async deleteTask(taskID) {
      // Récupération de l'index de la tâche
      let taskIndex = null;
      this.tasks.forEach((task, index) => {
        if (task.id === taskID) {
          taskIndex = index;
        }
      });
      // Suppression de la tâche
      this.tasks.splice(taskIndex, 1);
    },
  },
  async created() {
    // Récupération de toutes les tâches
    try {
      this.tasks = await TaskService.getAll();
    } catch (e) {
      console.error(e);
      this.tasks = [];
      this.$notify({
        title: "Mode hors-ligne",
        message: `Récupération des tâches impossible`,
        type: "error",
        offset: 50,
        duration: 3000,
      });
    }
    this.areTasksLoading = false;
  },
};
</script>

<style scoped>
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
.el-header {
  display: grid;
  align-content: center;
}
</style>

<style lang="scss">
@font-face {
  font-family: "Grape Nuts";
  src: url("../font/GrapeNuts-Regular.ttf");
}
@font-face {
  font-family: "Oswald";
  src: url("../font/Oswald-VariableFont_wght.ttf");
}

p.el-loading-text {
  font-family: "Grape Nuts";
  font-size: 20px !important;
  font-weight: bold;
}

body {
  margin: 0;
  background-color: black;
}
#app {
  font-family: Oswald;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input {
  font-family: Oswald;
  letter-spacing: 1px;
}
.el-aside {
  border-right: 3px solid #f99829;
}
.el-scrollbar {
  background-color: black;
}
.el-header {
  background-color: #f99829;
  .el-input .el-input__inner {
    border: none !important;
    background-color: transparent;
    color: white !important;
    --el-input-placeholder-color: white;
  }
}
tr .cell {
  display: flex;
}

.el-button.button-copy {
  background-color: #f99829;
  color: white;
  border-color: #f99829;
}
.el-button.button-play {
  background-color: #4ca9e5;
  color: white;
  border-color: #4ca9e5;
}
.el-button.button-stop {
  background-color: #f0340f;
  color: white;
  border-color: #f0340f;
}

.el-loading-spinner .path {
  stroke: black;
}
.el-loading-spinner .el-loading-text {
  color: black;
  margin: 0px 0;
  font-size: 13px;
}
.el-loading-spinner {
  top: 50%;
  margin-top: calc((0px - var(--el-loading-spinner-size)) / 1.5);
  width: 100%;
  text-align: center;
  position: absolute;
}
.el-notification__title {
  font-family: Oswald;
}
p {
  font-family: Oswald;
}
</style>
