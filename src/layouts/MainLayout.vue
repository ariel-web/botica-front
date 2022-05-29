<template>
  <q-layout view="lHh LpR fFf">
    <q-header class="text-dark " height-hint="58" style="background:white; padding-bottom:10px; height:55px; box-shadow: #00000015 0.95px 0.95px 1.6px; border-bottom: solid 0.5px #3f747414 ;">
      <q-toolbar>
        <div>
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
            color="grey-9"
          />
        </div>
        <q-btn flat no-caps no-wrap class="q-ml-xm">
          <q-toolbar-title shrink class="text-weight-bold ">
            {{ tituloHeader }}
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-5" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn round flat>
            <q-icon name="search" color="grey-5" size="27px" />
          </q-btn>
            <PerfilUsuarioII/>
            <DropDown/>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="270"
      :breakpoint="500"
    >
      <q-scroll-area class="fit draweColor">
        <q-list padding>
          <q-item clickable>
            <q-item-section side>
                <img src="../assets/logo-claro.png" width="230" height="85" >
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md bg-grey-9" style="margin-bottom: 10px" />

          <q-item clickable v-ripple>
            <PerfilUsuario/>
          </q-item>
          <q-separator
            class="q-my-md bg-grey-9"
            style="margin-top: 10px; margin-bottom: 10px"
          />
          <q-item
            v-for="item in links1"
            :key="item.text"
            v-ripple
            clickable
            :to="item.to"
            exact
            @click="
              (tituloHeader = item.text), (link = item.text);
              (iconoHeader = item.icon);
              if( item.text == 'Compras'){
                leftDrawerOpen = false
              }

            "
            class="itemmenu"
            :active="link === item.text"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="item in links2"
            :key="item.text"
            v-ripple
            clickable
            :to="item.to"
            exact
            @click="
              (tituloHeader = item.text), (link = item.text);
              iconoHeader = item.icon;
              if( item.text == 'Ventas'){
                leftDrawerOpen = false
              }
            "
            class="itemmenu"
            :active="link === item.text"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item
            v-for="item in links4"
            :key="item.text"
            class="itemmenu"
            :to="item.to"
            v-ripple
            clickable
            :active="link === item.text"
            @click="link = item.text"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple clickable class="itemmenu2" @click="salir()" >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label >salir</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

     <q-page-container style="padding-top:55px; padding-bottom:0px; margin:0px;" >
          <router-view />
      </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import PerfilUsuario from "../components/usuarios/PerfilUsuario"
import PerfilUsuarioII from "../components/usuarios/PerfilUsuarioII"
import DropDown from "../components/layout/Dropdown.vue"
import DropDownSide from "../components/layout/DropdownSide.vue"
export default {
  components :{ PerfilUsuario, PerfilUsuarioII, DropDown },
  name: "MyLayout",
  setup() {

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    const tituloHeader = ref("");
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const link = ref("Home");

    return {
      tituloHeader,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      link,
      links1: [
        { icon: "dashboard", text: "Dashboard", to: "/" },
        { icon: "group", text: "Empleados", to: "/usuarios" },
        { icon: "shopping_bag", text: "Compras", to: "/compras"}
      ],
      links2: [
        { icon: "admin_panel_settings", text: "Administrar", to:"/administrador"},
        { icon: "point_of_sale", text: "Ventas", to: "/ventas" },
      ],
      links4: [
        { icon: "token", text: "Productos", to: "/productos" },
        { icon: "point_of_sale", text: "Caja", to: "/caja" },

      ],
    };
  },
  created(){
    this.Logeado();
  },
  methods: {
    async salir() {

      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    Logeado(){
      if(!localStorage.getItem('token')){
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
.itemmenu {
  color: #a5a5a5;
  font-weight: 400;
}
.itemmenu2 {
  color: #a5a5a5;
  font-weight: 400;
}

.itemmenu2:hover {
  background: #202022;
  font-weight: 700;
  color: #b80f0a;
}

.my-menu-link {
  color: white;
  font-weight: 500;
  background: #b80f0a;
  border-radius: 0px 0px 0px 0px;
  margin-right: 0px;
}

.draweColor {
  background: #222222;
  color: white;
}
</style>
