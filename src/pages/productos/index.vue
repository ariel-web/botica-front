<template>
  <div style="position:relative; margin-top:-8px; " class="">
    <div class="" style=" width:100%">
      <VerProductos @cambiarEstado="canbiarE" :props="esta" />
    </div>
    <div class="" style="position:absolute; top:15px; right:230px;">
      <AgregarProducto @cambiarEstado="canbiarE" />
    </div>

  </div>

</template>
<script>
import AgregarProducto from '../../components/productos/AgregarProducto.vue'
import VerProductos from '../../components/productos/VerProductos.vue'
export default {

  components: { AgregarProducto, VerProductos },
  setup() {

    return {

    };
  },

  data() {
    return {
      esta: false
    }
  },

  methods: {
    canbiarE (event) {
      this.esta = event;
    }

  }


}
</script>
