<template>
  <div class="q-pa-md">
    <q-table
      class="q-mt-md tablaUsuarios"
      grid
      :filter="filter"
      no-data-label="No hay usuarios"
      :columns="columns"
      :rows="usuarios"
      hide-pagination
      row-key="uid"
      hide-header
      hide-bottom
      v-model:pagination="pagination"
      style="margin-top:-20px;"
    >
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div>

      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="600"
          v-model="filter"
          placeholder="Buscar"
          style="
            background: #f3f3f3;
            padding-left: 15px;
            padding-right: 10px;
            border-radius: 40px;
          "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="" v-if="estado == true" >
          {{obtenerUsuarios()}}
        </div>
              {{estado}}
        <!-- BTN AGREGAR USUARIO -->
        <q-btn flat round dense icon="person_add" style="margin-left: 10px; font-size:1.1rem; background:#f3f3f3;" @click="drawerRight = !drawerRight"/>
        <!-- BTN AGREGAR USUARIO -->

      </template>

      <template v-slot:item="props">
        <Itemus :props="props.row" @stateUser="estado = $event"/>
      </template>


    </q-table>
  </div>

  <q-drawer
    side="right"
    v-model="drawerRight"
    bordered
    :width="580"
    :breakpoint="500"
    behavior="desktop"
    class="bg-gray"
    style="position:relative;"
  >

  <div class="q-px-md" >
    <form class="login">
    <div style=" display:flex;">


      <div style="width:290px; padding-right:10px; paddingTop:40px; ">
          <q-input
            label="Ingresar nombre"
            outlined
            v-model="usuario.nombre"
            type="text"
            placeholder="Nombre"
            style="margin-bottom: 16px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>
          </q-input>

          <q-input
            outlined
            label="Ingresa tu correo"
            v-model="usuario.email"
            type="email"
            placeholder="Email"
            style="margin-bottom: 16px;"
          >
            <template v-slot:prepend>
              <q-icon name="email"/>
            </template>
          </q-input>

          <q-input
            outlined
            dense

            v-model="usuario.password"
            :type="isPwd ? 'password' : 'text'"
            placeholder="Contraseña"
            style="margin-bottom: 10px;"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-select
            outlined
            :options="oficios"
            v-model="usuario.oficio"
            label="Selecciona el Oficio"
            placeholder="Contraseña"
          >
            <template v-slot:prepend>
              <q-icon name="portrait" />
            </template>
          </q-select>

          <button class="buttonUsuario" @click.prevent="agregarDato(),drawerRight = !drawerRight">Registrar</button>
      </div>
      <div style="width:290px; padding-left:10px;">
        <q-btn flat round dense icon="clear" class="drawerDerecho" @click="drawerRight = !drawerRight"/>
        <p
          style="
            font-size: 1.3em;
            text-align: center;
            margin-bottom: 25px;
            margin-top: 10px;
          "
        >
          Agregar Empleado
        </p>

      <!-- input  file -->

          <div class="container-input">
            <input type="file" name="file-5" id="file-5" class="inputfile inputfile-5" data-multiple-caption="{count} archivos seleccionados" multiple @change="buscarImagen($event)" />
            <label for="file-5">
              <div v-if="datoImagen !== null" style="display:flex; justify-content:center; margin-top: -20px; margin-bottom: 20px; ">
                <img :src="datoImagen" height="140"  />
              </div>
              <figure v-else >
                <svg  xmlns="http://www.w3.org/2000/svg" class="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
              </figure>
            </label>
          </div>
          <!-- end input file -->

          <q-input
            label="Ingresar nombre"
            outlined
            v-model="usuario.nombre"
            type="text"
            placeholder="Nombre"
            style="margin-bottom: 16px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>
          </q-input>

          <q-input
            outlined
            label="Ingresa tu correo"
            v-model="usuario.email"
            type="email"
            placeholder="Email"
            style="margin-bottom: 16px;"
          >
            <template v-slot:prepend>
              <q-icon name="email"/>
            </template>
          </q-input>

          <q-input
            outlined
            label="Ingresa la contraseña"
            v-model="usuario.password"
            :type="isPwd ? 'password' : 'text'"
            placeholder="Contraseña"
            style="margin-bottom: 16px;"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-select
            outlined
            :options="oficios"
            v-model="usuario.oficio"
            label="Selecciona el Oficio"
            placeholder="Contraseña"
          >
            <template v-slot:prepend>
              <q-icon name="portrait" />
            </template>
          </q-select>

          <button class="buttonUsuario" @click.prevent="agregarDato(),drawerRight = !drawerRight">Registrar</button>
      </div>

    </div>
    </form>
  </div>

  </q-drawer>

</template>

<script>
import { useQuasar } from "quasar";

import { ref, computed } from "vue";

//import Itemus from "../../components/usuarios/Itemus";

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "correo",
    label: "Correo",
    align: "left",
    field: "email",
    sortable: true,
  },
    {
    name: "rol",
    label: "Rol",
    align: "left",
    field: "rol",
    sortable: true,
  },
];

const rows = [
  {
    nombre: "productp 1",
    correo: "opcion1",
  },
];

export default {
  components: {  },
  setup() {
    const $q = useQuasar();
    const usuarioSeleccionado = ref("mails");
    const users = ref([ ]);
    const usuarios = ref([ ]);
    const selected = ref("");

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 1000,
      // rowsNumber: xx if getting data from a server
    });
    return {
      password: ref(""),
      isPwd: ref(true),
      drawerRight: ref($q.screen.width < 500),
      usuarioSeleccionado,
      users,
      filter: ref(""),
      columns,
      rows,
      pagination,
      oficios: [
        'Ingeniero', 'Arquitecto', 'Operario', 'Administrador', 'Tecnico', 'Obrero'
      ],
      pagesNumber: computed(() =>
        Math.ceil(rows.length / pagination.value.rowsPerPage)
      ),
    };
  },

  data() {
    return {
      estado: false,
      file: null,
      datoImagen: null,
      usuarios:[],
      usuario: {
        nombre: "",
        apellidoPaterno:"",
        apellidoMaterno:"",
        dni:"",
        celular:"",
        direccion:"",
        estado:0,
        usuario: "",
        contra:"",
        rol:0,
        foto: "",
      },
    };
  },
  created() {

  },
  methods: {

    // BUSCAR IMAGEN
    buscarImagen(event) {
      const tipoArchivo = event.target.files[0].type;
      if (tipoArchivo === "image/jpeg" || tipoArchivo === "image/png") {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no válido";
        this.file = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.datoImagen = e.target.result;
      };
    },

  },
};
</script>

<style>
.tablaUsuarios {
  border: none;
  background: white;
  box-shadow: none;
}
.ContainerItemUsuario {
  margin: auto;
  width: 100%;
  padding: 8px;
  border-bottom: solid 0.1px #00000015;
}

.buttonUsuario {
  font-family: "Asap", sans-serif;
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  border: 0;
  padding: 15px 0;
  margin-top: 16px;
  margin-bottom: 8px;
  margin-left: 0px;
  border-radius: 0px;
  background-color: #000000a4;

  -webkit-transition: background-color 300ms;
  -moz-transition: background-color 300ms;
  transition: background-color 300ms;
}
.buttonUsuario:hover {
  background-color: #131313;
}
.drawerDerecho {
  margin-left: 232px;
  margin-top:5px;
  margin-bottom:-20px;
  font-size:0.7rem;
}
.drawerDerecho:hover {
  color:#b31b00;
  background: none !important;
}

/*** inicio input file ***/

.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}


.inputfile + label svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
}


.inputfile-5:focus + label,
.inputfile-5.has-focus + label,
.inputfile-5 + label:hover {
    color: #9f8465;
}

.inputfile-5 + label figure {
    width: 70%;
    height: 145px;
    background-color: #0a0a0a80;
    justify-content: center;
    text-align: center;
    padding: 35px;
    margin-top: -20px;
}

.inputfile-5:focus + label figure,
.inputfile-5.has-focus + label figure,
.inputfile-5 + label:hover figure {
    background-color: #0062ff;
}

.inputfile-5 + label svg {
    width: 100%;
    height: 100%;
    fill: #fff;
}
/** end input file */
</style>
