<template>
    <div class="column items-center">
      <q-fab color="accent" glossy icon="keyboard_arrow_down" direction="down">
        <q-fab-action color="amber" text-color="black" @click="onClick" icon="mail" />
        <q-fab-action color="amber" text-color="black" @click="onClick" icon="alarm" />
      </q-fab>
    </div>
</template>

<script>
export default {
  setup () {
    return {
      onClick () {
        // console.log('Clicked on a fab action')
      }
    }
  }
}
</script>
