<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Administración de usuarios</h1>
      
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Titulo</th>
            <th>Author</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="listado in  postList" :key="listado._id">
            <td>{{listado.titulo}}</td>
            <td>{{(listado.userid) ? listado.userid.userName : ''}}</td>
            <td>{{listado.fechaCreacion | moment("from","now")}}</td>
            <td>
              <button v-if="listado.estatus == 1" title="Aprobar Post"
                type="button"
                v-on:click="aprobPost(listado._id,2)"
                class="btn btn-outline-primary"
              >              
                <i class="fa fa-check"></i>
              </button>
              <button v-if="listado.estatus == 2" title="Desaprobar Post"
                type="button"
                v-on:click="aprobPost(listado._id,1)"
                class="btn btn-outline-warning"
              ><i class="fa fa-bookmark-o"></i>
              </button>
              
              <button title="Ver Post"
                type="button"
                v-on:click="readPost(listado._id)"
                class="btn btn-outline-dark"
              >
                <i class="fa fa-eye"></i>
              </button>
              <button title="Eliminar Post"
                type="button"
                v-on:click="postDelete(listado._id)"
                class="btn btn-outline-danger"
              >
                <i class="fa fa-close"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert';
export default {
  name: "adminPost",
  data() {
    return {
      postList: []
    };
  },
  mounted() {
    var $this = this;
    axios
      .get("http://localhost:3800/api/postList")
      .then(function(response) {
        $this.postList = response.data.message;
        //$this.$router.push({ path: `/home/${response.data.token}` });
      })
      .catch(function(error, response) {
        console.log(error, response);
      });
  },
  methods: {
    readPost: function(id) {
      console.log(id);
      this.$router.push({ path: `/ViewPost/${id}` });
    },

    postDelete : function(id){
      var $this = this;
      swal({
        title: "Eliminar Post?",
        text: "una vez borrado el post no podra recuperarse!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
         axios
          .post("http://localhost:3800/api/deletePost",{id: id})
          .then(function(response) {
            if(response.data.status == "success"){
              swal("Usuario Eliminado", response.data.message, "success");
              $this.reloadList()
            }else{
              swal("Error", response.data.message, "error");
              $this.reloadList()
            }            
          })
          .catch(function(error, response) {
             swal("Error", response.data.message, "error");
          });
        } 
      });
    },

    aprobPost : function(id,nivel){
      swal({
        title: "Aprobar Post",
        text: "Desea cambiar el estatus al Post?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        var $this = this;
        if (willDelete) {
          axios
            .post("http://localhost:3800/api/aprobarPost",{id: id,nivel:nivel})
            .then(function(response) {
              if(response.data.status == "success"){
                swal("Privilegio de  Usuario", response.data.message, "success");
                $this.reloadList()
              }else{
                swal("Error", response.data.message, "error");
                $this.reloadList()
              }            
            })
            .catch(function(error) {
              console.log(error);
            });
          } 
                 
      });
    },

    reloadList: function(){
      var $this = this;
      axios
        .get("http://localhost:3800/api/postList")
        .then(function(response) {
          $this.postList = response.data.message;
        })
        .catch(function(error, response) {
          console.log(error, response);
        });
    }
  }
};
</script>