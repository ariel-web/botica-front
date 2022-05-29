<template>
  <div>
  <q-btn flat round dense icon="add" class="openModal"  @click="modalAgregar = true" />
    <q-dialog
      v-model="modalAgregar"
      full-width
    >
    <div>
    <form class="agregarsucursal" @submit.prevent="AgregarProducto()" enctype="multipart/formdata">

      <div style="margin-left:270px; border-bottom: 4px solid crimson; border-radius:15px; overflow:hidden; ">
        <div style="display:flex; background:white;">

          <!-- MODAL ADD LADO DERECHO -->
          <div style="width:350px; height:545px; background:white; padding-left:20px; padding-right:20px; padding-top:20px; ;  "  >
            <div style="position:relative; height:40px; margin-top:-8px; border-bottom:0px solid crimson;">
              <span style="font-weight:500; color:white; font-size:1.3rem; ">&nbsp;</span>
            </div>
            <!-- input  file -->
            <div class="container-input" style="display:flex; justify-content:center; align-content:center;">
              <input type="file" name="file-5" id="file-5" class="inputfile inputfile-5" @change="buscarImagen($event)" />
              <label for="file-5">
                <div v-if="foto !== null" style="display:flex; justify-content:center;  margin-bottom: 16px; margin-top:-16px; overflow:hidden; border-radius:5px; height:240px; width:240px; border: 0.5px solid #f2f2f2; padding:20px;">
                  <img :src="foto" height="200" style="border-radius:5px;" />
                </div>
                <div v-else style="display:flex; justify-content:center; text-align:center;  align-items:center; margin-bottom: 16px; margin-top:-16px; overflow:hidden; border-radius:5px; height:240px; width:240px; border: 0.5px solid #f2f2f2; background:white; padding: 20px;">
                  <div style="position:relative; cursor:pointer;">
                    <img src="../../assets/imagenes/VitaPyrena.jpg" width="200" style="border-radius:15px;"  />
                    <div style="position:absolute; height:50px; bottom:0; width:100%; display:flex; align-items:center; justify-content:center; ">
                      <p style="color:black; font-weight:500; background:#00000021; padding:5px 10px;">Cambiar Imagen</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <!-- end input file -->

            <span style="margin-botttom:3px;">Nombre del producto: {{prod_nombre}}</span>
            <q-input
              color="negative"
              bg-color="white"
              dense
              outlined
              type="text"
              v-model="prod_nombre"
              placeholder="nombre"
              style="margin-bottom: 16px; margin-top:5px;"
              class="inputUsuario"
            >
              <template v-slot:prepend>
                <q-icon name="keyboard" color="negative" size="1.2rem"/>
              </template>
            </q-input>

            <span style="margin-botttom:3px;">Categoría: {{prod_categoria}}</span>
            <q-select
              color="negative"
              dense
              outlined
              v-model="prod_categoria"
              :options="categorias"
              emit-value
              map-options
              style="margin-top:5px; margin-bottom:16px;"
              >
              <template v-slot:prepend>
                <q-icon name="category" color="negative" size="1.2rem"/>
              </template>
                <template v-slot:option="{ itemProps, opt, selected }">
                  <q-item v-bind="itemProps">
                      <q-icon name="category" color="negative" size="1rem"/>
                      <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
                  </q-item>
                </template>
            </q-select>

            <span style="margin-botttom:3px;">Sucursal: {{prod_sucursal}}</span>
            <q-select
              color="negative"
              dense
              outlined
              v-model="prod_sucursal"
              :options="sucursales"
              emit-value
              map-options
              style="margin-top:5px; margin-bottom:16px;"
              >
              <template v-slot:prepend>
                <q-icon name="store" color="negative" size="1.2rem"/>
              </template>
                <template v-slot:option="{ itemProps, opt, selected }">
                  <q-item v-bind="itemProps">
                      <q-icon name="store" color="negative" size="1rem"/>
                      <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
                  </q-item>
                </template>
            </q-select>


          </div>

          <div style="width:700px; background:white">
            <div style=" padding:20px;">
              <div style="position:relative; height:40px; border-bottom:0.1em solid crimson;">
                <span style="font-weight:500; color:black; font-size:1.3rem; ">Nuevo Producto</span>
                <span class="cerrarModal" v-close-popup>x</span>
              </div>


              <div style="display:flex; margin-bottom:-10px; margin-top:10px;" >

                <div style="width:33.3%; padding-right:10px;">
                  <span style="color:black; margin-bottom:15px;">Stock en unidades: {{ prod_stock  }}</span>
                     <q-input
                      color="negative"
                      dense
                      text-align
                      outlined
                      type="number"
                      v-model="prod_stock"
                      placeholder="Nombres"
                      style="margin-bottom: 16px; margin-top:3px;"
                      class="inputUsuario"
                    >
                      <template v-slot:prepend>
                        <q-icon name="keyboard" color="negative" size="1.2rem"/>
                      </template>
                    </q-input>
                </div>

                <div style="width:33.3%; padding-right:10px;">
                  <span style="color:black; margin-bottom:15px;">Stock minimo: {{ prod_stock_min  }}</span>
                     <q-input
                      color="negative"
                      dense
                      text-align
                      outlined
                      type="number"
                      v-model="prod_stock_min"
                      placeholder="Nombres"
                      style="margin-bottom: 16px; margin-top:3px;"
                      class="inputUsuario"
                    >
                      <template v-slot:prepend>
                        <q-icon name="keyboard" color="negative" size="1.2rem"/>
                      </template>
                    </q-input>
                </div>

                <div style="width:33.3%; padding-right:10px;">
                  <span style="color:black; margin-bottom:15px;">Stock máximo: {{ prod_stock_max  }}</span>
                     <q-input
                      color="negative"
                      dense
                      text-align
                      outlined
                      type="number"
                      v-model="prod_stock_max"
                      placeholder="Nombres"
                      style="margin-bottom: 16px; margin-top:3px;"
                      class="inputUsuario"
                    >
                      <template v-slot:prepend>
                        <q-icon name="keyboard" color="negative" size="1.2rem"/>
                      </template>
                    </q-input>
                </div>


              </div>


              <div style=" width:100%; display:flex;">
                <div style="width:50%; padding-right: 20px; padding-top:10px;">
                  <span style="color:black; margin-bottom:15px;">Dosis: {{prod_dosis}} </span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="prod_dosis"
                    placeholder="Ejem. 400mg "
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Activo {{prod_activo}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="prod_activo"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>
                </div>


                <div style="width:50%; padding-top:10px; padding-left:10px;">
                  <span style="color:black; margin-bottom:15px;">Via de administración: {{prod_via}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="prod_via"
                    placeholder="Ejem. Oral"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Fecha de vencimiento: {{prod_ven}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="date"
                    v-model="prod_ven"
                    placeholder="Cel Numero"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                </div>

              </div>

              <div style="display:flex;">

                <div style="width: 66.6%; margin-right:16px;">
                  <span style="color:black; margin-bottom:15px;">Laboratorio: {{prod_lab}}</span>
                    <q-input
                      color="negative"
                      dense
                      outlined
                      type="text"
                      v-model="prod_lab"
                      placeholder="Ejem. Portugal S.R.C."
                      style="margin-bottom: 16px; margin-top:3px;"
                      class="inputUsuario"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person_pin" color="negative" size="1.2rem"/>
                      </template>
                    </q-input>
                  </div>

                  <div style="width: 33.3%;">
                    <span style="color:black; margin-bottom:15px;">descuento: {{prod_descuento}}</span>
                      <q-input
                        color="negative"
                        dense
                        outlined
                        type="text"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        v-model="prod_descuento"
                        input-class="text-right"
                        placeholder="Ejem. Portugal S.R.C."
                        style="margin-bottom: 16px; margin-top:3px;"
                        class="inputUsuario"
                      >
                        <template v-slot:prepend>
                          <q-icon name="keyboard" color="negative" size="1.2rem"/>
                        </template>
                      </q-input>
                  </div>

              </div>


              <div class="q-gutter-sm" style="margin-top:10px; display:flex;">
                <div style="width: 100%">
                  <span style="margin-bottom:15px;">Descripcion: {{prod_descripcion}}</span>
                  <q-editor v-model="prod_descripcion" min-height="5rem" />
                </div>

                <div style="width:33.3%; padding-right:0px; margin-top:28px;">
                  <q-btn outline style="color: crimson;"  label="Agregar Precios" no-caps class="full-width" @click="modalPrecios = true" />
                  <q-btn color="negative" type="submit" label="Guardar" no-caps class="full-width" style="margin-top:16px;" />
                </div>

              </div>

            </div>
          </div>

        </div>


          <!-- <q-btn flat label="OK" v-close-popup /> -->

      </div>

    </form>
    </div>
  </q-dialog>

  <q-dialog
    v-model="modalPrecios"
  >
  <div style="width: 600px; background:white; display:flex; position:relative;">
    <div class="q-px-md" >
       <div style=" padding-top:30px;">
        <p
          style="
            font-size: 1.3em;
            text-align: left;
            margin-bottom: 10px;
            margin-top: -10px;
          "
        >
        <span style="font-size:1.2rem">+ </span> Agregar Precio
        </p>

          <span style="color:black; margin-bottom:15px;">Presentación: {{pre_presentacion}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="text"
            v-model="pre_presentacion"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="keyboard" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <span style="color:black; margin-bottom:15px;">Cantidad: {{pre_cantidad}}</span>
          <q-input
            color="negative"
            dense
            outlined
            mask="#####"
            type="text"
            v-model="pre_cantidad"
            input-class="text-right"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="keyboard" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <span style="color:black; margin-bottom:15px;">Precio: {{pre_precio}}</span>
          <q-input
            color="negative"
            dense
            outlined
            type="text"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask

            input-class="text-right"
            v-model="pre_precio"
            style="margin-bottom: 16px; margin-top:3px;"
            class="inputUsuario"
          >
            <template v-slot:prepend>
              <q-icon name="keyboard" color="negative" size="1.2rem"/>
            </template>
          </q-input>

          <q-btn no-caps  outline class="full-width" color="negative" style="margin-top:10px; margin-bottom:30px; border-radius:5px; padding:9px;" @click="addPrecio">Agregar precio</q-btn>
      </div>

    </div>

    <div style="width:70%; height:300px; padding:20px; ">
      <div style="margin-bottom:10px;">
        <span style="font-size:1.2rem;" >Precios</span>
      </div>
      <div style="display:flex; margin-bottom:10px;" >
        <div style="width:33.3%;"><span style="font-weight:500;"> Presentación </span> </div>
        <div style="width:33.3%;"><span style="font-weight:500;"> Cantidad </span> </div>
        <div style="width:33.3%;"><span style="font-weight:500;"> Precio </span> </div>
      </div>
      <div v-for="(item, index) in precios" :key="index" style="display:flex;  width:100%; height: 30px; ">
        <div style="width:33.3%;"> {{item.presentacion}}  </div>
        <div style="width:33.3%;"> {{item.cantidad}}  </div>
        <div style="width:33.3%; display:flex; justify-content:center; items-align:center;">
          <div style="width:70px !important; "> <span>{{item.precio}}</span> </div>
          <q-icon name="clear" class="remove-precio" @click="deletePrecio(item)"/>
        </div>
      </div>
    </div>

    <div style=" position:absolute; bottom:29px; right:20px;">
       <q-btn no-caps  class="full-width" color="negative" style=" border-radius:5px; padding:9px 30px; " @click="modalPrecios = false">Guardar Precios</q-btn>
    </div>

  </div>

  </q-dialog>


</div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
export default {

  setup() {
    const $q = useQuasar();
    return {
      modalAgregar: ref(false),
      modalPrecios: ref(false),

      NotyfiVarios(mensaje, color) {
        $q.notify({
          position:'top-right',
          color:color,
          message: mensaje
        })
      },
    };
  },

  data() {

    return {
      editor:"",

      estado: false,

      prod_categoria:null,
      prod_stock:0,
      prod_stock_min:0,
      prod_stock_max:0,
      prod_nombre:"",
      prod_activo:"",
      prod_dosis:"",
      prod_ven:"",
      prod_via:"",
      prod_lab:"",
      prod_descuento:null,
      prod_descripcion:"",
      prod_sucursal:"",

      precios:[],
      pre_presentacion:"",
      pre_cantidad:0,
      pre_precio:null,

      sucursales:[],

      categorias:[],
      pro_categoria:"",
      foto :null,
      file:null,
    };
  },
  created() {
    this.ObtenerSucursales()
    this.ObtenerCategorias()
    this.prod_categoria = localStorage.getItem('s')
  },
  mounted(){
    this.prod_categoria = localStorage.getItem('s')
  },
  methods: {

    ObtenerCategorias() {
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
        axios.get('http://localhost:8000/admin/categorias', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let resultSucursales = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              resultSucursales.push(
                {
                  label: item.cat_nombre.trim(),
                  value: item.id,
                }
              );
            }
            this.categorias = resultSucursales
            this.prod_categoria = resultSucursales[0].value
          }

        })

    },

    ObtenerSucursales() {
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
            let resultSucursales = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              resultSucursales.push(
                {
                  label: item.suc_nombre.trim(),
                  value: item.id,
                }
              );
            }
            this.sucursales = resultSucursales
            this.prod_sucursal = resultSucursales[0].value
          }

        })

    },

    AgregarCategoria() {

      const formdata = new FormData()
      formdata.append('cat_nombre', this.cat_nombre),
      formdata.append('prod_categoria', this.prod_categoria)

      let url = "http://localhost:8000/admin/categorias"
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
        }else {
          console.log(response.status);
        }
      }).catch(error => {
          console.log(error.response.data)
        // this.NotyfiVarios("El Usuario ya Existe", "negative")
      })
      this.estado = true;
      return this.$emit('cambiarEstado', this.estado);

    },

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
        this.foto = e.target.result;
      };
    },

    AgregarProducto() {

      const formdata = new FormData()
      formdata.append('pro_idSucursal',this.prod_sucursal),
      formdata.append('pro_nombre', this.prod_nombre),
      formdata.append('pro_idCategoria', this.prod_categoria),
      formdata.append('pro_stock',this.prod_stock),
      formdata.append('pro_descuento', this.prod_descuento),
      formdata.append('pro_stock_minimo',this.prod_stock_min),
      formdata.append('pro_stock_maximo', this.prod_stock_max),
      formdata.append('pro_dosis', this.prod_dosis),
      formdata.append('pro_viaAdministracion', this.prod_via),
      formdata.append('pro_activo', this.prod_activo),
      formdata.append('pro_laboratorio', this.prod_lab),
      formdata.append('pro_descripcion', this.prod_descripcion),
      formdata.append('pro_vencimiento', this.prod_ven),
      formdata.append('precios', JSON.stringify(this.precios))

      if( this.file != null ){
        formdata.append('pro_foto', this.file)
      }

      let url = "http://localhost:8000/admin/productos"
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
            this.NotyfiVarios("Producto Guardado", "positive");
            this.modalAgregar = false;
        }else {
          console.log(response.status);
        }
      }).catch(error => {
          console.log(error.response.data)
        // this.NotyfiVarios("El Usuario ya Existe", "negative")
      })
      this.estado = true;
      return this.$emit('cambiarEstado', this.estado);

    },

    addPrecio() {
      this.precios.push(
        {
          presentacion:this.pre_presentacion,
          cantidad:this.pre_cantidad,
          precio:this.pre_precio
        }
      )
    },
    deletePrecio (i) {
      this.precios = this.precios.filter(item => item !== i)
    },

  },
};
</script>

<style scoped>
.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.inputNumero {
  width: 70px;

}

.cerrarModal {
  font-weight:500; color:#0000009D;
  font-size:1.3rem;
  position:absolute;
  right:10px; top:-5px;
  cursor: pointer;
}
.cerrarModal:hover {
  font-weight:500;
  color:crimson;
}

.remove-precio{
  margin-top:3px;
  color:gray;
  cursor: pointer;

}
.remove-precio:hover{
  color:red;
}

</style>

