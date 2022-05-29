<template>

  <div style="background:white;">
    <div style="display:none"> {{ children = sucursalesLabel }} </div>

    <q-splitter
      v-model="splitterModel"
      unit="px"
      style="height: 560px"
    >
      <template v-slot:before>

        <div class="q-pa-md" style=" width:270px; margin:10px; border-radius:10px; ">
          <div style="display:flex; align-items:center; margin-bottom:10px;" >
            <q-icon name="store" style="color:crimson" size="1.6rem"/>
            <span style="margin-left:6px; font-size:1.5rem; ">Mis Locales</span>
          </div>
          <q-input
            ref="filterRef"
            dense
            style="background:#F2f2f232; border-radius:15px; margin-bottom:10px; padding-left:20px; padding-right:15px;"
            borderless
            v-model="filter"
            placeholder="Buscar local"
          >
            <template v-slot:append>
              <q-icon v-if="filter === ''" name="search" />
              <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
            </template>
          </q-input>

          <q-tree
            selected-color="negative"
            v-model:selected="seleccionado"
            :nodes="simple"
            node-key="label"
            :filter="filter"
            :filter-method="myFilterMethod"
            v-model:expanded="puno"

          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="seleccionado"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
          v-for="item,index in sucursales" :key="index"
        >
          <q-tab-panel name="Region Puno" style="height:550px; padding:10px; background:white" v-if="index == 0" >
            <div style=" padding:10px; border-radius:15px; height:100%;">
              <div class="text-h6" style="margin-bottom:10px;">Sucursal plateria</div>
              <div style="width:100%; height:250px; height-max:250px; overflow:hidden;" >
                <img src="../../assets/imagenes/sucursal-default.jpg" style="width:100%;" >
              </div>
              <div style="display:flex; padding-top:20px;">
                <div style="width:50%; ">
                  <div style="margin-bottom:10px;">
                    <div >
                      <span style="font-size:.99rem; font-weight:500;">Nombre:</span>
                    </div>
                    <div>
                      <span>Botica Rous - Plateria</span>
                    </div>
                  </div>

                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Dirección:</span>
                    </div>
                    <div>
                      <span>Jr. Valle verde 239</span>
                    </div>
                  </div>

                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Ubicación:</span>
                    </div>
                    <div>
                      <span>Puno, Plateria</span>
                    </div>
                  </div>


                </div>
                <div>
                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Telefono:</span>
                    </div>
                    <div>
                      <span>988377272</span>
                    </div>
                  </div>

                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Ruc:</span>
                    </div>
                    <div>
                      <span>-</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </q-tab-panel>

            <q-tab-panel  :name="item.label" style="height:560px; padding:10px; background:white">
              <div style=" padding:10px; border-radius:15px; height:100%;">
              <div class="text-h6" style="margin-bottom:10px;">{{item.label}}</div>
              <div v-if="item.imagen == null"  style="width:100%; height:250px; height-max:250px; overflow:hidden;" >
                <img src="../../assets/imagenes/sucursal-default.jpg" style="width:100%;" >
              </div>
              <div v-else  style="width:100%; height:250px; height-max:250px; overflow:hidden;" >
                <img v-bind:src="item.foto" style="width:100%;" >
              </div>
              <div style="display:flex; padding-top:20px;">
                <div style="width:50%; ">
                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Nombre:</span>
                    </div>
                    <div>
                      <span>Botica Rous - {{item.label}} </span>
                    </div>
                  </div>

                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Dirección:</span>
                    </div>
                    <div>
                      <span>{{item.direccion}}</span>
                    </div>
                  </div>

                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Ubicación:</span>
                    </div>
                    <div>
                      <span>{{item.ubicacion}}</span>
                    </div>
                  </div>


                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Referencia:</span>
                    </div>
                    <div>
                      <span>{{item.referencia}}</span>
                    </div>
                  </div>

                </div>
                <div>
                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Telefono:</span>
                    </div>
                    <div>
                      <span>988377272</span>
                    </div>
                  </div>

                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Ruc:</span>
                    </div>
                    <div>
                      <span>-</span>
                    </div>
                  </div>

                  <div style="margin-bottom:10px;">
                    <div>
                      <span style="font-size:.99rem; font-weight:500;">Responsable:</span>
                    </div>
                    <div>
                      <ResponsableLocal :props = item.responsable />
                    </div>
                  </div>

                  <div style="margin-top:20px; display:flex;">

                    <button class="sucEditar" @click="abrirEditar(item)">
                      <q-icon name="edit" size="1rem" />
                      <span style="margin-left:5px; font-size:.99rem; font-weight:500;">Editar</span>
                    </button>
                   <button class="sucEliminar" @click="EliminarSucursal(item.id)" >
                      <q-icon name="delete" size="1rem" />
                      <span style="margin-left:5px; font-size:.99rem; font-weight:500;">Eliminar</span>
                    </button>
                  </div>
                </div>

              </div>


            </div>

            </q-tab-panel>

        </q-tab-panels>
      </template>
    </q-splitter>
  </div>

  <q-drawer
    side="right"
    v-model="drawerRight"
    :width="290"
    :breakpoint="500"
    style="position:relative; background:white; box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;"
  >
  <!-- FORMULARIO AGREGAR -->
  <div v-if="editar == false" >
    <form class="agregarsucursal" @submit.prevent="AgregarSucursal" enctype="multipart/formdata">
      <div style="margin-bottom:3px; padding-left:3px; margin-top:5px; display:flex; justify-content:center; height:20px; padding-bottom:0px; justify-contenr:center;">
        <div style="margin-left:-5px; margin-right:5px; color:#0000008D; margin-top:2px; ">
          <q-icon name="add_business" size="1.3rem"  />
        </div>
        <div>
          <p style="font-size: 1.1rem; font-weight:700; color:#0000009D;">
            Agregar Local
          </p>
        </div>

      </div>

      <div class="container-input">

        <input type="file" name="file-5" id="file-5" class="inputfile inputfile-5" @change="buscarImagen($event)" />
        <label for="file-5">
          <div v-if="suc_foto !== null" style="display:flex; justify-content:center; margin-bottom: 20px; overflow:hidden; height:160px; width:290px">
            <img :src="suc_foto" height="180" />
          </div>
          <div v-else style="display:flex; justify-content:center; align-items:center; margin: 10px; overflow:hidden; height:160px; width:270; border: 1px solid #00000015;">
            <div>
              <img src="../../assets/imagenes/upload-imagen.png"  width="100" height="100" />
            <p style="text-align:center;" >Subir Imagen</p>
            </div>
          </div>

        </label>
      </div>
      <!-- end input file -->

      <div style="padding-left:10px; padding-right:10px; " >

        <q-input
          dense
          outlined
          v-model="suc_nombre"
          type="text"
          placeholder="Nombre"
          style="margin-bottom: 14px;"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="store" size="1.5rem"/>
          </template>

        </q-input>
              <q-input
          dense
          outlined
          v-model="suc_direccion"
          type="text"
          placeholder="Dirección"
          style="margin-bottom: 14px;"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="room" size="1.4rem"/>
          </template>
        </q-input>


      <q-input
          dense
          outlined
          v-model="suc_ubicacion "
          type="text"
          placeholder="Ciudad"
          style="margin-bottom: 14px;"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="my_location" size="1.3rem"/>
          </template>
        </q-input>

        <q-input
          outlined
          dense
          v-model="suc_responsable"
          type="text"
          placeholder="Encargado"
          style="margin-bottom: 14px; border-color:red;"
        >
          <template v-slot:prepend>
            <q-icon name="person_pin" size="1.4rem"/>
          </template>
        </q-input>

        <q-input
          outlined
          dense
          v-model="suc_referencia"
          type="text"
          placeholder="Referencia"
          style="margin-bottom: 14px;"
        >
          <template v-slot:prepend>
            <q-icon name="gps_not_fixed" size="1.4rem"/>
          </template>
        </q-input>

        <q-input
          outlined
          disable
          dense
          v-model="suc_celular"
          type="text"
          placeholder="Numero Sucursal"
          style="margin-bottom: 14px; border-color:red;"
        >
          <template v-slot:prepend>
            <q-icon name="phone" size="1.4rem"/>
          </template>
        </q-input>

        <button class="buttonUsuario" type="submit">Registrar</button>
      </div>
     </form>
  </div>

  <!-- FORMULARIO EDITAR -->
  <div v-if="editar == true" class=""  >
    <form class="agregarsucursal" @submit.prevent="EditarSucursal" enctype="multipart/formdata">
      <div style="margin-bottom:3px; padding-left:3px; margin-top:5px; display:flex; justify-content:center; height:20px; padding-bottom:0px; justify-contenr:center;">
        <div style="margin-left:-5px; margin-right:5px; color:#0000008D; margin-top:2px; ">
          <q-icon name="add_business" size="1.3rem"  />
        </div>
        <div>
          <p style="font-size: 1.1rem; font-weight:700; color:#0000009D;">
            Editar Local
          </p>
        </div>

      </div>

      <div class="container-input">

        <input type="file" name="file-5" id="file-5" class="inputfile inputfile-5" @change="buscarImagen($event)" />
        <label for="file-5">
          <div v-if="suc_foto !== null" style="display:flex; justify-content:center; margin-bottom: 20px; overflow:hidden; height:160px; width:290px">
            <img :src="suc_foto" height="180" />
          </div>
          <div v-else style="display:flex; justify-content:center; align-items:center; margin: 10px; overflow:hidden; height:160px; width:270; border: 1px solid #00000032;">
            <div>
              <img src="../../assets/imagenes/upload-imagen.png"  width="100" height="100" />
            <p style="text-align:center;" >Subir Imagen</p>
            </div>
          </div>

        </label>
      </div>
      <!-- end input file -->

      <div style="padding-left:10px; padding-right:10px; " >

        <q-input
          dense
          outlined
          v-model="suc_nombre"
          type="text"
          placeholder="Nombre"
          style="margin-bottom: 14px;"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="store" size="1.5rem"/>
          </template>

        </q-input>
              <q-input
          dense
          outlined
          v-model="suc_direccion"
          type="text"
          placeholder="Dirección"
          style="margin-bottom: 14px;"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="room" size="1.4rem"/>
          </template>
        </q-input>

      <q-input
          dense
          outlined
          v-model="suc_ubicacion "
          type="text"
          placeholder="Ciudad"
          style="margin-bottom: 14px;"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="my_location" size="1.3rem"/>
          </template>
        </q-input>

        <q-input
          outlined
          dense
          v-model="suc_responsable"
          type="text"
          placeholder="Encargado"
          style="margin-bottom: 14px; border-color:red;"
        >
          <template v-slot:prepend>
            <q-icon name="person_pin" size="1.4rem"/>
          </template>
        </q-input>

        <q-input
          outlined
          dense
          v-model="suc_referencia"
          type="text"
          placeholder="Referencia"
          style="margin-bottom: 14px;"
        >
          <template v-slot:prepend>
            <q-icon name="gps_not_fixed" size="1.4rem"/>
          </template>
        </q-input>

        <q-input
          outlined
          disable
          dense
          v-model="suc_celular"
          type="text"
          placeholder="Numero Sucursal"
          style="margin-bottom: 14px; border-color:red;"
        >
          <template v-slot:prepend>
            <q-icon name="phone" size="1.4rem"/>
          </template>
        </q-input>

        <div style="widht: 100%; display:flex;">
            <button class="buttonCancelar" @click="Cancelar" >Cancelar</button>
            <button class="buttonUsuario" type="submit">Guardar</button>
        </div>


      </div>
     </form>
  </div>

  </q-drawer>

</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import ResponsableLocal from "../../components/usuarios/UsuarioModal.vue"

export default {
  components: { ResponsableLocal },
  setup() {
    const $q = useQuasar();
    const $qq = useQuasar();

    const filter = ref('')
    const filterRef = ref(null)

    const children= ref([ ])

    const simple = ref([
      {
        label: 'Region Puno',
        children
      },

    ])
    return {


      visible:ref(false),
      password: ref(""),
      isPwd: ref(true),
      drawerRight: ref($q.screen.width > 500),
      splitterModel: ref(290),
      selected: ref('Region Puno'),
      children,
      filter,
      filterRef,
      simple,

      resetFilter () {
        filter.value = ''
        filterRef.value.focus()
      },

      SucursalAgregadaNoty () {
        $qq.notify({
          position:'top-right',
          type: 'positive',
          message: 'Sucursal Agregada!!.'
        })
      },
      SucursalActualizada() {
        $qq.notify({
          position:'top-right',
          color: 'secondary',
          message: 'Sucursal Actualizada!!.'
        })
      },
      SucursalEliminadaNoty () {
        $qq.notify({
          position:'top-right',
          color: 'negative',
          message: 'Sucursal Eliminada!!.'
        })
      },
    };
  },

  data() {

    return {
      puno : 'Region Puno',
      seleccionado:'Region Puno',
      editar:false,
      editarID: 0,
      file: null,
      path:"http://localhost:8000/sucursal/",
      suc_nombre: "",
      suc_direccion:"",
      suc_ubicacion:"",
      suc_responsable: "",
      suc_referencia:"",
      suc_foto:null,

      sucursalesLabel: [],
      sucursales:[],
    };
  },
  created() {

  },
  mounted(){
    let t = localStorage.getItem('token');
    this.ObtenerSucursales(t);
  },
  methods: {
    //OBTENER SUCURSALE
    ObtenerSucursales(t) {
        let token = localStorage.getItem('token');
        let su =""
        if (localStorage.getItem('s') != null){
          su = localStorage.getItem('s')
        }
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          params: {
            buscar: su
          }
        };
        axios.get('http://localhost:8000/admin/sucursales', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let results = [];
            let resultSucursales = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              results.push({label:item.suc_nombre, icon: 'store'});
              resultSucursales.push(
                {
                  id: item.id,
                  label: item.suc_nombre,
                  direccion: item.suc_direccion,
                  ubicacion: item.suc_ubicacion,
                  responsable: item.suc_responsable,
                  referencia: item.suc_referencia,
                  imagen: item.suc_foto,
                  foto: "http://localhost:8000/sucursales/"+item.suc_foto,
                  icon: 'store'}
                );
            }
            this.sucursales = resultSucursales
            this.sucursalesLabel = results
            this.seleccionado = this.sucursalesLabel[0].label

          }

        })

    },

    AgregarSucursal() {
      const formdata = new FormData()
      formdata.append('suc_nombre', this.suc_nombre)
      formdata.append('suc_direccion', this.suc_direccion)
      formdata.append('suc_ubicacion', this.suc_ubicacion)
      if( this.suc_responsable != ""){
        formdata.append('suc_responsable', this.suc_responsable)
      }
      formdata.append('suc_referencia', this.suc_referencia)
      formdata.append('suc_foto', this.file)
      let url = "http://localhost:8000/admin/sucursales"
      let token = localStorage.getItem('token');
      const config = {
          'accept': 'application/json',
          headers: { Authorization: `Bearer ${token}` }
      };
      axios.post(
        url,
        formdata,
        config
      )
      .then(response => {
        if(response.status == 200) {
            console.log(response.data);
            this.SucursalAgregadaNoty()
            this.ObtenerSucursales(token)
            this.seleccionado = this.suc_nombre
            this.Limpiar()
        }else {
          this.msgError = "Usuario o contraseña Incorrecto"
          console.log(response.status);
        }
      })

    },

    EditarSucursal() {
      const id = this.editarID
      const formdata = new FormData()
      formdata.append('suc_nombre', this.suc_nombre)
      formdata.append('suc_direccion', this.suc_direccion)
      formdata.append('suc_ubicacion', this.suc_ubicacion)
      if( this.suc_responsable != ""){
        formdata.append('suc_responsable', this.suc_responsable)
      }
      formdata.append('suc_referencia', this.suc_referencia)
      formdata.append('suc_foto', this.file)
      formdata.append('_method', 'PUT')
      let url = `http://localhost:8000/admin/sucursales/${id}`
      let token = localStorage.getItem('token');
      const config = {
          accept: 'application/json',
          headers: { Authorization: `Bearer ${token}` }
      };
      axios.post(
        url,
        formdata,
        config
      )
      .then(response => {
        if(response.status == 200) {
            console.log(response.data);
            this.SucursalActualizada()
            this.seleccionado = this.suc_nombre
            this.Limpiar()
            this.ObtenerSucursales(token)
            this.editar = false
        }else {
          this.msgError = "Usuario o contraseña Incorrecto"
          console.log(response.status);
        }
      })

    },

    EliminarSucursal(id) {
      let token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      axios.delete(`http://localhost:8000/admin/sucursales/${id}`, config)
      .then(response => {
        console.log(response)
        this.seleccionado = 'Region Puno'
        this.SucursalEliminadaNoty()
        this.ObtenerSucursales(token)
      })
    },

    abrirEditar( item ) {
      this.editar = true
      this.editarID = item.id
      this.suc_nombre = item.label
      this.suc_direccion = item.direccion
      this.suc_ubicacion = item.direccion
      this.suc_responsable = item.responsable
      this.suc_foto = item.foto
      this.suc_referencia = item.referencia
    },
    //BUSCAR IMAGEN
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
        this.suc_foto = e.target.result;
      };
    },
    //BORRAR DATOS
    Limpiar (){
      this.suc_nombre = "",
      this.suc_direccion = "",
      this.suc_ubicacion = "",
      this.suc_responsable = "",
      this.suc_referencia = "",
      this.suc_foto = null,
      this.file = null
    },

    Cancelar() {
      this.Limpiar()
      this.editar = false
    }

  },
};
</script>

<style>

.buttonUsuario {
  font-family: "Asap", sans-serif;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  width: 100%;
  border: 0;
  padding: 10px 0;
  margin-bottom: 8px;
  margin-left: 0px;
  border-radius: 5px;
  background-color: #000000D9;
  -webkit-transition: background-color 300ms;
  -moz-transition: background-color 300ms;
  transition: background-color 300ms;
}
.buttonUsuario:hover {
  background-color: #131313;
  color: #b31b00;
  font-weight: 700;
}

.buttonCancelar {
  font-family: "Asap", sans-serif;
  cursor: pointer;
  color: #000000D9;
  font-size: 1rem;
  width: 100%;
  border: 2px solid #000000D9;
  padding: 10px 0;
  margin-bottom: 8px;
  margin-right: 5px;
  border-radius: 5px;
  transition: background-color 300ms;
}
.buttonCancelar:hover {
  border: 2px solid #252880;
  color: #252880;
  font-weight: 700;
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

.sucEditar{
  cursor: pointer;
  display: flex;
  background:#252880;
  padding:5px 16px;
  border-radius:5px;
  margin-left:-3px;
  color: white;
  align-items:center;
  border: none;
}
.sucEditar:hover{
  background:#252840;
}

.sucEliminar{
  cursor: pointer;
  display: flex;
  margin-left: 10px;
  background:#c41235;
  padding:5px 16px;
  border-radius:5px;
  color: white;
  align-items:center;
  border: none;
}
.sucEliminar:hover{
  background:#970925;
}
/** end input file */
</style>

