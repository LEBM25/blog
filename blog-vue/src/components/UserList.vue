<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Administración de usuarios</h1>
      
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="listado in  userList" :key="listado._id">
            <td>{{listado.userName}}</td>
            <td>{{listado.email}}</td>
            <td>
              <button v-if="listado.nivel == 1" title="Actualizar privilegios"
                type="button"
                v-on:click="userAdmin(listado._id,2)"
                class="btn btn-outline-primary"
              >              
                <i class="fa fa-drivers-license"></i>
              </button>
              <button v-if="listado.nivel == 2" title="Actualizar privilegios"
                type="button"
                v-on:click="userAdmin(listado._id,1)"
                class="btn btn-outline-warning"
              ><i class="fa fa-drivers-license"></i>
              </button>
              <button title="Ver Post"
                type="button"
                v-on:click="userProfile(listado._id)"
                class="btn btn-outline-dark"
              >
                <i class="fa fa-eye"></i>
              </button>
              <button title="Eliminar Usuarios"
                type="button"
                v-on:click="userDelete(listado._id)"
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
  name: "UserList",
  mounted() {
    var $this = this;
    axios
      .get("http://localhost:3800/api/userList")
      .then(function(response) {
        $this.userList = response.data.message;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    userAdmin : function(id,nivel){
      swal({
        title: "Privilegio de  Usuario",
        text: "Desea actualizar el privilegio de este Usuario?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        var $this = this;
        if (willDelete) {
          axios
            .post("http://localhost:3800/api/adminUser",{id: id,nivel:nivel})
            .then(function(response) {
              if(response.data.status == "success"){
                swal("Privilegio de  Usuario", response.data.message, "success");
                axios
                  .get("http://localhost:3800/api/userList")
                  .then(function(response) {
                    $this.userList = response.data.message;
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }else{
                swal("Error", response.data.message, "error");
              }            
            })
            .catch(function(error) {
              console.log(error);
            });
          } 
                 
      });
    },
    userDelete : function(id){
      var $this = this;
      swal({
        title: "Desea Eliminar este Usuario?",
        text: "una vez borrado el usuario no podra recuperarse!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
         axios
          .post("http://localhost:3800/api/deleteUser",{id: id})
          .then(function(response) {
            if(response.data.status == "success"){
              swal("Usuario Eliminado", response.data.message, "success");
              axios
                .get("http://localhost:3800/api/userList")
                .then(function(response) {
                  $this.userList = response.data.message;
                })
                .catch(function(error, response) {
                  console.log(error, response);
                });
            }else{
              swal("Error", response.data.message, "error");
            }            
          })
          .catch(function(error, response) {
             swal("Error", response.data.message, "error");
          });
        } 
      });
    },
    userProfile: function(id){
      this.$router.push({ path: `/UserProfile/${id}` });
    }
  },
  data() {
    return { userList: [] };
  }
};
</script>