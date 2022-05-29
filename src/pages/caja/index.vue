<template>
  <div style="display:flex;" class="q-px-md">
    <div class="">
      <AgregarCaja @cambiarEstado="canbiarE" />
    </div>
    <div class="" style=" margin-left:30px; width:100%">
      <VerCaja @cambiarEstado="canbiarE" :props="esta" />
    </div>
  </div>

</template>
<script>
import AgregarCaja from '../../components/caja/AgregarCaja.vue'
import VerCaja from '../../components/caja/VerCajas.vue'
export default {

  components: { AgregarCaja, VerCaja },
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
