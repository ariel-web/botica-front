<template>
  <span  class="verPerfil" @click="alert = true" v-if="usuario.nombre != null">
    {{usuario.nombre}}
  <span class="" v-if="usuario.apellidoPaterno != null">{{usuario.apellidoPaterno}}</span>
  </span>

  <q-dialog v-model="alert">
    <div style="display:flex; position:relative;" >
      <div style="width:200px; height:380px; background:#272727;">
        <div style="width:200px; height:200px; display:flex; justify-content:center; align-items:center;" >
          <img src="../../assets/imagenes/perfil2.jpg" alt="" style="border-radius:50%; height:130px; widht:130px; border: solid 5px crimson; ">
        </div>
        <div style="display:flex; justify-content:center; align-items:flex-start;" >
          <span style="font-weight:700; font-size: 1.4rem; color:crimson; text-transform: uppercase;">{{ usuario.nombre }}  </span>
          <span style="font-weight:400; font-size: 1.4rem; margin-left:5px; color:white; text-transform: uppercase;"> {{ usuario.apellidoPaterno.split(' ')[0] }}</span>
        </div>
        <div style=" display:flex; justify-content:center; align-items:flex-start; color:white " >
          <span>{{ usuario.cargo }}</span>
        </div>
        <div style=" display:flex; justify-content:center; align-items:flex-start; margin-top:5px; color:#ffffff9D " >
          <span>{{ usuario.celular }}</span>
        </div>

      </div>
      <div style="width:400px; height:380px; background:white; padding:20px;">
        <div style="height:40px; widht:100%; border-bottom:2px solid crimson; padding-bottom: 1.5px; ">
          <span style="font-size:1.3rem;" >Información</span>
        </div>
        <div style="display:flex;">
          <div>
            <div style="width:160px; margin-top:20px; padding-right:20px;">
              <div style="margin-top:15px;">
                <span style="font-size:0.9rem; font-weight:500;" >DNI</span>
              </div>
              <span>{{ usuario.dni }}</span>
              <div style="margin-top:15px;">
                <span style="font-size:0.9rem; font-weight:500;">Celular</span>
              </div>
              <span>{{usuario.celular}}</span>
              <div style="margin-top:15px;">
                <span style="font-size:0.9rem; font-weight:500;">Dirección</span>
              </div>
              <span>{{usuario.direccion}}</span>
           </div>
          </div>
          <div>
            <div style="width:160px; margin-top:20px; ">
              <div style="margin-top:15px;">
                <span style="font-size:0.9rem; font-weight:500;" >Estado</span>
              </div>
              <span>{{(usuario.estado == 1)? "Activo" :"Inactivo" }}</span>

              <div style="margin-top:15px;">
                <span style="font-size:0.9rem; font-weight:500;" >Familiar</span>
              </div>
              <span>{{usuario.familiar}}</span>

              <div style="margin-top:15px;">
                <span style="font-size:0.9rem; font-weight:500;" >Numero de familiar:</span>
              </div>
              <span>{{usuario.familiar_numero }}</span>
            </div>
          </div>
        </div>

        <div style=" margin-top: 40px; color:crimson; width:100%; text-align: center;" >
          *** Esta información es privada y confidencial usted no puede copiarla, distribuirla ni emprender con ella ningún tipo de acción.***
        </div>

      </div>

    <div style="position:absolute; cursor:pointer; top:10px; right:0px; width:30px; height:30px; ">
      <span class="cerrarModal" v-close-popup >x</span>
    </div>

    </div>

  </q-dialog>

</template>
<script>
import { ref } from 'vue'
import axios from "axios";

export default {
  props: ["props"],
  setup () {
    return {
          alert: ref(false),
        }
  },
  data() {
    return {
      usuario: {},
    }
  },

  mounted(){
    this.ObtenerUsuario();
  },

  created() {

  },
  methods: {
    ObtenerUsuario() {
      let token = localStorage.getItem('token');
      const config = {
         headers: {
             "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
         },

      };
      axios.get(`http://localhost:8000/admin/usuarios/${this.props}`, config)
      .then(response => {
        this.usuario = response.data[0];
        console.log(response.data);
      })
    },
  },

};
</script>
<style scoped>
.verPerfil {
  cursor: pointer;
}
.verPerfil:hover {
  color: crimson;
}
.cerrarModal {
  color: gray;
  font-size: 1.2rem;
}
.cerrarModal:hover {
  color: crimson;
  font-weight: 700;
}
</style>
