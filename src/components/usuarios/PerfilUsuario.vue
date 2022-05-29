<template>
  <div>
    <div style="display:flex; width:100%; align-items:center; ">

      <div style="margin-left:-40; margin-right:20px;" v-if="usuario.imagen == null" >
        <q-avatar size="40px" style="margin-left:-5px;" >
          <!--<img :src="usuario.foto">-->
          <img src="../../assets/iconos/stu.png">
        </q-avatar>
      </div>

      <div style="margin-left:-40; margin-right:20px;" v-else >
        <q-avatar size="40px" style="margin-left:-5px;" >
          <!--<img :src="usuario.foto">-->
          <img :src="usuario.foto">
        </q-avatar>
      </div>

      <div style=" width:190px;">
        <div style="font-size:0.9rem; font-weight:500; color:#FFFFFFd9; text-transform: capitalize;">{{usuario.nombre}} {{usuario.apellidoPaterno }} {{usuario.apellidoMaterno }}</div>

        <div style="font-size:0.7rem; font-weight:300; color:#FFFFFFb3" v-if="usuario.rol == 1">
          Administrador
        </div>
        <div style="font-size:0.7rem; font-weight:300; color:#FFFFFFb3" v-if="usuario.rol == 0">
          Vendedor
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["props", "color"],
  data() {

    return {
      usuario: { },
    }
  },
  created() {

 },
  methods: {
    ObtenerUsuario(token) {
      const config = {
         headers: {
             "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
         },
      };
      axios.get('http://localhost:8000/usuario', config)
      .then(response => {
        this.usuario = response.data;
        this.usuario.imagen = response.data.foto;
        this.usuario.foto = "http://localhost:8000/usuarios/"+response.data.foto;
        localStorage.setItem('s', response.data.sucursal)
      })
    },
  },
  mounted(){
    let t = localStorage.getItem('token');
    this.ObtenerUsuario(t);
  }
};
</script>

<style scoped>

</style>
