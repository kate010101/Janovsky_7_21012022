 <template>
  <footer>
    <div class="text-center p-3">
      <span>© 2022 Copyright : </span>
      <a
        href="#"
        id="lien"
        role="button"
        aria-label="se connecter au site groupomania"
        >Groupomania.com</a
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
<style scoped lang="scss">
footer {
  height: auto;
  width: 100%;
  background-color: #fff;
  margin-top: 15rem;

  span,
  #lien {
    color: #791602;
  }
}
</style>