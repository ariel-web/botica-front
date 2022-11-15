<template>

  <div class="q-px-xl">
    <form class="login" @submit.prevent="login">
      <div>
        <img src="../../assets/logo-oscuro2.png" width="260" height="90" alt="">
      </div>
      <p
        style="
          font-weight:700;
          font-size: 1.3rem;
          text-align: center;
          margin-bottom: 16px;
          margin-top: -10px;
        "
      >
        Ingresar al Sistema
      </p>

      <q-input
        class="bg-grey-4"
        borderless
        v-model="usuario.usuario"
        type="text"
        placeholder="Usuario"
        style="margin-bottom: 16px; padding-left:10px; color:black"
      >
        <template v-slot:prepend>
          <q-icon name="person" color="negative"/>
        </template>
      </q-input>

      <q-input
        class="bg-grey-4"
        borderless
        v-model="usuario.contra"
        :type="isPwd ? 'password' : 'text'"
        placeholder="Contraseña"
        style=" padding-left:10px; padding-right:10px;"
      >
        <template v-slot:prepend>
          <q-icon name="lock" color="negative" />
        </template>
        <template v-slot:append>
          <q-icon
            style="cursor:pointer;"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div style="margin-top:16px;" v-if="msgError != ''"> <span style="color:crimson" > {{msgError}} </span> </div>

        <div class="column items-center">
          <div
            v-ripple.early
            class="relative-position text-white"
          >
            <button class="butLogin"> INGRESAR </button>
          </div>
        </div>


      <div style="text-align: center">
        <span style="margin-bottom: 36px; font-weight: 700"
          >Olvidé mi Contraseña</span
        >
        <span
          style="margin-bottom: 36px; color: #ffffff; font-weight: 700"
        ></span>
      </div>
    </form>

  </div>

</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar, QSpinnerTail } from 'quasar'

export default {
  setup () {
    const $q = useQuasar();
    const $r = useQuasar();

    function showCustom () {
      const dialog = $q.dialog({
        title: 'Cangando datos ...',
        dark: true,
        message: '0%',
        progress: {
          spinner: QSpinnerTail,
          color: 'negative',
        },
        persistent: true, 
        ok: false 
      })

      let percentage = 0
      const interval = setInterval(() => {
        percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

        dialog.update({
          message: `${percentage}%`
        })

        if (percentage === 100) {
          clearInterval(interval)
          setTimeout(() => {
            dialog.hide()
          }, 200)
        }
      }, 200)
    }

    return {
      showCustom,
      ErrorNoty(mensaje, color) {
        $r.notify({
          position:'bottom',
          color: color,
          message: mensaje
        })
      },
      }
  },

  data () {
    return {
      isPwd:true,
      msgError:"",
      usuario: {
        usuario: "ariel",
        contra:"ariel",
      },
    };

  },
  methods: {

    login() {
      let url = "http://localhost:8000/oauth/token"
      let t = null;
      var usuario = {
        "grant_type" : "password",
        "client_id":2,
        "client_secret":"tGl1JcPsK4rgLUm4RtrnzNd3AEKNWnAvEkK5qpLO",
        "username":this.usuario.usuario,
        "password":this.usuario.contra
      }
      axios.post(url, usuario)
      .then(response => {
        if(response.status == 200) {
            console.log(response);
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('r_token', response.data.refresh_token)
            t = response.data.access_token;
            this.showCustom();
            this.$router.push('/');

        }
      }).catch(error => {
        console.log(error.message)
        this.ErrorNoty("Usurio no registrado o bloqueado", "negative")
      })

    },

    Logeado(){
      if(localStorage.getItem('token')){
        this.$router.push('/');
      }
    }
  },
  mounted(){
    this.Logeado();
  }

};

</script>

<style scoped>

.login {
  overflow: hidden;
  background-color: #f2f2f28B;
  padding: 20px 30px 30px 30px;
  border: solid 1px #00000021;
  border-radius: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 330px;
  height: 420px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.login::before,
.login::after {
  content: "";
  position: absolute;
  width: 700px;
  height: 700px;
  border-top-left-radius: 40%;
  border-top-right-radius: 45%;
  border-bottom-left-radius: 35%;
  border-bottom-right-radius: 40%;
  z-index: -1;
}
.login::before {
  left: 40%;
  bottom: -135%;
  background-color: #b60c14;
  -webkit-animation: wawes 6s infinite linear;
  -moz-animation: wawes 6s infinite linear;
  animation: wawes 6s infinite linear;
}
.login::after {
  left: -5%;
  bottom: -150%;
  background-color: #97818171;
  -webkit-animation: wawes 7s infinite;
  -moz-animation: wawes 7s infinite;
  animation: wawes 7s infinite;
}

.butLogin {
  font-family: "Asap", sans-serif;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
  width: 100%;
  border: 0;
  padding: 10px 20px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  border-radius: 5px;
  background-color: #b40413ea;
  -webkit-transition: background-color 300ms;
  -moz-transition: background-color 300ms;
  transition: background-color 300ms;
}
.butLogin:hover {
  color: crimson;
  background-color: #131313;
}

@-webkit-keyframes wawes {
  from {
    -webkit-transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes wawes {
  from {
    -moz-transform: rotate(0);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@keyframes wawes {
  from {
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
a {
  text-decoration: none;
  color: #ffffff99;
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
}
</style>
