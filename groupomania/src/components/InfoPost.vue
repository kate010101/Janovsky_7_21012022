<template>
  <div v-if="user.isAdmin || userId">
    <AddPost @postResponse="getPosts()" />
    <!-- On récupére les posts des plus récents aux plus anciens -->
    <div class="card" :key="post.postId" v-for="post in posts.slice()">
      <div
        class="card-header"
        v-for="user in users.filter((user) => {
          return user.userId == post.userId;
        })"
        :key="user.userId"
      >
        <img
          v-if="user.imageUrl == null"
          src="../assets/icon-profil.png"
          alt="photo de profil provisoire"
          title="photo de profil"
          class="avatar"
        />
        <img
          v-else
          :src="user.imageUrl"
          class="avatar"
          alt="profile picture"
          title="picture profile"
        />
        <span class="card-title">{{ user.firstName }} {{ user.lastName }}</span>
      </div>
      <p v-if="post.title !== 'null'" class="card-text strong">
        {{ post.title }}
      </p>
      <p v-if="post.content !== 'null'" class="card-text">{{ post.content }}</p>
      <div v-if="post.imageUrl">
        <img
          class="card-img"
          :src="post.imageUrl"
          alt="image de la publication"
          title="image du post d'un utilisateur"
        />
      </div>
      <span class="btn-end" v-if="userId == post.userId">
        <button
          class="btn btn-danger"
          title="supprimer"
          aria-label="bouton supprimer"
          v-bind="post"
          @click.prevent="deletePublication(post.postId)"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </span>
      <button class="btn btn-primary" @click="showComments = !showComments">
        Commentaires <i class="fas fa-comment"></i>
      </button>
      <div v-if="showComments">
        <div v-if="comments">
          <div
            class="card-comment"
            v-for="comment in comments.filter((comment) => {
              return comment.postId == post.postId;
            })"
            :key="comment.commentId"
          >
            <p
              v-for="user in users.filter((user) => {
                return user.userId == comment.userId;
              })"
              :key="user.userId"
            >
              <img
                v-if="user.imageUrl == null"
                src="../assets/icon-profil.png"
                alt="photo de profil provisoire"
                title="photo de profil"
                class="rouned-circle mr-1 avatar"
              />
              <img
                v-else
                :src="user.imageUrl"
                class="avatar"
                alt="profile picture"
                title="picture profile"
              />
              <span class="card-title"
                >{{ user.firstName }} {{ user.lastName }}</span
              >
            </p>
            <p class="card-description comment">{{ comment.content }}</p>
            <div v-if="comment.userId == user.userId" id="btn-trash">
              <button
                class="btn-secondary"
                title="supprimer le commentaire"
                aria-label="bouton supprimer un commentaire"
                @click.prevent="deleteComment(comment.commentId)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <CreateComment
          v-bind="post"
          :postId="post.postId"
          @postCommentResponse="getComments(comment.commentId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateComment from "../components/CreateComment.vue";
import AddPost from "../components/AddPost.vue";
export default {
  name: "infoPost",
  components: {
    CreateComment,
    AddPost,
  },
  data() {
    return {
      showComments: false,
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      users: [],
      user: {
        userId: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
      post: {},
      posts: [],
      comment: {},
      comments: [],
    };
  },
  props: {
    postId: Number,
  },
  async created() {
    await axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.users = response.data.users;
        console.log(this.users);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
    await axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.posts = response.data.posts;
        console.log(this.posts);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
    await axios
      .get("http://localhost:3000/api/comments", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.comments = response.data;
        console.log(this.comments);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  },

  methods: {
    async deletePublication(postId) {
      let confirmDeletePost = confirm(
        "Voulez-vous vraiment supprimer votre publication ?"
      );
      if (confirmDeletePost == true) {
        await axios
          .delete(`http://localhost:3000/api/posts/${postId}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            let i = this.posts.map((data) => data.postId).indexOf(postId);
            this.posts.splice(i, 1);
          });
      } else {
        return;
      }
    },
    async deleteComment(commentId) {
      let confirmDeleteComment = confirm(
        "Voulez-vous vraiment supprimer votre commentaire ?"
      );
      if (confirmDeleteComment == true) {
        await axios
          .delete(`http://localhost:3000/api/comments/${commentId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            let i = this.comments
              .map((data) => data.commentId)
              .indexOf(commentId);
            this.comments.splice(i, 1);
          });
      } else {
        return;
      }
    },
    async getComments() {
      await axios
        .get("http://localhost:3000/api/comments", {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.comments = response.data;
          console.log(this.comments);
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
    },
    async getPosts() {
      await axios
        .get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.posts = response.data.posts;
          console.log(this.posts);
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  width: 50%;
  margin: auto;
  float: none;
  margin-top: 1rem;
}
.avatar {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  border-radius: 50%;
}
.card-text {
  margin: 1rem;
}
.strong {
  font-weight: bold;
}
.card-title {
  font-weight: 600;
  color: #0d6efd;
}
.card-paragraph {
  height: 1.7rem;
  margin-bottom: 0;
  text-align: center;
  color: #fff;
  background-color: #0d6efd;
}
.btn-end {
  display: block;
  text-align: end;
}
.card-comment {
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid #ced4da;
}
#btn-trash {
  text-align: end;
}
input {
  margin-bottom: 0;
}
.comment {
  margin-left: 0.5rem;
}
</style>