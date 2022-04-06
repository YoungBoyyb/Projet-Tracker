<template>
  <el-row>
    <el-col :xs="12" :span="15" :lg="18">
      <el-input
        @keyup.enter="toggleTask"
        v-model="taskname"
        placeholder="Nom de votre tâche"
      />
    </el-col>
    <el-col :xs="12" :span="12" :lg="6" class="actions">
      <el-button
        class="button-play"
        v-if="!isTaskInProgress"
        @click="startTask"
        type="primary"
        :icon="Edit"
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
        class="button-stop"
        v-else
        @click="stopTask"
        type="danger"
        :icon="Edit"
        circle
        ><el-icon
          ><video-pause /><svg
            class="icon"
            width="200"
            height="200"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-042ca774=""
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
            ></path></svg></el-icon
      ></el-button>
      <span>{{ currentDuration }}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      taskname: "",
      isTaskInProgress: false,
      startTime: null,
      nowTime: null,
      intervalEverySecond: null,
      errorMsg: null,
    };
  },
  computed: {
    currentDuration() {
      if (this.startTime && this.nowTime) {
        return this.durationBetweenTimestamps(this.startTime, this.nowTime);
      } else {
        return "00:00:00";
      }
    },
  },
  watch: {
    isTaskInProgress(isInProgress) {
      if (isInProgress) {
        this.intervalEverySecond = setInterval(() => {
          this.nowTime = Date.now();
        }, 1000);
      } else {
        clearInterval(this.intervalEverySecond);
      }
    },
  },
  methods: {
    startTask() {
      // Vérifications

      if (this.taskname.length === 0) {
        this.errorMsg = "Le nom d'une tâche ne peut pas être vide";
        return;
      } else if (this.isTaskInProgress) {
        this.errorMsg = "Une tâche est déjà en cours";
        return;
      } else {
        this.errorMsg = null;
      }

      // Début de la tâche
      this.isTaskInProgress = true;
      this.startTime = Date.now();
      this.nowTime = Date.now();
    },
    stopTask() {
      // Vérifications
      if (!this.isTaskInProgress) {
        this.errorMsg = "Aucune tâche n'est en cours";
        return;
      }
      // Envoie de la nouvelle tâche à ajouter
      this.$emit("newTask", {
        name: this.taskname,
        startTime: this.startTime,
      });
      // Fin de la tâche
      this.isTaskInProgress = false;
      this.errorMsg = null;
      this.nowTime = null;
      this.taskname = "";
    },
    toggleTask() {
      if (this.isTaskInProgress) {
        this.stopTask();
      } else {
        this.startTask();
      }
    },
    restartTask(newTaskname) {
      // Arrêt de la tâche en cours si besoin
      if (this.isTaskInProgress) {
        this.stopTask();
      }
      // Lancement de la nouvelle tâche
      this.$nextTick(function () {
        this.taskname = newTaskname;
        this.startTask();
      });
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
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  padding-left: 20px;
  box-sizing: border-box;
}
.actions {
  text-align: right;
  padding-right: 20px;
  span {
    padding-left: 20px;
  }
}
.el-row {
  display: flex;
  position: relative;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
