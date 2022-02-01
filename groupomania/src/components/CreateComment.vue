<template>
  <div class="blocComment">
    <form class="mt-3">
      <textarea
        v-bind="$attrs"
        class="content"
        name="content"
        ref="content"
        placeholder="Tapez un commentaire !"
      >
      </textarea>
      <!--<div>L'id du post est :{{ $props.postId }}</div>-->
      <span id="btn-publication">
        <button
          type="submit"
          title="créer"
          aria-label="créer un commentaire"
          class="btn btn-primary"
          v-bind="$attrs"
          @click.prevent="postComment($props.postId)"
          ref="comment"
        >
          <i class="far fa-paper-plane"></i>
        </button>
      </span>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "createComment",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      post: {},
      content: "",
      comment: {},
      comments: [],
    };
  },
  props: {
    postId: Number,
  },

  methods: {
    postComment(postId) {
      axios
        .post("http://localhost:3000/api/comments", {
          userId: localStorage.getItem("userId"),
          postId: postId,
          content: this.$refs.content.value,

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })

        .then(() => {
          this.$emit("postCommentResponse");
        })
        .catch((error) => {
          console.log(error);
        });
      this.$refs.content.value = "";
    },
  },
};
</script>
<style scoped lang="css">
.blocComment textarea {
  border: none;
  width: 100%;
}
@media screen and (min-width: 768px) {
  input {
    width: 20.5rem;
  }
}
@media screen and (max-width: 410px) {
  input {
    width: 8.5rem;
  }
}
input:focus {
  outline: none;
}
#btn-publication {
  display: block;
  text-align: end;
}
</style> 