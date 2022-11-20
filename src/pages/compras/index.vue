<template>
  <div class="" style="background: white">
    <div class="">
      <q-tabs
        v-model="tab"
        inline-label
        no-caps
        flat
        dense
        style="max-width: 300px"
        class="text-grey"
        active-color="negative"
        active-class="indicador"
        indicator-color="white"
        align="justify"
      >
        <q-tab
          name="comprar"
          icon="shopping_basket"
          label="Compras"
          @click="comprar('comprar')"
        />
        <q-tab
          name="compras"
          icon="point_of_sale"
          label="Finalizar"
          @click="comprar('compras')"
        />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        style="width: 100%; padding-bottom: -20px"
      >
        <q-tab-panel name="comprar">
          <div
            style="margin-top: -20px; margin-left: -15px; margin-right: -15px"
          >
            <Compras />
          </div>
        </q-tab-panel>

        <q-tab-panel
          name="compras"
          style="height: 576px; position: relative; width: 100%"
        >
          <div style="margin-top: -20px">
            <div style="width: 100%; padding: 0px 15px">
              <CestaComprasf />
            </div>
            <div
              style="
                position: absolute;
                width: 100%;
                background: teal;
                bottom: 0px;
                margin-left: -16px;
              "
            >
              <FooterComprasf />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Compras from "./compras.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import CestaComprasf from "../../components/compras/CestaComprasf.vue";
import FooterComprasf from "../../components/compras/FooterSliderf.vue";
export default {
  components: { Compras, CestaComprasf, FooterComprasf },
  setup() {
    const store = useStore();
    const tab = computed(() => store.state.tabcompras);
    const comprar = (tab) => {
      store.commit("setTabCompras", tab);
    };
    return {
      tab,
      comprar,
    };
  },
};
</script>
<style scoped>
.indicador {
  background: white;
  border: solid 1px #cdcdcd4d;
  border-bottom: none;
  border-top: none;
}
</style>


