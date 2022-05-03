<template>
  <el-container v-if="$route.meta.layout" class="mainContainer">
    <el-aside width="200px">
      <TheMenu />
    </el-aside>

    <el-container>
      <el-header height="60px"> <TheTopTask ref="TheTopTask" /> </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

  <div v-else-if="$route.meta.layout === false" class="mainContainer">
    <h1 class="titleNoLayout">TRACKER.CO</h1>
    <router-view></router-view>
  </div>

  <div v-else class="mainContainer" v-loading="true"></div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import TheMenu from "./components/TheMenu.vue";
import TheTopTask from "./components/TheTopTask.vue";
import TaskList from "./components/TaskList.vue";

export default {
  components: {
    TheMenu,
    TheTopTask,
    TaskList,
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks.tasks,
    }),
  },
  watch: {
    tasks: {
      // Mise à jour de toutes les tâches en API dès que tasks change
      deep: true,
      async handler(newVal, oldVal) {
        if (newVal !== null && oldVal !== null) {
          try {
            await this.updateAllTasks();
          } catch (e) {
            console.error(e);
            this.sendError({
              title: "Mode hors-ligne",
              message: `Synchronisation des tâches impossible`,
            });
          }
        }
      },
    },
  },
  methods: {
    ...mapActions({
      setWatcherCurrentUser: "users/setWatcherCurrentUser",
      fetchAllTasks: "tasks/fetchAllTasks",
      updateAllTasks: "tasks/updateAllTasks",
      sendError: "notifications/sendError",
    }),
    ...mapMutations({
      SET_NOTIFIER: "notifications/SET_NOTIFIER",
    }),
  },
  async created() {
    // Mise en place de l'actualisation de l'utilisateur actuel
    this.setWatcherCurrentUser();
    // Mise en place du système de notification
    this.SET_NOTIFIER(this.$notify);
    // Récupération de toutes les tâches
    try {
      await this.fetchAllTasks();
    } catch (e) {
      console.error(e);
      this.sendError({
        title: "Mode hors-ligne",
        message: `Récupération des tâches impossible`,
      });
    }
  },
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: table;
}
body {
  display: table-cell;
  vertical-align: middle;
  background: #ffb5c2;
}
.mainContainer {
  height: 100%;
}
.titleNoLayout {
  margin: 15px auto;
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
  --el-table-border-color: #550203;
  --el-table-border: 1px solid #550203;
  --el-table-text-color: #550203;
  --el-table-header-bg-color: #550203 !important;
  --el-table-header-text-color: white;
  --el-table-row-hover-bg-color: var(--el-bg-color);
  --el-table-current-row-bg-color: var(--el-color-primary-light-9);
  --el-bg-color: #55020363 !important;
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
.highlight-line {
  background-color: #55020363 !important;
}
tr.el-table__row.highlight-line .cell {
  color: white;
}

// :root racine
:root {
  --el-text-color-regular: #550203;
  --el-popper-border-radius: 0px;
  --el-color-primary: #550203;
  --el-text-color-placeholder: #00000054;
  --el-input-text-color: black !important;
  --el-color-success-light-3: white !important;
  --el-color-primary: white !important;
}
//
body {
  margin: 0;
  background-color: white;
}
@font-face {
  font-family: "BebasNeue";
  src: url("../font/BebasNeue Bold.ttf");
}
@font-face {
  font-family: "Montserrat";
  src: url("../font/Montserrat-Regular.ttf");
}
@font-face {
  font-family: "Helvetica";
  src: url("../font/Helvetica.ttf");
}
p.el-loading-text {
  font-family: "Montserrat";
  font-size: 20px !important;
  font-weight: bold;
}
h1 {
  font-family: "BebasNeue";
}
#app {
  font-family: Montserrat;
  letter-spacing: 0.8px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input {
  font-family: Montserrat;
  letter-spacing: 0.5px;
}
.el-aside {
  border-right: 3px solid #550203;
  min-height: 100vh;
}
.el-scrollbar {
  background-color: #ffb5c2;
}
.el-header {
  background-color: transparent;
  .el-input .el-input__inner {
    border: none !important;
    background-color: transparent;
    color: #550203 !important;
    --el-input-placeholder-color: #550203;
    border: 2px solid #ffb5c2 !important;
    box-shadow: 0 0 0 1px #ffb5c2 inset;
    box-shadow: #ffb5c2 0px 3px 6px, #ffb5c2 0px 3px 6px;
  }
}
tr .cell {
  display: flex;
}
.el-button {
  transition: 0.4s !important;
}

.el-button.button-copy {
  background-color: #8338ec;
  color: white;
  border-color: #8338ec;
}
.el-button.button-copy:hover {
  background-color: white;
  color: #8338ec;
  border-color: #8338ec;
}
.el-button.button-play {
  background-color: #3a86ff;
  color: white;
  border-color: #3a86ff;
}
.el-button.button-play:hover {
  background-color: white;
  color: #3a86ff;
  border-color: #3a86ff;
}
.el-button.button-stop {
  background-color: #d80032;
  color: white;
  border-color: #d80032;
}
.el-button.button-stop:hover {
  background-color: white;
  color: #d80032;
  border-color: #d80032;
}

.el-loading-spinner .path {
  stroke: black !important;
}
.el-loading-spinner .el-loading-text {
  color: black !important;
  margin: 0px 0 !important;
  font-size: 16px !important;
}
.el-loading-spinner {
  top: 50%;
  margin-top: calc((0px - var(--el-loading-spinner-size)) / 1.5);
  width: 100%;
  text-align: center;
  position: absolute;
}
.el-notification__title {
  font-family: Montserrat;
  letter-spacing: 1px;
}
p {
  font-family: Montserrat;
  letter-spacing: 1px;
}
span {
  font-family: Montserrat;
  letter-spacing: 1px;
  font-weight: 100;
}
// Arrow menu paramètres
i.el-icon.el-sub-menu__icon-arrow svg.icon {
  color: #550203 !important;
  font-size: 16px;
}
/**Alert */
.el-alert--error.is-light {
  background-color: white !important;
  color: #fb0b0c !important;
}
</style>
