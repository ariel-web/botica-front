<template>
  <div>

  <div style="width:320px;  background:white; border-radius:10px; border-bottom:3px solid crimson; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;">
    <div class="q-px-md" >
    <form>
       <div style=" padding-top:30px;">
        <p
          style="
            font-size: 1.3em;
            text-align: left;
            margin-bottom: 10px;
            margin-top: -10px;
          "
        >
        <span style="font-size:1.2rem">+ </span> Nueva Caja
        </p>
          <span style="color:black; margin-bottom:15px;">Nombre: {{cja_nombre}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="text"
            v-model="cja_nombre"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
            >

            <template v-slot:prepend>
              <q-icon name="keyboard" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <span style="color:black; margin-bottom:15px;">Sucursal: </span>
          {{cja_idSucursal}}
          <q-select
            color="negative"
            dense
            outlined
            v-model="cja_idSucursal"
            :options="sucursales"
            emit-value
            map-options
            style="margin-bottom:16px;"
          >
          <template v-slot:prepend>
            <q-icon name="store" color="negative" size="1.2rem"/>
          </template>
            <template v-slot:option="{ itemProps, opt, selected }">
              <q-item v-bind="itemProps">
                  <q-icon name="store" color="negative" size="1rem"/>
                  <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
              </q-item>
            </template>
          </q-select>

          <span style="color:black; margin-bottom:15px;">Usuario: </span>
          {{cja_idUsuario}}
          <q-select
            color="negative"
            dense
            outlined
            v-model="cja_idUsuario"
            :options="usuarios"
            emit-value
            map-options
            style="margin-bottom:16px;"
          >
          <template v-slot:prepend>
            <q-icon name="store" color="negative" size="1.2rem"/>
          </template>
            <template v-slot:option="{ itemProps, opt, selected }">
              <q-item v-bind="itemProps">
                  <q-icon name="store" color="negative" size="1rem"/>
                  <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
              </q-item>
            </template>
          </q-select>

          <span style="color:black; margin-bottom:15px;">Monto Inicial: {{cja_montoInicial}}</span>
          <q-input
            color="negative"
            dense
            prefix="S/ "
            outlined
            type="text"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            v-model="cja_montoInicial"
            style="margin-bottom: 10px; margin-top:3px;"
            class="inputUsuario"
          >
          </q-input>

          <span style="color:black; margin-bottom:15px;">Estado: {{cja_estado? "Activo" :"Inactivo" }}</span>
          <q-toggle
            v-model="cja_estado"
            color="negative"
          />

          <q-btn  class="full-width" color="black" style="margin-top:10px;  margin-bottom:30px; border-radius:5px; padding:9px;" @click.prevent="AgregarCaja()">Guardar</q-btn>
      </div>
    </form>
  </div>
  </div>

</div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
export default {

  setup() {
    const $q = useQuasar();
    return {

    };
  },

  data() {

    return {

      estado: false,
      cja_nombre:"",
      cja_idSucursal:null,
      cja_idUsuario:null,
      cja_montoInicial:null,
      cja_estado:true,
      sucursales:[],
      usuarios:[],
    };
  },
  mounted(){
    this.ObtenerSucursales()
    this.ObtenerUsuarios()
    this.cja_idSucursal = localStorage.getItem('s')
  },
  methods: {

    ObtenerSucursales() {
        let token = localStorage.getItem('token');
        let su =""
        if (localStorage.getItem('s') != null){
          su = localStorage.getItem('s')
        }
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          params: {
            buscar: su
          }
        };
        axios.get('http://localhost:8000/admin/sucursales', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let resultSucursales = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              resultSucursales.push(
                {
                  label: item.suc_nombre.trim(),
                  value: item.id,
                }
              );
            }
            this.sucursales = resultSucursales
            this.cja_idSucursal = resultSucursales[0].value
          }

        })

    },

    ObtenerUsuarios() {
        let token = localStorage.getItem('token');
        let su =""
        if (localStorage.getItem('s') != null){
          su = localStorage.getItem('s')
        }
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          params: {
            buscar: su
          }
        };
        axios.get('http://localhost:8000/admin/usuarios', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let resultUsuarios = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              resultUsuarios.push(
                {
                  label: item.nombre + item.apellidoPaterno,
                  value: item.id,
                }
              );
            }
            this.usuarios = resultUsuarios
            this.cja_idUsuario = resultUsuarios[0].value
          }

        })

    },

    AgregarCaja() {

      let estado = 0;
      const formdata = new FormData()

      formdata.append('cja_nombre', this.cja_nombre.trim())
      formdata.append('cja_idSucursal', this.cja_idSucursal)
      formdata.append('cja_idUsuario', this.cja_idUsuario)
      formdata.append('cja_montoInicio', this.cja_montoInicial)
      formdata.append('cja_montoFinal', this.cja_montoInicial)
      if(this.cja_estado == true ){
        estado = 1
      }
      formdata.append('cja_estado', estado)

      let url = "http://localhost:8000/admin/caja"
      let token = localStorage.getItem('token');
      const config = {
          'accept': 'application/json',
          headers: { Authorization: `Bearer ${token}` }
      };
      axios.post(
        url,
        formdata,
        config
      )
      .then(response => {
        if(response.status == 200) {
            console.log(response.data);
        }else {
          console.log(response.status);
        }
      }).catch(error => {
          console.log(error.response.data)
      })
      this.estado = true;
      return this.$emit('cambiarEstado', this.estado);

    },


  },
};
</script>

<style scoped>

</style>
