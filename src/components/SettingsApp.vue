<template>
  <div class="main-settings-app">
    <SettingsAppComposition />
    <h3 class="titre-settings-app">Application(Options API)</h3>
    <el-row>
      <el-col :offset="6" :span="12">
        <p class="para-settings-app">Clé secrète de votre API JSONbin.io :</p>
        <el-input
          placeholder="Entrer votre API KEY"
          v-model="inputValueJsonBinKey"
        ></el-input>
        <p class="para-settings-app">ID de votre bin :</p>
        <el-input
          placeholder="Entrer votre BIN ID"
          v-model="inputValueJsonBinID"
        ></el-input>
        <el-button
          type="primary"
          @click="updateApiValues"
          :loading="areNewValuesBeingTested"
          class="bouton-confirmation"
          >Confirmer</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { updateAxiosInstance } from "../services/TaskService.js";

export default {
  data() {
    return {
      inputValueJsonBinKey: "",
      inputValueJsonBinID: "",
      areNewValuesBeingTested: false,
    };
  },
  emits: ["updateTasks"],
  methods: {
    ...mapActions({
      fetchAllTasks: "tasks/fetchAllTasks",
      sendSuccess: "notifications/sendSuccess",
      sendError: "notifications/sendError",
    }),
    async updateApiValues() {
      // Mise à jour des valeurs de JSONBin.io
      this.areNewValuesBeingTested = true;
      if (this.inputValueJsonBinKey !== "") {
        localStorage.setItem("jsonBinKey", this.inputValueJsonBinKey);
      } else {
        localStorage.removeItem("jsonBinKey");
      }
      if (this.inputValueJsonBinID !== "") {
        localStorage.setItem("jsonBinID", this.inputValueJsonBinID);
      } else {
        localStorage.removeItem("jsonBinID");
      }

      // Tests de la connexion avec JSONBin.io
      updateAxiosInstance();
      try {
        await this.fetchAllTasks();
        localStorage.setItem("jsonBinAccess", true);
        this.sendSuccess({
          title: "Succès",
          message: `Vos clés sont enregistrés dans ce navigateur`,
        });
      } catch (e) {
        localStorage.removeItem("jsonBinAccess");
        this.sendError({
          title: "Erreur",
          message: `Cette combinaison ne fonctionne pas sur JSONBin.io`,
        });
      }
      this.areNewValuesBeingTested = false;
    },
  },
  created() {
    // Mise en place des valeurs du localStorage sur l'instance
    const jsonBinKey = localStorage.getItem("jsonBinKey");
    const jsonBinID = localStorage.getItem("jsonBinID");
    if (jsonBinKey) {
      this.inputValueJsonBinKey = jsonBinKey;
    }
    if (jsonBinID) {
      this.inputValueJsonBinID = jsonBinID;
    }
  },
};
</script>
<style scoped>
.el-button {
  margin-top: 20px;
}
</style>
<style lang="scss">
.titre-settings-app {
  color: #550203;
}
.para-settings-app {
  color: #550203;
}
p {
  text-align: left;
}

input.el-input__inner {
  border-radius: 0px;
  background: white;
  border: 2px solid #550203;
  color: #550203;
}
.bouton-confirmation {
  background: #550203;
  border: 2px solid #550203;
  border-radius: 50px;
  transition: 0.4 !important;
}
.el-button:focus,
.el-button:hover {
  background-color: transparent;
  color: #550203;
  border-color: #550203;
}
.bouton-confirmation span {
  font-size: 14px;
  letter-spacing: 1px;
}
.main-settings-app {
  margin-top: 50vh;
  transform: translateY(-90%);
}
</style>
