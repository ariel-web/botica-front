<template>
  <div style="display:none;">
    <div> {{ estado = props }}</div>
    <span v-if="estado == true">{{ ObtenerCajas() }}</span>
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
          <q-td key="nombre" :props="props"   >
            <span style="font-size:0.8rem"> {{ props.row.nombre }}</span>
          </q-td>
          <q-td key="fecha" :props="props" >
            <span style="font-size:0.8rem"> {{ props.row.fecha }}</span>
          </q-td>
          <q-td key="inicio" :props="props" >
            <span style="font-size:0.8rem"> S/ {{ props.row.inicio }}</span>
          </q-td>
          <q-td key="final" :props="props" >
            <span style="font-size:0.8rem"> S/ {{ props.row.final }}</span>
          </q-td>
          <q-td key="estado" :props="props" >
            <div v-if="props.row.estado != props.row.estadoItem" style="display:none;">
              {{ ActualizarEstado(props.row.id, props.row.estado) }}
            </div>
            <q-toggle v-model="props.row.estado"  color="purple" keep-color />
          </q-td>
          <q-td key="opciones" :props="props" >
            <span style="font-size:0.8rem"> ver </span>
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
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "fecha",
    label: "Fecha",
    align: "left",
  },
  {
    name: "inicio",
    label: "Inicio S/",
    align: "left",
  },
  {
    name: "final",
    label: "Final S/",
    align: "left",
  },
  {
    name: "estado",
    label: "Estado",
    align: "left",
  },
  {
    name: "opciones",
    label: "opciones",
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

    this.ObtenerCajas()
  },

  methods: {

    ObtenerCajas() {

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
        axios.get('http://localhost:8000/admin/cajas', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              let std = false;
              if(response.data[i].estado != 0){
                std = true;
              }
              result.push(
                {
                  id: item.id,
                  nombre: item.cja_nombre,
                  fecha: item.cja_fecha,
                  inicio: item.cja_montoInicio,
                  final:  item.cja_montoFinal,
                  estado: std,
                  estadoItem: std,

                }
              );
            }
            this.categorias = result
          }
          this.estado = false;
          return this.$emit('cambiarEstado', this.estado);

        })

    },

    ActualizarEstado(id, estado) {

      const formdata = new FormData()
      let std = 0
      if( estado == true){
        std = 1
      }
      formdata.append('cja_estado', std)
      formdata.append('_method', 'PUT')
      let url = `http://localhost:8000/admin/cajas/${id}`
      let token = localStorage.getItem('token');
      const config = {
          accept: 'application/json',
          headers: { Authorization: `Bearer ${token}` }
      };
      axios.post(
        url,
        formdata,
        config
      )
      .then(response => {
        if(response.status == 200) {
            this.ObtenerCajas()
        }else {
           console.log(response.status);
        }
      })

    },
  },
};
</script>
