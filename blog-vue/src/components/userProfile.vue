<template>
<div>

    <div class="row userMain">
      <div class="col-md-6 col-sm-4 offset-md-3">
          <div class="userBlock">
              <div class="backgrounImg">
                  <img src="https://preview.ibb.co/miQjb7/photography4.jpg">
              </div>
              <div class="userImg">
                  <img src="https://image.ibb.co/jw55Ex/def_face.jpg">
              </div>
              <div class="userDescription">
                  <h5>{{nombre}}</h5>
                  <p>{{email}}</p>              
                  
              </div>
            
          </div>
      </div>
    </div> 
    
    <div class="row col-md-10 offset-md-1">
      <div class="col-lg-4 col-sm-6">
        <div class="circle-tile ">
          <a href="#" ><div class="circle-tile-heading dark-blue"><i class="fa fa-paragraph fa-fw fa-3x"></i></div></a>
          <div class="circle-tile-content dark-blue">
            <div class="circle-tile-description text-faded"> Post</div>
            <div class="circle-tile-number text-faded ">{{post}}</div>            
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-sm-6">
        <div class="circle-tile ">
          <a href="#"><div class="circle-tile-heading red"><i class="fa fa-align-center fa-fw fa-3x"></i></div></a>
          <div class="circle-tile-content red">
            <div class="circle-tile-description text-faded"> Comentarios</div>
            <div class="circle-tile-number text-faded ">{{comments}}</div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-sm-6">
        <div class="circle-tile ">
          <a href="#"><div class="circle-tile-heading blue"><i class="	fa fa-thumbs-up fa-fw fa-3x"></i></div></a>
          <div class="circle-tile-content blue">
            <div class="circle-tile-description text-faded"> Likes</div>
            <div class="circle-tile-number text-faded ">{{likes}}</div>
          </div>
        </div>
      </div> 
    </div>
    
    
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "userProfile",
  components:{
    
  },
  data(){
    return {
      idUser: null,
      likes: 0,
      comments: 0,
      post: 0,
      nombre: '',
      email: '',
      showModal: false
    }
  },
  mounted(){
    this.idUser = this.$route.params.id || window.localStorage.getItem("id")
    var $this = this;
    axios
      .post("http://localhost:3800/api/userProfile", { id: this.idUser })
      .then(function(response) {
        
        // $this.dataPost = response.data[0];
        // $this.comentarios = response.data[0].comentarios;
        $this.likes= response.data.contador.CountLikes
        $this.comments= response.data.contador.CountComments
        $this.post = response.data.contador.countPost
        $this.nombre= response.data.usuario.userName
        $this.email = response.data.usuario.email
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {   
  }
};
</script>