<template>

  <div v-if="totalCantidad === 0" style="display:flex; padding-left:15px; padding-right:15px; height:70px; align-items:center;">
    <span style="font-weight: 500; width:100%; font-size: 1rem; text-align:center;">
      Sin Productos - Comience a Comprar_!!
    </span>

  </div>
  <div v-else>
    <div style=" padding-left:15px; padding-right:15px; align-items:center;">
      <q-select
        color="white"
        dense
        flat
        v-model="provedor"
        :options="provedores"
        emit-value
        map-options
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
    <div style="display:flex; padding-left:15px; padding-right:15px; align-items:center; ">
      <span style="width:38%; font-size:1.1rem;">
        {{totalCantidad}} Productos
      </span>
      <span style="font-size:1.3rem; width:62%; font-weight:700; text-align: right;">
        total: S/{{totalPrecio.toFixed(2)}}
      </span>
    </div>
    <div style="display:flex; padding-left:15px; padding-right:15px; align-items:center; ">
      <span style="width:50%;  font-size:1.1rem; margin-right:5px;">
        <q-btn no-caps outline class="full-width" color="negative" @click="vaciar" >Eliminar Todo</q-btn>
      </span>
      <span style="font-size:1.3rem; width:50%; font-weight:700; text-align: right;">
        <q-btn no-caps @click="finalizarcompras('compras')"  class="full-width" color="negative"> Terminar Compra</q-btn>
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
    const totalCantidad = computed(()=> store.getters.totalCantidad )
    const totalPrecio = computed(() => store.getters.totalPrecio )
    const finalizarcompras = tab => { store.commit('setTabCompras', tab) }

    const vaciar = () => { store.commit('vaciarCompras')}

    return {
      totalCantidad,
      totalPrecio,
      vaciar,
      finalizarcompras,
    }

  },
  data () {
    return {
      provedor : null,
      provedores:[],
    }

  },
  mounted(){
    this.Obtenerprovedores()
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

  }

}
</script>

<style>

</style>
