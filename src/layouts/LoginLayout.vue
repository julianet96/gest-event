<template>
    <q-layout view="hhh lpR fff" class="loginBackground">

        <q-page-container>
        <router-view />
        </q-page-container>

    </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { Platform } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      platform: Platform
      
    }
  },
  mounted() {
    console.log(Platform.is.mobile) 
  }
})
</script>