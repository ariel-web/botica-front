<template>
  <div style="display:flex;" class="q-px-md">
    <div class="">
      <AgregarCategoria @cambiarEstado="canbiarE" />
    </div>
    <div class="" style=" margin-left:30px; width:100%">
      <VerCategorias @cambiarEstado="canbiarE" :props="esta" />
    </div>
  </div>

</template>
<script>
import AgregarCategoria from '../../components/categorias/AgregarCategoria.vue'
import VerCategorias from '../../components/categorias/VerCategorias.vue'
export default {

  components: { AgregarCategoria, VerCategorias },
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
