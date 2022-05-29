<template>
  <div class="" style="background:white;">
    <div class="" >
      <q-tabs
        v-model="tab"
        inline-label
        no-caps
        flat
        dense
        style="max-width: 300px;"
        class="text-grey"
        active-color="negative"
        active-class="indicador"
        indicator-color="white"
        align="justify"
      >
        <q-tab name="vender" icon="shopping_basket" label="Ventas" @click="vendertab('vender')"  />
        <q-tab name="compras" icon="point_of_sale" label="Finalizar" @click="vendertab('compras')" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated style="width:100%; padding-bottom:-40px;" >
        <q-tab-panel name="vender">
          <div style="margin-top:-20px; margin-left:-15px; margin-right:-15px;">
            <Ventas/>
          </div>
        </q-tab-panel>

      </q-tab-panels>

    </div>
  </div>
</template>

<script>

import Ventas from './ventas.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { Ventas },
  setup () {
    const store = useStore()
    const tab = computed(() => store.state.tabventas )
    const vendertab = tab => { store.commit('setTabVentas', tab) }

    return {
      tab,
      vendertab
    }
  }
}
</script>
<style scoped>
.indicador{
  background: white;
  border:solid 1px #cdcdcd4D;
  border-bottom: none;
  border-top: none;
}
</style>
