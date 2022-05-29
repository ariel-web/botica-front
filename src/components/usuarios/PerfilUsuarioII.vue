<template>
  <div>
    <div style="display:flex; width:100%; align-items:center; ">

      <div style=" width:100%; ">
        <div style="font-size:0.9rem; text-align:right; font-weight:500; color:#000000d9; text-transform: capitalize;">{{usuario.nombre}} {{usuario.apellidoPaterno }} {{usuario.apellidoMaterno }}</div>

        <div style="font-size:0.7rem; text-align:right; font-weight:300; color:#000000b3" v-if="usuario.rol == 1">
          Administrador
        </div>
        <div style="font-size:0.7rem; text-align:right; font-weight:300; color:#000000b3" v-if="usuario.rol == 0">
          Vendedor
        </div>
      </div>

      <div style="margin-left:20px; margin-right:-10px;" v-if="usuario.imagen == null" >
        <q-avatar size="40px" style="margin-left:-5px;" >
          <!--<img :src="usuario.foto">-->
          <img src="../../assets/iconos/stu.png" height="40px">
        </q-avatar>
      </div>

      <div style="margin-left:20px; margin-right:-10px;" v-else >
        <q-avatar size="40px" style="margin-left:-5px;" >
          <!--<img :src="usuario.foto">-->
          <img :src="usuario.foto">
        </q-avatar>
      </div>



    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["props"],
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
