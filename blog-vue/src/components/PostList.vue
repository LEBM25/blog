<template>
  <div>
    <div class="row mb-2">
      <div class="col-md-8 post">
        <div class="col-md-12 post card" v-for="listado in  postList" :key="listado._id" :v-if="listado.estatus == 2">
          <div class="row">
            <div class="col-md-12">
              <h4>
                <strong>
                  <a
                    href="http://www.jquery2dotnet.com/2013/12/cool-share-button-effects-styles.html"
                    class="post-title"
                  >{{listado.titulo}}</a>
                </strong>
              </h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 post-header-line">
              <span class="glyphicon glyphicon-user"></span>por 
              <a href="#">{{(listado.userid) ? listado.userid.userName : ''}}</a> |
              <span class="glyphicon glyphicon-calendar"></span>{{listado.fechaCreacion | moment("from","now")}} |
              <span class="glyphicon glyphicon-comment"></span>
              <a href="#">{{listado.comentarios.length}} Comments</a> |
              <i class="icon-share"></i>
              <a href="#">{{listado.likes.length}} <i  class="fa fa-thumbs-up "></i> Likes</a> |
              
            </div>
          </div>
          <div class="row post-content  " >
            
            <div class="col-md-9">

              {{listado.publicacion || 'falta escribir algo'}}
              <br>
              <button type="buttom" class="btn btn-outline-dark" v-on:click="readPost(listado._id)">Leer Mas</button>
                
              
            </div>
          </div>
        </div>    
      </div>
      <div class="col-md-4">
        <h4>Ultimos Post</h4> 
        <LastPost></lastPost>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import LastPost from "./lastPost.vue";
export default {
  name: "PostList",
  data() {
    return {
      postList: []
    };
  },
  mounted() {
    var $this = this;
    axios
      .post("http://localhost:3800/api/postList",{q: 2})
      .then(function(response) {
        $this.postList = response.data.message;
      })
      .catch(function(error, response) {
        console.log(error, response);
      });
  },
  methods: {
    readPost: function(id) {
      this.$router.push({ path: `/ViewPost/${id}` });
    }
  },
  components :{
    LastPost
  }
};
</script>
<style scoped>
.publicacion {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
a:hover {
  text-decoration: none;
}
.btn {
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
}
.btn-read-more {
  padding: 5px;
  text-align: center;
  border-radius: 0px;
  display: inline-block;
  border: 2px solid #662d91;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  color: #662d91;
}

.btn-read-more:hover {
  color: #fff;
  background: #662d91;
}
.post {
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}
.post-title {
  color: #662d91;
}
.post .glyphicon {
  margin-right: 5px;
}
.post-header-line {
  border-bottom: 1px solid #ddd;
  font-size: 12px;
}
.post-content {
  padding-bottom: 15px;
  padding-top: 15px;
}
</style>