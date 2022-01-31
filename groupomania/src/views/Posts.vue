<template>
  <div>
    <NavApp />
    <h1 class="card-titlepost">Partagez vos intérêts avec votre communauté</h1>
    <InfoPost />
    <Footer />
  </div>
</template>

<script>
import NavApp from "../components/NavApp.vue";
import Footer from "../components/Footer";
import InfoPost from "../components/InfoPost.vue";
export default {
  name: "Posts",
  components: {
    NavApp,
    InfoPost,
    Footer,
  },

  data() {
    return {
      posts: [],
      post: {},
    };
  },
};
</script>

<style lang="scss">
.card-titlepost {
  margin: 1rem;
  text-align: center;
  display: block;
  background-color: rgb(178, 222, 228);
  border-color: rgb(178, 222, 228);
}
</style> 