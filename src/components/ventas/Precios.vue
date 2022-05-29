<template>
  <div style=" display:flex; align-items:center;">

    <div style="width:80px; padding-left:10px;">
      <q-btn flat style="border: solid 1px #f2f2f2; height:5px; width:5px;" @click="agregar(prod)" >
        <q-tooltip class="bg-primary" :offset="[10, 10]">
          Agregar!
        </q-tooltip> <q-icon name="add" color="positive" size="1.3rem"/> </q-btn>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    props:["prod"],

    setup() {
      const store = useStore()
      const agregar = (producto) => {

        store.dispatch('addCompras', producto)
      }

      return {
        agregar
      }
    },

    data() {

      return {
        cant:1,
        precio:null,
        precios:[],
        select:null,
      };
    },

    mounted (){

    },

    methods: {

    ObtenerPrecios() {
        let token = localStorage.getItem('token');
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };
        axios.get(`http://localhost:8000/admin/precios/${this.prod.id}`, config)
        .then(response => {
          let len = response.data.length;
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              result.push(
                {
                  label: item.pre_presentacion,
                  value: item.pre_precio
                }
              );
            }
            this.precios = result
            this.precio = result[0].value
          }

        })

    },
  },

}
</script>

<style>

</style>
