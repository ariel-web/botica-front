<template>
  <div>
  <q-btn flat round dense icon="person_add" style="margin-left: 10px; font-size:1.1rem;" @click="drawerRight = !drawerRight"/>
  <q-drawer
    side="right"
    v-model="drawerRight"
    bordered
    :width="300"
    :breakpoint="500"
    behavior="desktop"
    class="bg-gray"
    style="position:relative;"
  >

  <div class="q-px-md" >
    <form>
       <div style=" padding-left:10px;">
         <div style="background:white;">
            <q-btn flat round dense icon="clear" style="left:230px;" @click="drawerRight = !drawerRight"/>
         </div>
        <p
          style="
            font-size: 1.3em;
            text-align: center;
            margin-bottom: 10px;
            margin-top: -10px;
          "
        >
          Nuevo Proveedor
        </p>

          <span style="color:black; margin-bottom:15px;">Nombre: {{prov_raz_social}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="text"
            v-model="prov_raz_social"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="local_shipping" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <span style="color:black; margin-bottom:15px;">Sucursal: </span>
          {{prov_sucursal}}
          <q-select
            color="negative"
            dense
            outlined
            v-model="prov_sucursal"
            :options="sucursales"
            emit-value
            map-options
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

          <span style="color:black; margin-bottom:15px;">Ruc: {{prov_ruc}}</span>
          <q-input
            color="negative"
            mask="#####################"
            dense
            outlined
            type="text"
            v-model="prov_ruc"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="confirmation_number" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <span style="color:black; margin-bottom:15px;">Descripción: {{prov_descripcion}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="textarea"
            autogrow
            v-model="prov_descripcion"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
          </q-input>

          <span style="color:black; margin-bottom:15px;">Celular del Proveedor: {{prov_telefono}}</span>
          <q-input
            color="negative"
            mask="### ### ###"
            dense
            outlined
            type="text"
            v-model="prov_telefono"

            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="contact_phone" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <span style="color:black; margin-bottom:15px;">Correo del Proveedor: {{prov_correo}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="email"
            v-model="prov_correo"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="mail" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <button class="buttonUsuario" @click.prevent="AgregarProveedor(),drawerRight = !drawerRight">Registrar</button>
      </div>


    </form>
  </div>

  </q-drawer>
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
      drawerRight: ref($q.screen.width < 500),
    };
  },

  data() {

    return {

      estado: false,
      prov_sucursal:null,
      prov_raz_social:"",
      prov_ruc:"",
      prov_descripcion:"",
      prov_telefono:"",
      prov_correo:"",
      sucursales:[],
    };
  },
  created() {
    this.ObtenerSucursales()
    this.prov_sucursal = localStorage.getItem('s')
  },
  mounted(){
    this.prov_sucursal = localStorage.getItem('s')
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
            this.prov_sucursal = resultSucursales[0].value
          }

        })

    },

    AgregarProveedor() {

      const formdata = new FormData()
      formdata.append('prov_raz_social', this.prov_raz_social),
      formdata.append('prov_idSucursal', this.prov_sucursal)

      let url = "http://localhost:8000/admin/proveedores"
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
        // this.NotyfiVarios("El Usuario ya Existe", "negative")
      })
      this.estado = true;
      return this.$emit('cambiarEstado', this.estado);

    },


  },
};
</script>

<style scoped>

</style>
