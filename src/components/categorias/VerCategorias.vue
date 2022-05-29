<template>
  <div style="display:none;">
    <div> {{ estado = props }}</div>
    <span v-if="estado == true">{{ ObtenerCategorias() }}</span>
    <!-- <pre>{{ categorias }}</pre> -->
  </div>
  <div>
  <q-table
      class="q-mt"
      :filter="filter"
      no-data-label="No hay Categorias"
      :columns="columns"
      :rows="categorias"
      row-key="id"
      v-model:pagination="pagination"
      style=" padding-left: 20px; background: white; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px; border-radius:10px; border-bottom: solid 2.5px crimson; "
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
            style="font-size:0.9rem; font-weight:700; "
          >
            {{ col.label }}
          </q-th>

        </q-tr>
      </template>

      <template v-slot:body="props"  >
        <q-tr :props="props" style=" border:3px solid red !important; ">
          <q-td key="foto" :props="props"  >
            <div style="border-radius:50%; height:30px; width:30px; overflow:hidden;">
              <div v-if="props.row.imagen != null">
                <img :src="props.row.foto" width="30" alt="">
              </div>
              <div v-else style="background:#cdcdcd9D;">
                <img src="../../assets/imagenes/businessman.png" width="30" height="30">
              </div>
             </div>
          </q-td>
          <q-td key="nombre" :props="props"   >
            <span style="font-size:0.8rem"> {{ props.row.nombre }}</span>
          </q-td>
          <q-td key="descripcion" :props="props" >
            <span style="font-size:0.8rem"> {{ props.row.descripcion }}</span>
          </q-td>
        </q-tr>
      </template>


    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from 'axios';

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
    name: "descripcion",
    label: "Descripción",
    align: "left",
  },

];

export default {
  props:["props"] ,

  setup(){
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 8,
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
    };
  },

  mounted() {

    this.ObtenerCategorias()
  },

  methods: {

        ObtenerCategorias() {

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
        axios.get('http://localhost:8000/admin/categorias', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              result.push(
                {
                  idprov: item.cat_idSucursal,
                  nombre: item.cat_nombre,
                  descripcion: item.descripcion,
                  foto: item.cat_foto,
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
