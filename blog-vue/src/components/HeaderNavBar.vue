<template>
  <div class="nav-scroller py-1 mb-2">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/PostList">Home</router-link>
          </li>
          
          <li v-if="$store.state.token && $store.state.nivel == 1" class="nav-item">
            <router-link class="nav-link" to="/UserList"> Admin Usuarios</router-link>
          </li>        

          

          <li v-if="$store.state.token" class="nav-item">
            <router-link class="nav-link" to="/NewPost">Nuevo Post</router-link>
          </li>
          <li v-if="$store.state.token && $store.state.nivel == 1" class="nav-item">
            <router-link class="nav-link" to="/AdminPost">Admin Post</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          
          <button @click="verPerfil" v-if="$store.state.token" class="btn btn-outline-dark my-2 my-sm-0" type="buttom">
            <i class="	fa fa-id-card-o fa-2x"></i>Mi Perfil</button>
          <button @click="cerrarSesion" v-if="$store.state.token" class="btn btn-outline-danger my-2 my-sm-0" type="buttom">
            <i class="	fa fa-user-o fa-2x"></i> Cerrar Sesion</button>
          <button @click="iniciarSesion" v-if="!$store.state.token" class="btn btn-outline-success my-2 my-sm-0" type="buttom">
            <i class="	fa fa-user-o fa-2x"></i> Iniciar Sesion</button>
        </form>
      </div>
    </nav>
    <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
      <div class="col-md-6 px-0">
        <h1 class="display-4 font-italic">Ing. Lenin E. Batista M.</h1>
        <p
          class="lead my-3"
        >Test realizado en MEVN, para obtar por el puesto de programador Semi-senior / Senior en la empresa Octupus</p>

         <h4><i class="	fa fa-envelope-o fa-2x"></i> leninbatista@gmail.com</h4>
        <h4><i class="fa fa-phone-square fa-2x"></i> +5491173614983</h4>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "HeaderNavBar",
  data() {
    return {
      login: localStorage.getItem("auth_miproject") || ""
    };
  },
  mounted() {
    var auth = window.localStorage.getItem("auth_miproject") || false;
    var nivel = window.localStorage.getItem("nivel") || false;
    var userNames = window.localStorage.getItem("userName") || null;
    this.updateToken({token:auth, nivel:nivel,userName : userNames });
  },
  methods: {
    cerrarSesion(){

      this.updateToken({token:null, nivel:0,userName : null });
      window.localStorage.removeItem
      window.localStorage.removeItem("auth_miproject");
      window.localStorage.removeItem("nivel");
      window.localStorage.removeItem("userName");
      window.localStorage.removeItem("id");
      this.$router.push({ path: `/PostList` });
    },

    iniciarSesion(){
      this.$router.push({ path: `/login` });
    },

    verPerfil(){
      this.$router.push({ path: `/UserProfile` });
    },
    ...mapMutations(["updateToken"])
  }
};
</script>