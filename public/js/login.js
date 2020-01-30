var login = new Vue({
  el: "#loginForm",
  data() {
    return {
      email: "",
      pass: "",
      submitted: false
    };
  },
  methods: {
    iniciarSesion: function(e) {
      var data = 'email = '+ this.email + "&pass ="+ this.pass
      axios
        .post("http://localhost:3800/api/userAuth", {          
            email: this.email,
            pass: this.pass,
            gethash: true
          })
        .then(response => ( 
          window.location = './blank.html?' + JSON.stringify(response.data))
          )
        .catch(function (error,response) {
          console.log(error,response);
        });
    }
  }
});
