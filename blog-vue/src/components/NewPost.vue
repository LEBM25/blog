<template>
  <div class="row">

    <div class="card col-md-8 offset-md-2">
      <div class="card-header">
        <h4>Nuevo Post</h4>
      </div>
    <form @submit.prevent="registrarPost" class="col-md-6 offset-md-3">
      
        <label class="col-sm-4 col-form-label">titulo</label>
        <div class="col-sm-12">
          <input type="text" class="form-control form-control-lg" v-model="titulo" />
        </div>
      
      
        <label class="col-sm-4 col-form-label">Contenido</label>
        <div class="col-sm-12">
          <textarea style="height:200px"
            v-model="content"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      
      
        <label for="inputPassword3"  class="col-sm-4 col-form-label">Archivo</label>
        <div class="col-sm-12 custom-file" >
          <input 
            type="file"
            @change="fileChange()"
            ref="file"
            class="custom-file-input"
            id="file"
            name="file0"
          />
           <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
        </div>
      
      <div class="form-group row" style="margin-top:10px">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-outline-dark">Guardar Post</button>
        </div>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import swal from 'sweetalert';
export default {
  name: "NewPost",
  data() {
    return {
      file: "",
      titulo: "",
      content: ""
    };
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    registrarPost: function() {
      var $this = this;
      axios
        .post("http://localhost:3800/api/savepublicacion", {
          titulo: this.titulo,
          publicacion: this.content,
          userName: this.userName
        })
        .then(function(response) {
          var publicacionId = response.data.message._id;
          const formData = new FormData();
          formData.append("file0", $this.file, $this.file.name);
          axios
            .post(
              "http://localhost:3800/api/upload-image/" + publicacionId,
              formData
            )
            .then(function(data) {
              if(data.data.status== "error"){
                swal("Guardado", data.data.message, "error");
              }else{
                swal("Guardado", data.data.message, "success");
                $this.file= ""
                $this.titulo= ""
                $this.content= ""
              }
              
            });
          
        })
        .catch(function(error) {
          swal("Error", "Error en guardar la publicación", "error");
          console.log(error);
        });
      
    }
  },
  computed: mapState(["userName"])
};
</script>

<style scoped>
.box-card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}
</style>