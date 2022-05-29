<template>
  <div style=" ">
  <div  v-for="item in items" :key="item.id"  style=" display: flex; padding-bottom:3px; margin-bottom:4px; border-bottom:1px solid #cdcdcd;" >
    <!-- <div style="width:45px; height:50px;  padding:5px; border:solid 0.01rem #cdcdcd72">
      <img style="width:100%; height: 100%"  :src="item.foto">
    </div> -->
    <div style="margin-left:8px; width:100%; padding-right:15px;">
      <div style=" width:100%; margin-top:-3px; padding-right:0px; position:relative; "  >
        <span style="color:black; font-size:.8rem; text-align: justify; font-weight:300; background:'red'" caps > {{item.nombre}} - {{item.presentacion}} </span>
        <q-btn @click="eliminar(item.id)" dense flat color="negative" size="0.7rem" style="width:21px; height:15px; margin-right:10px; margin-top:32px; position:absolute; right: -28px; top: -30px;"> <span class="cerrar">x</span></q-btn>
      </div>
      <div style="margin-top:-4px;">
        <q-btn @click="aumentar(item.id)"  dense class="teal" size="0.55rem" color="secondary" style="width:18px; height:10px; margin-right:2px; margin-top:-2px;" ><span style="font-size:0.9rem; margin-top:-2px;">+</span></q-btn>
        <q-btn @click="disminuir(item.id)" dense color="negative" size="0.55rem" style="width:18px; height:15px; margin-right:10px; margin-top:-2px;"> <span style="font-size:1.3rem; margin-top:-3px; ">-</span></q-btn>
        <span style="font-weight:400; font-size:1.0rem;">{{item.cantidad}}</span>
        <span style="margin-left:10px; margin-right:10px;">x</span>
        <span style="font-weight:400; font-size:1.0rem;">{{(item.cantidad * item.precio ).toFixed(2) }}</span>
      </div>
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
  color: #7373739d;
  font-size:0.9rem;
  margin-top:-4px;
  font-weight: 400;
}
.cerrar:hover {
  color: #d011377D;
}
</style>
