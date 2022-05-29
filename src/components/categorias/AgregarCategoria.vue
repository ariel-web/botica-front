<template>
  <div>

  <div style="width:280px;  background:white; border-radius:10px; border-bottom:3px solid crimson; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;">
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
        <span style="font-size:1.2rem">+ </span> Nueva Categoria
        </p>

          <span style="color:black; margin-bottom:15px;">Nombre: {{cat_nombre}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="text"
            v-model="cat_nombre"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="keyboard" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <span style="color:black; margin-bottom:15px;">Sucursal: </span>
          {{cat_idSucursal}}
          <q-select
            color="negative"
            dense
            outlined
            v-model="cat_idSucursal"
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

          <span style="color:black; margin-bottom:15px;">Descripción: {{descripcion}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="textarea"
            autogrow
            v-model="descripcion"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
          </q-input>

          <q-btn  class="full-width" color="black" style="margin-top:10px;  margin-bottom:30px; border-radius:5px; padding:9px;" @click.prevent="AgregarCategoria()">Guardar</q-btn>
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
      cat_idSucursal:null,
      cat_nombre:"",

      descripcion:"",

      sucursales:[],
    };
  },
  created() {
    this.ObtenerSucursales()
    this.cat_idSucursal = localStorage.getItem('s')
  },
  mounted(){
    this.cat_idSucursal = localStorage.getItem('s')
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
            this.cat_idSucursal = resultSucursales[0].value
          }

        })

    },

    AgregarCategoria() {

      const formdata = new FormData()
      formdata.append('cat_nombre', this.cat_nombre),
      formdata.append('cat_idSucursal', this.cat_idSucursal)

      let url = "http://localhost:8000/admin/categorias"
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
