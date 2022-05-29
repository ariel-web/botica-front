<template>
  <div style="display:none;">
    <div> {{ estado = props }}</div>
    <span v-if="estado == true">{{ ObtenerProductos() }}</span>
    <!-- <pre>{{ categorias }}</pre> -->
  </div>
  <div>
  <q-table
      virtual-scroll
      :filter="filter"
      no-data-label="No hay Categorias"
      hide-pagination
      :columns="columns"
      :rows="categorias"
      row-key="id"
      v-model:pagination="pagination"
      style=" width:100%; padding: 0px; height:560px;  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px; "
    >
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-7"
          :max="pagesNumber"
          size="sm"
        />
      </div>

      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="600"
          v-model="filter"
          placeholder="Buscar"
          style="
            background: #f3f3f34D;
            padding-left: 15px;
            padding-right: 10px;
            border-radius: 40px;
            margin-bottom:-10px;
          "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

      </template>

      <template v-slot:header="props" >
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size:0.9rem; font-weight:700; margin-left:90px; "
          >
            {{ col.label }}
          </q-th>

        </q-tr>
      </template>

      <template v-slot:body="props"  >
        <q-tr :props="props" style=" border:3px solid red !important; ">
          <q-td key="foto" :props="props" style="width:60px;" >
            <div style="border-radius:0%; height:50px; width:50px; overflow:hidden;">
              <div v-if="props.row.imagen != null">
                <img :src="props.row.foto" width="50" alt="">
              </div>
              <div v-else style="background:#cdcdcd9D;">
                <img src="../../assets/imagenes/businessman.png" width="30" height="30">
              </div>
             </div>
          </q-td>

          <q-td key="nombre" :props="props" width="50px" style="padding:0px; table-display:fixed; width:160px; overflow:hidden; " >
             <textarea  cols="24" v-model="props.row.nombre" readonly="yes" style=" margin-left:15px; border:none; resize: none; display:flex; justify-content:center; align-items:center; cursor:pointer; overflow: auto; outline: none;" />
          </q-td>

          <q-td key="laboratorio" :props="props"   >
            <span style="font-size:0.8rem"> {{ props.row.laboratorio }}</span>
          </q-td>

          <q-td key="stock" :props="props" >
            <span style="font-size:0.8rem"> {{ props.row.stock }} und</span>
          </q-td>

          <q-td key="vencimiento" :props="props" >
            <span style="font-size:0.8rem"> {{ props.row.vencimiento.split('-').reverse().join('/') }}</span>
          </q-td>
          <q-td key="presentacion">
            <span style="font-size:0.8rem"> {{ props.row.presentacion }}</span>
          </q-td>
          <q-td key="unidades">
            <span style="font-size:0.8rem"> {{ props.row.unidades }} und </span>
          </q-td>

          <q-td key="precio">
            <span style="font-size:0.8rem">S/ {{ props.row.precio }}</span>
          </q-td>
        </q-tr>
      </template>


    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from 'axios';
import Precios from './Precios.vue'

const columns = [
  {
    name: "foto",
    label: "Foto",
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
    name: "stock",
    label: "Stock",
    field: "stock",
    align: "left",
    sortable: true,
  },
  {
    name: "vencimiento",
    label: "F. Venc",
    align: "left",
    field: "vencimiento",
    sortable: true,
  },
  {
    name: "presentacion",
    label:"Presentacion",
    align: "left"
  },
  {
    name: "unidades",
    label:"Und x Pres",
    align: "left"
  },
  {
    name: "precio",
    label: "Precios",
    align: "left",
  },



];

export default {
  props:["props"] ,
  components: {  },
  setup(){
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10000,
      // rowsNumber: xx if getting data from a server
    });
    return {
      columns,
      pagination,

    }
  },

  data() {
    return {
      filter:"",
      estado: false,
      categorias:[],
      textArea:"",
    };
  },

  mounted() {

    this.ObtenerProductos()
  },

  methods: {

    ObtenerProductos() {

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
        axios.get('http://localhost:8000/admin/productos', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              result.push(
                {
                  id: item.id,
                  nombre: item.pro_nombre,
                  sucursal: item.pro_idSucursal,
                  categoria: item.pro_idCategoria,
                  stock: item.pro_stock,
                  descuento: item.pro_descuento,
                  vencimiento: item.pro_vencimiento,
                  via: item.pro_viaAdministracion,
                  dosis: item.pro_dosis,
                  laboratorio: item.pro_laboratorio,
                  stock_min: item.pro_stock_minimo,
                  stock_max: item.pro_stock_maximo,
                  descripcion: item.pro_descripcion,
                  presentacion: item.pre_presentacion,
                  precio: item.pre_precio,
                  unidades: item.pre_cantidad,
                  imagen: item.pro_foto,

                  foto: "http://localhost:8000/productos/"+item.pro_foto,
                }
              );
            }
            this.categorias = result
          }
          this.estado = false;
          return this.$emit('cambiarEstado', this.estado);

        })

    },
  },
};
</script>

<style css>
textarea:read-only,
[contenteditable]:read-only {
  pointer-events: none;
  background-color: #ffff0000 !important;
  color: #000000;
}
</style>
