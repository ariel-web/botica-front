<template>
  <div class="wrapper">
    <div class="container">
      <div class="top">
        <img :src="props.foto" height="180" alt="" @click="card = true" />
      </div>
      <div class="bottom">
        <div class="left">
          <div class="details">
            <div
              style="
                font-size: 1rem;
                margin-top: -20px;
                font-weight: 700;
                margin-left: -10px;
              "
            >
              Nombre
            </div>
            <div
              style="
                font-size: 0.7rem;
                margin-top: -5px;
                font-weight: 400;
                margin-left: -10px;
              "
            >
              Administrador
            </div>
          </div>
          <div class="buy">
            <q-btn
              flat
              round
              dense
              icon="edit"
              style="
                margin-top: 2px;
                margin-left: 3px;
                font-size: 0.9rem;
                background: #f3f3f3;
              "
              @click="drawerRight2 = !drawerRight2"
            />
          </div>
        </div>
        <div class="right">
          <div class="done"><i icon="person_add" /></div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-img src="../../assets/imagenes/perfil2.jpg"/>

      <q-card-section>
        <q-btn
          fab
          color="negative"
          icon="favorite"
          class="absolute"
          style="
            top: 0;
            font-size: 1.1rem;
            right: 12px;
            transform: translateY(-50%);
          "
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ props.nombre }} - {{ props.rol }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="margin-top: -15px">
        <div class="text-subtitle1">
          {{ props.email }}
        </div>
        <div class="text-caption text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Contarme" />
        <q-btn v-close-popup flat color="primary" round icon="call" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-drawer
    side="right"
    v-model="drawerRight2"
    bordered
    :width="290"
    :breakpoint="500"
    behavior="desktop"
    class="bg-white"
  >
    <div class="q-px-md">
      <form class="login">
        <q-btn flat round dense icon="clear" class="drawerDerecho" @click="drawerRight2 = !drawerRight2" />
        <p
          style="
            font-size: 1.3em;
            text-align: center;
            margin-bottom: 25px;
            margin-top: 10px;
          "
        >
          Editar Empleado
        </p>

        <!-- input  file -->

        <div class="container-input">
          <label for="file-6">
            <div
              style="
                display: flex;
                justify-content: center;
                margin-top: -20px;
                margin-bottom: 20px;
              "
            >
              <q-img :src="EdatoImagen" height="180">
                <div class="absolute-bottom img-bottom-input">
                  <q-btn class="container-file-input">
                    <label class="texto-file-input">Cambiar Foto</label>
                    <input
                      type="file"
                      class="custom-file-input"
                      data-multiple-caption="{count} archivos seleccionados"
                      @change="EbuscarImagen($event)"
                    />
                  </q-btn>
                </div>
              </q-img>
            </div>
          </label>
        </div>
        <!-- end input file -->

        <q-input
          label="Ingresar nombre"
          outlined
          v-model="usuario.Enombre"
          type="text"
          placeholder="Nombre"
          style="margin-bottom: 16px"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          label="Ingresar apellidos"
          outlined
          v-model="usuario.Enombre"
          type="text"
          placeholder="Apellidos"
          style="margin-bottom: 16px"
          class="inputUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          outlined
          label="Ingresa tu correo"
          v-model="usuario.Eemail"
          type="email"
          placeholder="Email"
          style="margin-bottom: 16px"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-select
          outlined
          :options="oficios"
          v-model="usuario.Eoficio"
          label="Selecciona el oficio"
          placeholder="Contraseña"
        >
          <template v-slot:prepend>
            <q-icon name="portrait" />
          </template>
        </q-select>

        <button class="buttonUsuario" @click.prevent="EditarDatos()">
          Guardar Cambios
        </button>
      </form>
    </div>
  </q-drawer>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  props: ["props","ruta"],
  name: "Upload",
  setup() {
    const $q = useQuasar();
    return {
      showing: ref(false),
      isPwd: ref(true),

      drawerRight2: ref($q.screen.width < 500),

      carousel: ref(false),
      card: ref(false),
      sliders: ref(false),

      slide: ref(1),

      stars: ref(3),

      slideVol: ref(39),
      slideAlarm: ref(56),
      slideVibration: ref(63),
      oficios: [
        'Ingeniero', 'Arquitecto', 'Operario', 'Administrador', 'Tecnico', 'Obrero'
      ],
    };
  },

  data() {
    return {
      estado:true,
      actualizar:"false",
      file: null,
      EdatoImagen: this.props.foto,
      usuario: {
        Eid: this.props.uid,
        Enombre: this.props.nombre,
        Eemail: this.props.email,
        Epassword: this.props.password,
        Eoficio: this.props.oficio,

      },
    };
  },
  methods: {

    // BUSCAR IMAGEN
    EbuscarImagen(event2) {
      const tipoArchivo = event2.target.files[0].type;
      if (tipoArchivo === "image/jpeg" || tipoArchivo === "image/png") {
        this.file = event2.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no válido";
        this.file = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.EdatoImagen = e.target.result;
      };
      console.log(this.$parent.usuarios);
    },

    // SUBIR IMAGEN STORAGE
    async EditarDatos() {
      try {
        if( this.file !== null ){

          this.loading = true;
          var storageRef = firebase.storage().ref();
          await storageRef
            .child("imagenes/usuarios")
            .child(this.file.name)
            .put(this.file);
          const urlDescarga = await storageRef
            .child("imagenes/usuarios")
            .child(this.file.name)
            .getDownloadURL();

          await db
          .collection("usuarios")
          .doc(this.usuario.Eid)
          .update({
            nombre: this.usuario.Enombre,
            email: this.usuario.Eemail,
            password: this.usuario.Epassword,
            oficio: this.usuario.Eoficio,
            foto: urlDescarga,
          })
          .then(function () {
            console.log("Frank food updated");
          });
        console.log("ACTUALIZADO CON IMAGEN!!");
        }
        else {
        await db
          .collection("usuarios")
          .doc(this.usuario.Eid)
          .update({
            nombre: this.usuario.Enombre,
            email: this.usuario.Eemail,
            password: this.usuario.Epassword,
            oficio: this.usuario.Eoficio,
          })
          .then(function () {
            console.log("Frank food updated");
          });

        console.log("ACTUALIZADO SIN IMAGEN!!");
        }
      } catch (error) {
        console.log(error);
      }
      return this.$emit('stateUser', this.estado);
    },
  },
};
</script>

<style scoped>
.img-bottom-input {
  height: 50px;
  padding: 0px;
}

.texto-file-input {
  text-align: center;
  color: white;
}
.container-file-input {
  position: relative;
  width: 100%;
  height: 50px;
  margin-top: 0px;
  background: #000000a8;
}
.custom-file-input {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.nombreUsu {
  margin-left: -10px;
  background: black !important;
  color: white;
}
/*** CARD ***/
.wrapper {
  width: 140px;
  height: 200px;
  background: white;
  margin: auto;
  position: relative;
  overflow: hidden;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;
}
.wrapper:hover {
  transform: scale(1);
  box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
}
.wrapper .container {
  width: 100%;
  height: 100%;
}
.wrapper .container .top {
  height: 80%;
  width: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -o-background-size: 100%;
  background-size: 100%;
}
.wrapper .container .bottom {
  width: 200%;
  height: 20%;
  background: red;
  transition: transform 0.5s;
}

.wrapper .container .bottom .left {
  height: 100%;
  width: 50%;
  background: #f4f4f4;
  position: relative;
  float: left;
}
.wrapper .container .bottom .left .details {
  padding: 20px;
  float: left;
  width: calc(70% - 40px);
}
.wrapper .container .bottom .left .buy {
  float: right;
  width: calc(30% - 2px);
  height: 100%;
  transition: background 0.5s;
  border-left: solid thin rgba(0, 0, 0, 0.1);
}
.wrapper .container .bottom .left .buy i {
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 25px;
  padding-top: 7.5px;
  color: #000000;
  transition: transform 0.9s;
}

.wrapper .container .bottom .right {
  width: 50%;
  background: #a6cdde;
  color: white;
  float: right;
  height: 200%;
  overflow: hidden;
}
.wrapper .container .bottom .right .details {
  padding: 20px;
  float: right;
  width: calc(70% - 40px);
}
/***** */

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

.inputfile-6:focus + label,
.inputfile-6.has-focus + label,
.inputfile-6 + label:hover {
  color: #9f8465;
}

.inputfile-6 + label figure {
  width: 70%;
  height: 145px;
  background-color: #0a0a0a80;
  justify-content: center;
  text-align: center;
  padding: 35px;
  margin-top: -20px;
}

.inputfile-6:focus + label figure,
.inputfile-6.has-focus + label figure,
.inputfile-6 + label:hover figure {
  background-color: #0062ff;
}

.inputfile-6 + label svg {
  width: 100%;
  height: 100%;
  fill: #fff;
}
/** end input file */
</style>
