<template>
  <div>
    <span>{{ props }}</span>
    <span v-if="props == true">{{ ObtenerProveedores() }}</span>
    <pre>{{ proveedores }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props:["props"] ,

  data() {
    return {
      proveedores:[]

    };
  },

  mounted() {
    this.ObtenerProveedores()
  },

  methods: {

        ObtenerProveedores() {

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
          console.log(len)
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              result.push(
                {
                  idprov: item.prov_idSucursal,
                  nombre: item.prov_raz_social,
                }
              );
            }
            this.proveedores = result
          }

        })

    },
  },
};
</script>
