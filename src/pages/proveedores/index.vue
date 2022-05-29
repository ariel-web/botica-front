<template>
  <div>
    <AgregarProveedor @cambiarEstado="canbiarE" />
    <VerProveedor :props="esta" />

  </div>

</template>
<script>
import AgregarProveedor from '../../components/proveedores/AgregarProveedor.vue'
import VerProveedor from '../../components/proveedores/VerProveedores.vue'
export default {

  components: { AgregarProveedor, VerProveedor },
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
      if( event == true ){
        this.esta = true;
      }

    }
  }

}
</script>
