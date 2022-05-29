<template>

  <div v-if="totalCantidad === 0" style="display:flex; height:50px; align-items:center; ">
    <span style="font-weight: 500; width:100%; font-size: 1rem; text-align:center;">
      Sin Productos - Comience a Comprar_!!
    </span>

  </div>
  <div v-else style="position:relative; height:55px; display:flex; align-items:center; justify-content:space-between; width:100%; ">
    <div style=" padding-left:15px; padding-right:15px; align-items:center;  ">
      <q-select
        color="negative"
        dense
        flat
        outlined
        v-model="provedor"
        :options="provedores"
        emit-value
        map-options
        style="width:200px; color:yellow;"
      >
      <template v-slot:prepend>
        <q-icon name="local_shipping" color="negative" size="1.2rem"/>
      </template>
        <template v-slot:option="{ itemProps, opt, selected }">
          <q-item v-bind="itemProps">
              <q-icon name="store" color="negative" size="1rem"/>
              <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
          </q-item>
        </template>
      </q-select>
    </div>
    <div style="display:flex; padding-left:15px; padding-right:5px; align-items:flex-end;;  ">
      <span style="margin-left:20px;">
        <q-btn no-caps outline style="width:130px; " color="negative" @click="vaciar" >Eliminar Todo</q-btn>
      </span>
      <span style="margin-left:10px; margin-right:5px;">
        <q-btn no-caps @click="FinalizarCompra()"  style="width:130px;" color="negative"> Terminar </q-btn>
      </span>
    </div>
  </div>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  setup () {
    const store = useStore()
    const items = computed(() => store.state.compras )
    const totalCantidad = computed(()=> store.getters.totalCantidad )
    const totalPrecio = computed(() => store.getters.totalPrecio )
    const finalizarcompras = tab => { store.commit('setTabCompras', tab) }

    const vaciar = () => { store.commit('vaciarCompras')}

    return {
      totalCantidad,
      totalPrecio,
      vaciar,
      items,
      finalizarcompras,
    }

  },
  data () {
    return {
      provedor : null,
      provedores:[],
      usuario:null,
    }

  },
  mounted(){
    this.Obtenerprovedores()
    this.ObtenerUsuario()
  },
  methods: {
    //OBTENER provedorE
      Obtenerprovedores() {
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
        axios.get('http://localhost:8000/admin/proveedores', config)
        .then(response => {
          let len = response.data.length;
          if( len >= 0) {
            let resultprovedores = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              resultprovedores.push(
                {
                  label: item.prov_raz_social,
                  value: item.id,
                }
              );
            }
            this.provedores = resultprovedores
            this.provedor = resultprovedores[0].value
          }

        })

      },

      ObtenerUsuario() {
        let token = localStorage.getItem('token');
        const config = {
          headers: {
              "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
          },
        };
        axios.get('http://localhost:8000/usuario', config)
        .then(response => {
          this.usuario = response.data.id;
        })
      },

      FinalizarCompra() {
      let su =""
      if (localStorage.getItem('s') != null){
          su = localStorage.getItem('s')
      }

      const formdata = new FormData()
      formdata.append('proveedor',this.provedor)
      formdata.append('cantidad', this.totalCantidad)
      formdata.append('total', this.totalPrecio)
      formdata.append('productos',JSON.stringify(this.items))
      formdata.append('usuario', this.usuario)
      formdata.append('sucursal',su)

      let url = "http://localhost:8000/admin/compras"
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
            console.log("Compra Registrada")
            console.log(response.data);
//            this.NotyfiVarios("Compra Final", "positive");
        }else {
          console.log(response.status);
        }
      }).catch(error => {
          console.log(error.response.data)
      })

    },

  }

}
</script>

<style>

</style>
