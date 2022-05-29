<template>
  <div class="" style="background:white;">
    <div class="" >
      <q-tabs
        v-model="tab"
        inline-label
        no-caps
        flat
        dense
        style="max-width: 550px;"
        class="text-grey"
        active-color="negative"
        indicator-color="negative"
        align="justify"

      >
        <q-tab name="productos"  icon="token" label="Productos" />
        <q-tab name="categorias" icon="category" label="Categorias" />
        <q-tab name="locales" icon="store" label="Locales" />
        <q-tab name="empleados" icon="person" label="Empleados" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated style="width:100%; padding-bottom:0px;" >
        <q-tab-panel name="productos">

          <div style="margin-top:-20px; margin-left:-20px; margin-right:-15px; margin-bottom:-15px; height:100%; overflow-y: hidden;">
            <Productos/>
          </div>

        </q-tab-panel>

        <q-tab-panel name="categorias">
          <div style="margin-top:0px;">
            <Categorias/>
          </div>
        </q-tab-panel>

        <q-tab-panel name="locales">
          <div style="margin-top:-20px;">
            <Locales/>
          </div>
        </q-tab-panel>
        <q-tab-panel name="empleados">
          <div style="margin-top:-20px;">
            <Empleados/>
          </div>
        </q-tab-panel>
      </q-tab-panels>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Locales from '../locales/index.vue'
import Categorias from '../categorias/index.vue'
import Productos from '../productos/index.vue'
import Empleados from '../usuarios/index.vue'
export default {
  components: { Locales, Categorias, Productos, Empleados },
  setup () {
    return {
      tab: ref('productos')
    }
  }
}
</script>
