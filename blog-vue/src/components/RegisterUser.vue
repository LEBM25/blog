<template>
  <div>    
    <div  class="containers "  v-bind:class="clase"  id="containers"> 
    
      <div class="form-container sign-up-container">
        <form action="#" @submit.prevent="registrarUsuario">
          <h1>Create Account</h1>
          
          <span>or use your email for registration</span>
          <input type="text" v-model="userName" placeholder="Name" />
          <input type="email" v-model="email" placeholder="Email" />
          <input type="password" v-model="pass" placeholder="Password" />
          <button >Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#" @submit.prevent="iniciarSesion">
          <h1>Sign in</h1>
          
          <span>or use your account</span>
          <input  type="email"
                v-model="email"
                name="email-address"
                required
                autofocus />
          <input ttype="password" v-model="pass" name="password" required  />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" id="signIn" @click="registrarses(0)">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp" ref="signup" @click="registrarses(1)">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import { mapState, mapMutations } from "vuex";
export default {
  name: "RegisterUser",
  data() {
    return {
      email: "",
      userName: "",
      pass: "",
      submitted: false,
      registrarse: 0,
      clase: 'left-panel-active'
    };
  },
  methods: {
    registrarUsuario: function() {
      var $this = this;
      axios
        .post("http://localhost:3800/api/saveuser", {
          email: this.email,
          pass: this.pass,
          nombre: this.userName
        })
        .then(function(response) {
          if (response.data) {
            swal("Guardado", "Datos Guardados con exito", "success");
            $this.$router.push({ path: `/PostList` });
          }
        })
        .catch(function(error, response) {
          console.log(error, response);
        });
    },
    cancelar: function() {
      this.$router.push({ path: `/PostList` });
    },
    iniciarSesion: function() {
      var $this = this;
      axios
        .post("http://localhost:3800/api/userAuth", {
          email: this.email,
          pass: this.pass,
          gethash: true
        })
        .then(function(response) {
          window.localStorage.setItem("auth_miproject",JSON.stringify(response.data.token));
          window.localStorage.setItem("nivel",response.data.nivel);
          window.localStorage.setItem("userName",response.data.userName);
          $this.updateToken({token:response.data.token, nivel:response.data.nivel,userName :response.data.userName });
          $this.$router.push({ path: `/home` });
        })
        .catch(function(error, response) {
          console.log(error, response);
        });
    },
    registrarses: function(num){
      this.email= ""
      this.userName= ""
      this.pass= ""
      if(num == 1){
        this.clase= 'right-panel-active'
      }else{
        this.clase= 'left-panel-active'
      }
    },
    ...mapMutations(["updateToken"])
  },
  computed: mapState(["token"])
};
</script>
