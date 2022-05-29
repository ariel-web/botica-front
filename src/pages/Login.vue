<template>
  <div class="container" >
    <div style="psotion: relative; z-index:88999;">
      <VistaAcceso/>
    </div>
  </div>
</template>

<script>

import VistaAcceso from '../components/login/VistaAcceso'

export default {
  components: { VistaAcceso }
}
</script>
<style scoped>
  .container{
    position: absolute;
    background-image: url("../assets/fondo-login.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    padding: 0;

  }
</style>

