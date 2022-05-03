<template>
  <div class="main-settings-user">
    <h3 class="titre-settings-user">Utilisateurs</h3>
    <div v-if="$store.state.users.currentUser">
      <div class="connecte-user">
        <strong>Connecté</strong> : {{ $store.state.users.currentUser.email }}
      </div>

      <el-button
        class="button-logout"
        @click="dialogVisible = true"
        type="danger"
        round
        >Déconnexion</el-button
      >
    </div>

    <el-dialog
      title="Confirmation de déconnexion"
      v-model="dialogVisible"
      width="30%"
    >
      <span>Êtes-vous sûr de vouloir vous déconnecter ?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="button-annuler" @click="dialogVisible = false"
            >Annuler</el-button
          >
          <el-button
            class="button-confirmer"
            type="danger"
            @click="confirmLogout"
            :loading="loading"
            >Confirmer</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
    };
  },
  methods: {
    async confirmLogout() {
      this.loading = true;
      const res = await this.$store.dispatch("users/logout");
      this.loading = false;
      if (res === true) {
        this.$router.push("/login");
      } else {
        this.dialogVisible = false;
        this.$store.dispatch("notifications/sendError", {
          title: "Erreur de déconnexion",
          message: res,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.titre-settings-user {
  color: #550203;
}
</style>

<style>
.main-settings-user {
  margin-top: 50vh;
  transform: translateY(-150%);
}

.button-logout {
  background-color: #d80032;
  color: white;
  border-color: #d80032;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
}
.button-logout:hover {
  background-color: white;
  color: #d80032;
  border-color: #d80032;
}
button.el-button.el-button--danger.is-round.button-logout {
  text-align: center;
}
.el-dialog {
  --el-dialog-width: 50% !important;
}
.el-overlay-dialog {
  margin: -150px;
}
.connecte-user {
  margin-block-start: 1em;
  margin-block-end: 1em;
}

.el-overlay {
  background-color: #5502033d !important;
}

span.el-dialog__title {
  color: #550203;
}

.el-dialog__body {
  color: #550203;
}

span.dialog-footer button.el-button {
  border-radius: 50px;
}

button.el-button.button-annuler {
  background-color: #3a86ff;
  color: white;
  border-color: #3a86ff;
}
button.el-button.button-annuler:hover {
  background-color: white;
  color: #3a86ff;
  border-color: #3a86ff;
}
button.el-button.el-button--danger.button-confirmer {
  background-color: #d80032;
  color: white;
  border-color: #d80032;
}
button.el-button.el-button--danger.button-confirmer:hover {
  background-color: white;
  color: #d80032;
  border-color: #d80032;
}
</style>
