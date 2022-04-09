<template>
  <div>
    <h1>Paramètres</h1>
    <router-view @updateTasks="$emit('updateTasks')"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h1 {
  color: #f99829;
}
</style>
