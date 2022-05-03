<template>
  <div>
    <h2>Connecte toi</h2>
    <el-row class="bloc-form">
      <el-col :span="12" :offset="6" class="back-form">
        <form action="/" method="get" @submit.prevent="sendForm">
          <BaseInput
            label="Adresse email"
            v-model="email"
            placeholder="Entre ton e-mail ici"
            type="email"
            id="email"
            aria-describedby="emailError"
            :aria-invalid="v$.email.$invalid"
          />
          <el-alert
            v-if="v$.email.$error"
            :title="v$.email.$error ? v$.email.$errors[0].$message : ''"
            type="error"
            :closable="false"
            id="emailError"
          ></el-alert>

          <BaseInput
            label="Mot de passe"
            v-model="password"
            placeholder="********"
            type="password"
            id="password"
            aria-describedby="passwordError"
            :aria-invalid="v$.password.$invalid"
          />
          <el-alert
            v-if="v$.password.$error"
            :title="v$.password.$error ? v$.password.$errors[0].$message : ''"
            type="error"
            :closable="false"
            id="passwordError"
          ></el-alert>

          <div>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              @click.prevent="sendForm"
              class="button-connexion"
              ><span class="span-bouton-co">Confirmer</span>
            </el-button>
            <el-alert
              v-if="apiError"
              :title="apiError"
              type="error"
              :closable="false"
            ></el-alert>
          </div>
        </form>
      </el-col>
    </el-row>
  </div>
  <p class="link-inscription">
    Pas encore de compte ? <a href="./register">Inscris-toi</a>
  </p>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "../utils/validators.js";
import BaseInput from "../components/BaseInput.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    BaseInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      email: "",
      password: "",
      loading: false,
      apiError: null,
    });
    const rules = {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    };

    const v$ = useVuelidate(rules, state, { $autoDirty: true });

    const sendForm = async () => {
      v$.value.$touch();
      if (!v$.value.$error) {
        state.loading = true;
        const res = await store.dispatch("users/login", {
          email: state.email,
          password: state.password,
        });
        if (res === true) {
          router.push("/");
        } else {
          state.apiError = res;
        }
        state.loading = false;
      }
    };
    return {
      ...toRefs(state),
      v$,
      sendForm,
    };
  },
};
</script>

<style lang="scss" scoped>
form {
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  text-align: left;
  vertical-align: middle;
}

fieldset {
  border: none;
}
legend {
  display: none;
}

.el-alert {
  display: block;
  max-width: 80%;
  margin: 10px 0;
}
.el-checkbox {
  margin: 20px 0 0;
}
.el-button {
  margin-top: 25px;
}
.back-form {
  background: white;
  border-radius: 10px;
  box-shadow: rgba(110, 4, 4, 0.48) 6px 2px 16px 0px,
    rgba(110, 4, 4, 0.8) -6px -2px 16px 0px;
  background-color: #ffb5c2;
}
</style>

<!--No scope -->
<style>
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
h1 {
  color: #550203;
  font-size: 45px;
  letter-spacing: 25px;
}
h2 {
  color: white;
}

/**Form  */
.bloc-form {
  margin: auto;
  width: 70%;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
}
label {
  color: #550203;
}
.el-input {
  display: block;
  max-width: 100% !important;
  margin: 10px 0;
}
input.el-input__inner {
  color: #550203;
  background-color: white;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
}
.el-input__inner:focus {
  outline: 0;
  box-shadow: rgba(110, 4, 4, 0.1) 0px 10px 10px -10px;
}
.el-input {
  --el-input-placeholder-color: #550203;
}

input:hover {
  border: 1px solid white !important;
  transition: all 0.3s;
}
input:focus {
  border: 1px solid white !important;
}

/**Button */
.button-connexion {
  all: unset;
  width: 100px;
  height: 30px;
  font-size: 16px;
  background: transparent;
  border: none;
  position: relative;
  color: #550203;
  cursor: pointer;
  z-index: 1;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-connexion::after,
.button-connexion::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -99999;
  transition: all 0.4s;
}

.button-connexion::before {
  transform: translate(0%, 0%);
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 10px;
}

.button-connexion::after {
  transform: translate(10px, 10px);
  width: 35px;
  height: 35px;
  background: #ffffff15;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 50px;
}

.button-connexion:hover::before {
  transform: translate(5%, 20%);
  width: 110%;
  height: 110%;
  color: #550203;
}
.button-connexion:hover {
  color: #550203;
  height: 30px;
}

.button-connexion:hover::after {
  border-radius: 10px;
  transform: translate(0, 0);
  width: 110vh;
  height: 100%;
}

.button-connexion:active::after {
  transition: 0s;
  transform: translate(0, 5%);
}

.el-button:focus,
.el-button:hover {
  color: #550203;
  border-color: rgba(255, 255, 255, 0);
  background-color: rgba(255, 255, 255, 0);
  outline: 0;
}
span.span-bouton-co {
  padding: 20px 38px;
  transition: all 0.4s;
}
span.span-bouton-co:hover {
  transform: translate(0%, 10%);
  transition: all 0.4s;
}

/** Lien inscription */
p.link-inscription {
  color: #550203;
}
.link-inscription a {
  color: #550203;
  text-decoration: none;
  border-bottom: 0.125em solid white;
  box-shadow: inset 0 -0.125em 0 white;
  transition: box-shadow 270ms cubic-bezier(0.77, 0, 0.175, 1),
    color 270ms cubic-bezier(0.77, 0, 0.175, 1);
  transition: all 0.4s;
}

.link-inscription a:hover {
  border-bottom: 0.125em solid #550203;
  box-shadow: inset 0 -1.125em 0 #550203;
  color: white;
}

.link-inscription a:focus {
  background: #550203;
  outline: none;
  background: #550203;
  color: white;
  box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
  h1 {
    color: #550203;
    font-size: 45px;
    letter-spacing: 15px;
  }
  .bloc-form {
    width: 100%;
    padding: 0px 20px;
  }
  .el-col-offset-6 {
    margin-left: 0%;
  }
  .el-col-12 {
    max-width: 100%;
    flex: 0 0 100%;
  }
}
</style>
