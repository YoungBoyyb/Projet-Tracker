<template>
  <div>
    <h1>
      <span class="error-title-404">404</span> <br /><span
        class="error-title-404-2"
        >Page introuvable</span
      >
    </h1>
    <h2 v-if="$route.params.wrongPath">"{{ $route.params.wrongPath }}"</h2>
    <el-button
      class="button-error-404"
      @click="$router.back()"
      type="primary"
      round
      >Revenir en arrière</el-button
    >
  </div>
</template>

<script>
export default {};
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
button.el-button.el-button--primary.el-button--default.is-round.button-error-404 {
  padding: 20px 25px;
}
</style>
