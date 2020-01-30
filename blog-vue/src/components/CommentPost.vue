<template>
  <div>
     <form @submit.prevent="sendComent">
      <div class="form-group row">

        <label class="col-sm-2 col-form-label">Comentario : </label>
        <div class="col-sm-10">
          <textarea
            v-model="coment"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </div>      
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-outline-dark">Guardar Comentario</button>         
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex";
import swal from "sweetalert";
export default {
  name: 'CommentPost',
  props: ['dataPost'],
  data(){
    return {
      coment : '',
      postId : null,
    }
  },
  methods: {
    sendComent: function() {
      var $this = this
      axios
        .post("http://localhost:3800/api/saveComentario", {
          comentario: this.coment,
          publicacionId: this.dataPost,
          userName: this.userName
        })
        .then(function(response) {
          if(response.data)
          swal("Guardado", "Comentario guardado con exito", "success");
          $this.$emit('nuevoComentario')
          $this.coment = ''
          
        })
        .catch(function(error, response) {
          console.log(error, response);
        });
    }
  },
  mounted(){
    console.log(this.dataPost)
  },
  computed: mapState(["userName"])
}
</script>