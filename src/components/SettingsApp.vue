<template>
  <h2 class="titre-settings-app">Application</h2>
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
  color: #f99829;
}
.para-settings-app {
  color: #f99829;
}
p {
  text-align: left;
}

input.el-input__inner {
  border-radius: 0px;
}
.bouton-confirmation {
  background: #f99829;
  border: 1px solid #f99829;
  border-radius: 50px;
  padding: 20px 25px;
  transition: 0.4 !important;
}
.el-button:focus,
.el-button:hover {
  background-color: white;
  color: black;
  border-color: white;
}
.bouton-confirmation span {
  font-size: 16px;
}
</style>
