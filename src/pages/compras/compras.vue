<template>
  <div style="display: none">
    <div>{{ (estado = props) }}</div>
    <span v-if="estado == true">{{ ObtenerProductos() }}</span>
    <!-- <pre>{{ categorias }}</pre> -->
  </div>

  <div>
    <q-table
      :filter="filter"
      no-data-label="No hay Categorias"
      hide-pagination
      :columns="columns"
      :rows="productos"
      row-key="id"
      class="tab"
      v-model:pagination="pagination"
      style="
        width: 100%;
        padding: 0px;
        height: 560px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
          rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
      "
    >
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-7"
          :max="pagesNumber"
          size="sm"
        />
      </div>

      <template v-slot:top-right>
        <q-btn
          flat
          round
          dense
          icon="shopping_basket"
          style="margin-left: 10px; font-size: 1.1rem"
          @click="drawerRight = !drawerRight"
        />
        <q-input
          borderless
          dense
          debounce="600"
          v-model="filter"
          placeholder="Buscar"
          style="
            background: #f3f3f34d;
            padding-left: 15px;
            padding-right: 10px;
            border-radius: 40px;
            margin-bottom: -10px;
          "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size: 0.9rem; font-weight: 700; margin-left: 90px"
          >
            <span>{{ col.label }}</span>
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" style="border: 3px solid red !important">
          <q-td key="foto" :props="props" style="width: 40px">
            <div
              style="
                border-radius: 0%;
                height: 40px;
                width: 40px;
                overflow: hidden;
              "
            >
              <div v-if="props.row.imagen != null">
                <img :src="props.row.foto" width="50" alt="" />
              </div>
              <div v-else style="background: #cdcdcd9d">
                <img
                  src="../../assets/imagenes/businessman.png"
                  width="30"
                  height="30"
                />
              </div>
            </div>
          </q-td>

          <q-td
            key="nombre"
            :props="props"
            width="50px"
            style="
              padding: 0px;
              table-display: fixed;
              width: 260px;
              overflow: hidden;
            "
          >
            <span>{{ props.row.laboratorio }}</span>
            <textarea
              cols="24"
              v-model="props.row.nombre"
              readonly="yes"
              style="
                margin-left: 15px;
                width: 260px;
                border: none;
                resize: none;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                overflow: auto;
                outline: none;
              "
            />
          </q-td>

          <q-td key="vencimiento" :props="props">
            <span style="font-size: 0.8rem">
              {{ props.row.vencimiento.split("-").reverse().join("/") }}</span
            >
          </q-td>

          <q-td key="presentacion">
            <div>
              <span style="font-size: 0.8rem">
                {{ props.row.presentacion }}</span
              >
            </div>
            <span style="font-size: 0.8rem">
              {{ props.row.unidades }} und
            </span>
            <div v-if="props.row.stock < props.row.unidades">
              <span>No disponible</span>
            </div>
          </q-td>

          <q-td key="precio">
            <span style="font-size: 0.8rem">S/ {{ props.row.precio }}</span>
          </q-td>
          <q-td key="acciones">
            <Precios :prod="props.row" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <q-drawer
    side="right"
    v-model="drawerRight"
    :width="320"
    :breakpoint="500"
    style="
      position: relative;
      background: white;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
      padding-bottom: 70px;
    "
  >
    <div style="margin: 15px">
      <div
        style="
          margin-top: 0px;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
        "
      >
        <span style="text-align: center; font-weight: 400; font-size: 1.2rem"
          >Tus Compras</span
        >
      </div>
      <CestaCompras />
    </div>

    <div
      style="
        position: fixed;
        width: 100%;
        height: 110px;
        background: white;
        bottom: 0px;
      "
    >
      <FooterSlider />
    </div>
  </q-drawer>
</template>

<script>
const columns = [
  {
    name: "foto",
    label: "Foto",
    align: "left",
  },
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "vencimiento",
    label: "F. Venc",
    align: "left",
    field: "vencimiento",
    sortable: true,
  },
  {
    name: "presentacion",
    label: "Presentacion",
    align: "left",
  },
  {
    name: "precio",
    label: "Precios",
    align: "left",
  },
  {
    name: "acciones",
    label: "Agregar",
    align: "left",
  },
];
import { useQuasar } from "quasar";
import { ref } from "vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Precios from "../../components/compras/Precios.vue";
import CestaCompras from "../../components/compras/CestaCompras.vue";
import FooterSlider from "../../components/compras/FooterSlider.vue";

export default {
  components: { CestaCompras, Precios, FooterSlider },
  setup() {
    const $q = useQuasar();

    const filter = ref("");
    const estado = ref(false);
    const store = useStore();
    onMounted(() => {
      store.dispatch("ObtenerProductos");
    });

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10000,
      // rowsNumber: xx if getting data from a server
    });

    const productos = computed(() => store.state.productos);
    const compras = computed(() => store.state.compras);

    return {
      drawerRight: ref($q.screen.width > 500),
      productos,
      columns,
      pagination,
      filter,
      estado,
      compras,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
};
</script>

<style>
</style>
