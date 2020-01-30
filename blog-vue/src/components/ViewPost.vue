<template>
  <div class="container">
    <div class="row">
      <!-- Post Content Column -->
      <div class="col-lg-10 offset-md-1">
        <!-- Title -->
        <h1 class="mt-4">{{ dataPost ? dataPost.titulo : ''}}</h1>

        <!-- Author -->
        <div class="lead">
          <span class="glyphicon glyphicon-user"></span> por
          <a href="#">{{ dataPost ? dataPost.userid.userName : ''}} |</a>
          {{ dataPost.fechaCreacion | moment("from","now")}}
          <div
            v-if="dataPost.likes.filter((x) => x.email == userName).length == 0 && $store.state.token"
            style="float:right"
          >
            <a href="#" @click="giveALike()">
              <i class="fa fa-thumbs-o-up fa-2x"></i>
            </a>
          </div>
          <div
            v-if="dataPost.likes.filter((x) => x.email == userName).length > 0 && $store.state.token"
            style="float:right"
          >
            <a href="#">
              <i class="fa fa-thumbs-up fa-2x"></i>
            </a>
          </div>
        </div>
        <hr />

        <!-- Preview Image -->
        <img class="img-fluid rounded" v-bind:src="imagen" alt width="900" height="300"/>

        <hr />

        <!-- Post Content -->
        <p class="lead">{{dataPost ? dataPost.publicacion : '' }}</p>

        <hr />
        <CommentPost v-on:nuevoComentario="reloadPost" v-bind:dataPost="id" v-if="$store.state.token"></CommentPost>

        <div    v-if="comentarios.length > 0" class="col-md-12">
          <div class="blog-comment">
            <ul v-for="listado in  comentarios" :key="listado._id" class="comments">
              <li class="clearfix">
                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="avatar" alt="">
                <div class="post-comments">
                  <p class="meta">
                    {{listado.fechaCreacion | moment("from","now")}}
                    <a href="#">{{listado.userid.userName}}</a> Dice :
                    
                  </p>
                  <p>
                    {{listado.comment}}
                  </p>
                </div>
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentPost from "./CommentPost.vue";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "ViewPost",
  data() {
    return {
      id: this.$route.params.id,
      dataPost: null,
      comentarios: null,
      imagen : null
    };
  },
  components: {
    CommentPost
  },
  mounted() {
    if (!this.$route.params.id || this.$route.params.id == undefined) {
      this.$router.push({ path: `/PostList` });
    }
    var $this = this;
    axios
      .post("http://localhost:3800/api/postById", { id: this.id })
      .then(function(response) {
        $this.dataPost = response.data.publicacion[0];
        $this.comentarios = response.data.comments;
        $this.imagen = require('../assets/' + $this.dataPost.imagen)
        console.log($this.comentarios)
        
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    giveALike: function() {
      var $this = this;
      axios
        .post("http://localhost:3800/api/giveaLike", {
          id: this.id,
          userName: this.userName
        })
        .then(function(response) {
          $this.postList = response.data.message;
          if (response) {
            $this.reloadPost();
          }
          //$this.$router.push({ path: `/home/${response.data.token}` });
        })
        .catch(function(error, response) {
          console.log(error, response);
        });
    },

    reloadPost() {
      var $this = this;
      axios
        .post("http://localhost:3800/api/postById", { id: this.id })
        .then(function(response) {
          $this.dataPost = response.data.publicacion[0];
        $this.comentarios = response.data.comments;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: mapState(["userName"])
  
};
</script>