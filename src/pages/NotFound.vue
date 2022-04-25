<template>
  <div>
    <h1>
      <span class="error-title-404">404</span> <br /><span
        class="error-title-404-2"
        >{{ title }}</span
      >
    </h1>
    <h2 v-if="wrongPath">"{{ wrongPath }}"</h2>
    <el-button
      class="button-error-404"
      @click="goToPreviousPage"
      type="primary"
      round
      >Revenir en arrière</el-button
    >
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      wrongPath: route.params.wrongPath,
      title: "Page introuvable",
    });

    const goToPreviousPage = function () {
      router.back();
    };

    return {
      ...toRefs(state),
      goToPreviousPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.error-title-404 {
  color: white;
  font-size: 100px;
}
.error-title-404-2 {
  color: white;
  font-size: 30px;
}

h2 {
  color: white;
  font-size: 20px;
  font-weight: 400;
}
.button-error-404 {
  font-size: 16px;
}
.button-error-404 {
  padding: 20px 25px;
}
</style>
