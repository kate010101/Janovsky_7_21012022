<template>
  <header>
    <img
      src="../assets/icon-left-font.png"
      width="300"
      height="67"
      alt="le logo de gropomania"
      title="logo groupomania"
      id="logo"
    />
  </header>
</template>


<script>
export default {
  name: "Nav",
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  height: 5rem;
  background-color: #fff;
  #logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style> 