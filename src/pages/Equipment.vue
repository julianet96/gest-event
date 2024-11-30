<template>
    <q-page >
        <q-toolbar class="bg-secondary text-white q-mb-md">
            
            <q-toolbar-title>
                Listado de equipamiento
            </q-toolbar-title>
            <q-btn flat round dense icon="filter_alt">
                <q-badge v-show="filter" floating color="red">1</q-badge>
            </q-btn>
        </q-toolbar>
        
        <div class="flex full-width">
            <q-list class="full-width">
                <q-item v-for="equipment in equipments" class="itemLoadSheet" >
                    
                    <q-item-section avatar>
                        <q-avatar square>
                            <img :src="equipment.urlImg">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ equipment.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label caption>{{ equipment.typeName }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn-group>
                            <q-btn color="warning" icon="edit" size="sm"></q-btn>
                            <q-btn color="red" icon="delete" size="sm" @click="askToDelete(equipment.id)"></q-btn>
                        </q-btn-group>
                   
                    </q-item-section>
                </q-item>
              

            </q-list>

        </div>
         
        <q-page-sticky position="bottom-right" :offset="[23, 21]">
            <q-fab color="accent" icon="keyboard_arrow_up" direction="up">
                <q-fab-action color="green" @click="onClick" icon="add" label="Nuevo"></q-fab-action>
                <q-fab-action color="secondary" @click="onClick" icon="format_list_bulleted" label="Typos"></q-fab-action>
            </q-fab>
        </q-page-sticky>

       
         
        
    </q-page>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRouter } from "vue-router";
  import { useRoute } from 'vue-router'
  import { Platform, useQuasar} from 'quasar'
  import { axios } from 'boot/axios'
  import globalVar from 'src/boot/globalVars';
  
  export default defineComponent({
    name: 'EventDay',

    setup () {
        const router = useRouter();
        const route = useRoute();
        const $q = useQuasar();
        const user = ref();
        const equipments = ref([]);
        const hashEvent = ref()
        const filter = ref(false)

        function getAllEquipments(){
            axios.get(globalVar.RestUrl +"Equipment/allEquipment").then(resp => {
                console.log(resp.data)
                equipments.value = resp.data
            }).catch(err => {

            })
        }

        
    onMounted(() => {
        user.value = $q.localStorage.getItem("User")
        getAllEquipments()
        
    })
    return {
        equipments,
        filter
        
    }
  },
  })
  </script>