<template>

    <div style="height: 500px; margin-right: -30px; padding-right:30px; overflow-y: scroll;">
    <table
      class="tab"
      style=" width:100%; padding: 0px; border-collapse: collapse;  "
    >
    <tr style="border-bottom: 0.5px #cdcdcd solid;"  >
      <th v-for="col in columns"
        :key="col.name"
        style="font-size:0.9rem; height:50px; font-weight:700; margin-left:90px;">
        <span>{{ col.label }}</span>
      </th>
    </tr>

    <tr v-for="item in items" :key="item.id" style=" border-bottom: solid 1px #cdcdcd;" >
      <td style="display:flex; justify-content:center; align-items:center; margin-top:8px;">
        <div style="border-radius:0%; height:80px; width:70px; overflow:hidden; position:relative;">
          <q-btn @click="eliminar(item.id)" dense flat color="negative" size="0.7rem" style="width:21px; height:15px; margin-right:10px; position:absolute; left: 15px; top: 23px;"> <span class="cerrar">x</span></q-btn>
          <div v-if="item.imagen != null">
            <img :src="item.foto" width="60" height="70" alt="">
          </div>
          <div v-else>
            <img src="../../assets/imagenes/businessman.png" width="50" height="50">
          </div>
        </div>
      </td>
      <td style="text-align: left; margin-left:10px;">
        {{item.nombre}}
      </td>
      <td style="text-align: center">
        {{item.presentacion}}
      </td>
      <td style="text-align: center">
        <span style="text-align:center;"> {{item.presentacion}} </span>
      </td>
      <td style="text-align: left">
      <div style="display:flex; justify-content:center; align-items:center;">
        <q-btn @click="disminuir(item.id)" dense color="negative" size="0.7rem" style="width:21px; height:15px; margin-top:-2px;"> <span style="font-size:1.3rem; margin-top:-3px; ">-</span></q-btn>
        <span style="font-weight:400; font-size:1.1rem; margin-left:8px; margin-right:10px;">{{item.cantidad}}</span>
        <q-btn @click="aumentar(item.id)"  dense class="teal" size="0.7rem" color="secondary" style="width:21px; height:15px; margin-right:10px; margin-top:-2px;" ><span style="font-size:1rem; margin-top:-2px;">+</span></q-btn>
      </div>
      </td>
      <td style="text-align: center">
        S/ {{item.precio}}
      </td>
      <td style="text-align: center">
        S/ {{(item.precio * item.cantidad).toFixed(2)}}
      </td>
    </tr>
    <tr style="height: 40px; border-bottom: 0.5px #cdcdcd solid;">
      <td colspan="3"></td>
       <td style="text-align: center"> <span style="font-weight:700; font-size: 1rem;"> Total </span></td>
      <td style="text-align: center"> <span style="font-weight:700; font-size: 1rem;"> {{ totalCantidad }} </span> </td>
      <td></td>
      <td style="text-align: center"><span style="font-weight:700; font-size: 1rem;"> S/ {{ totalPrecio.toFixed(2) }} </span> </td>
    </tr>
    </table>
  </div>


</template>

<script>

const columns = [
  {
    name: "foto",
    label: "Imagen",
    align: "left",
   },
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "laboratorio",
    label: "Laboratorio",
    align: "left",
    field: "laboratorio",
  },
  {
    name: "presentacion",
    label:"Presentacion",
    align: "left"
  },
  {
    name: "unidades",
    label:"Cantidad",
    align: "left"
  },
  {
    name: "precio",
    label: "Precio",
    align: "left",
  },
  {
    name: "total",
    label: "Total",
    align: "left",
  }


];

import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const items = computed(() => store.state.compras )
    const aumentar = id => { store.commit('aumentarItemCompra', id) }
    const disminuir = id => { store.commit('disminuirItemCompra', id) }
    const eliminar = id => { store.commit('eliminarItemCompra', id) }
    const totalCantidad = computed(()=> store.getters.totalCantidad )
    const totalPrecio = computed(() => store.getters.totalPrecio )

    return {
      items,
      aumentar,
      disminuir,
      eliminar,
      columns,
      totalCantidad,
      totalPrecio
    }
  }
}
</script>

<style scoped>
.cerrar {
  color: #b2b2b232;
  font-size:1.8rem;
  margin-top:-3px;
  font-weight: 300;
}
.cerrar:hover {
  color: #d01137dD;
}
</style>
