<template>
  <q-layout view="hHh lpR fff" class="loginBackground">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-secondary text-white">
      <q-tabs no-caps active-color="white"  class="text-grey-6" v-model="tab">
          <q-tab name="home" icon="calendar_month" @click="changePage"></q-tab>
          <q-tab name="events" icon="description" @click="changePage"></q-tab>
          <q-tab name="equipments" icon="mic_external_on" @click="changePage"></q-tab>
          <q-tab name="settings" icon="settings" @click="changePage"></q-tab>
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { defineComponent, onMounted, ref } from 'vue'



export default defineComponent({
  name: 'MainLayout',


  setup () {
    const router = useRouter();
    const tab = ref('home')
    const route = useRoute();

    onMounted(() => {
      var routes = ['home','events','equipment','settings']
      if(routes.some(x => x == route.name)){
        tab.value=route.name
      }
    })

    return {
      tab,
      router,

      changePage(){
        console.log(tab.value)
        if(tab.value == 'home')
          router.push({path:"/"})
        else
          router.push({path:"/"+tab.value})
      }
    }
  }
})
</script>
