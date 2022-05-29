<template>
  <div  v-for="item in items" :key="item.id"  style=" display: flex; margin-bottom:10px;" >
    <div style="width:80px; height:90px;  padding:5px; border:solid 0.01rem #cdcdcd72">
      <img style="width:100%; height: 100%"  :src="item.foto">
    </div>
    <div style="margin-left:8px; width:200px;">
      <div style=" width:100%; margin-top:3px; padding-right:0px; position:relative; "  >
        <span style="color:black; font-size:.9rem; text-align: justify; font-weight:400; "> {{item.nombre}} - {{item.presentacion}} </span>
        <q-btn @click="eliminar(item.id)" dense flat color="negative" size="0.7rem" style="width:21px; height:15px; margin-right:10px; margin-top:32px; position:absolute; left: -58px; top: 3px;"> <span class="cerrar">x</span></q-btn>
      </div>
      <div>
        <q-btn @click="aumentar(item.id)"  dense class="teal" size="0.7rem" color="secondary" style="width:21px; height:15px; margin-right:2px; margin-top:-2px;" ><span style="font-size:1rem; margin-top:-2px;">+</span></q-btn>
        <q-btn @click="disminuir(item.id)" dense color="negative" size="0.7rem" style="width:21px; height:15px; margin-right:10px; margin-top:-2px;"> <span style="font-size:1.3rem; margin-top:-3px; ">-</span></q-btn>
        <span style="font-weight:400; font-size:1.1rem;">{{item.cantidad}}</span>
        <span style="margin-left:10px; margin-right:10px;">x</span>
        <span style="font-weight:400; font-size:1.1rem;">{{(item.cantidad * item.precio ).toFixed(2) }}</span>
      </div>
    </div>
  </div>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const items = computed(() => store.state.compras )
    const aumentar = id => { store.commit('aumentarItemCompra', id) }
    const disminuir = id => { store.commit('disminuirItemCompra', id) }
    const eliminar = id => { store.commit('eliminarItemCompra', id) }
    return {
      items,
      aumentar,
      disminuir,
      eliminar
    }
  }
}
</script>

<style scoped>
.cerrar {
  color: #cdcdcd32;
  font-size:1.5rem;
  margin-top:-3px;
  font-weight: 400;
}
.cerrar:hover {
  color: #d011377D;
}
</style>
