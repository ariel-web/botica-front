<template>

  <div v-if="totalCantidad === 0" style="display:flex; padding-left:15px; padding-right:15px; height:90px; align-items:flex-end;">
    <span style="font-weight: 500; width:100%; font-size: 0.9rem; text-align:center;">
      !!-- Sin Productos --!!
    </span>

  </div>
  <div v-else style="">
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

    <div style="display:flex; padding-left:15px; padding-right:15px; padding-top:5px; padding-bottom:3px; align-items:center; ">
      <div style="display:flex;  align-items:center;">
          <div style="width:80px;">
              Paga con S/
          </div>
          <div>
              <input type="number" v-model="paga" style="width:60px; height:20px; ">
          </div>
      </div>

      <div style="display:flex;  align-items:center; justify-content:flex-end;">
          <div style="width:80px; padding-left:20px;">
              Vuelto S/
          </div>
          <div>
              <span style="font-weight:bold; margin-left:10px; font-size:1rem;">{{ vuelto }}</span>
          </div>
      </div>
    </div>
    <div style="display:flex; padding-left:15px; padding-right:15px; padding-top:5px; padding-bottom:3px; align-items:center; ">
      <span style="width:38%; font-size:0.9rem; font-weight:700;">
        Total
      </span>
      <span style="font-size:1rem; width:62%; font-weight:700; text-align: right;">
        S/{{totalPrecio.toFixed(2)}}
      </span>
    </div>
    <div style="display:flex; padding-left:15px; padding-right:15px; align-items:center; ">
      <span style="width:50%; margin-right:5px;">
        <q-btn no-caps outline class="full-width" color="negative" size=".75rem" @click="vaciar" >Eliminar Todo</q-btn>
      </span>
      <span style="font-size:1.3rem; width:50%; font-weight:700; text-align: right;">
        <q-btn no-caps @click="finalizarcompras('compras')" class="full-width"  size=".75rem" color="negative"> Terminar Compra</q-btn>
      </span>
    </div>
  </div>

</template>

<script>

import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  setup () {
    const store = useStore()
    const totalCantidad = computed(()=> store.getters.totalCantidad )
    const totalPrecio = computed(() => store.getters.totalPrecio )
    const vuelto = ref(0)
    const paga = ref(0)

    watchEffect(()=>{
      vuelto.value = (paga.value - totalPrecio.value ).toFixed(2)
    })

    const finalizarcompras = tab => { store.commit('setTabCompras', tab) }

    const vaciar = () => { store.commit('vaciarCompras')}

    return {
      totalCantidad,
      totalPrecio,
      vaciar,
      finalizarcompras,
      vuelto,
      paga
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
  },



}
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
