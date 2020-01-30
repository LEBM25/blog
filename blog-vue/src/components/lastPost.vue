<template>
  <div>
    <ul class="list-group" v-for="listado in  postList" :key="listado._id">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-on:click="readPost(listado._id)">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Titulo: {{listado.titulo}}</h5>
          <small></small>
        </div>
        <i  class="fa fa-thumbs-o-up "></i>
        <span class="badge badge-primary badge-pill">{{listado.likes.length}}</span>
      </li>      
    </ul>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LastPost",
  data() {
    return {
      postList: []
    };
  },
  mounted() {
    var $this = this;
    axios
      .post("http://localhost:3800/api/postList",{q: 1})
      .then(function(response) {
        $this.postList = response.data.message;
        console.log($this.$router)
        //$this.$router.push({ path: `/home/${response.data.token}` });
      })
      .catch(function(error, response) {
        console.log(error, response);
      });
  },
  methods: {
    readPost: function(id) {
      this.$router.push({ path: `/ViewPost/${id}` });
    },
    
  }
};
</script>