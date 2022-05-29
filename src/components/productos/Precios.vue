<template>

  <div style="width: 240px; display:flex; ">

    <div style="width:80px; " v-for="item in precios" :key="item.precio.id">

      <div style="justify-content:center; display:flex; margin-top:-3px;"><span>{{item.precio.pre_presentacion}}</span></div>
      <div style="justify-content:center; display:flex; "><span> <div> {{ std == 1? ObtenerPrecios() : null }} </div> S/ {{item.precio.pre_precio}}</span></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props:["props", "std"],

    data() {
      return {
        precios:[],
      };
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
        axios.get(`http://localhost:8000/admin/precios/${this.props}`, config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              result.push(
                {
                  precio: item,
                }
              );
            }
            this.precios = result
          }


          // this.estado = false;
          // return this.$emit('cambiarEstado', this.estado);
        })

    },
  },

}
</script>

<style>

</style>
