<template>
    <q-page >
        <div class="closePageButton">
            <q-btn icon="close" flat round dense @click="closeEventDay"></q-btn>
        </div>
        <div class="text-h5 bg-secondary titelEvent q-mb-xs" style="margin-top: -30px;">Hoja de Carga </div>
        
        <div class="flex full-width">
            

            <q-list bordered class="rounded-borders full-width">
                <q-expansion-item
                    v-for="sheetType in sheetTypes"
                    expand-separator
                    :label="sheetType.name"
                    default-opened
                    header-class="bg-accent text-white text-h6 botonDesplegableBlanco"
                    class="bg-grey-5"
                    v-show="sheetType.sheetList != undefined && sheetType.sheetList.length > 0"
                >
                    <q-list style="margin-top: 4px;">
                        <q-item clickable v-ripple class="itemLoadSheet" v-for="sheet in sheetType.sheetList">
                            <q-item-section avatar>
                                <q-avatar square>
                                    <img :src="sheet.urlImg">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label>{{ sheet.name }}</q-item-label>
                            <q-item-label caption v-show="sheet.comment != null && sheet.comment != ''">{{sheet.comment}}</q-item-label>
                            
                            </q-item-section>
                            <q-item-section avatar v-show="sheet.quantity != null && sheet.quantity != ''" >Cantidad: {{sheet.quantity}}</q-item-section>
                        </q-item>
                    </q-list>
               </q-expansion-item>

            </q-list>

        </div>
         
         
        
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
        const hash = ref();
        const $q = useQuasar();
        const user = ref();
        const events = ref([]);
        const sheetTypes = ref([])


        function getSheetTypes (){
            axios.get(globalVar.RestUrl +"LoadingSheet/allSheetTypes")
            .then(res => {
                sheetTypes.value = res.data
                console.log(res.data)

                getSheet()
                                    
            })
            .catch(err => {
                console.log(err)
            }) 
        }

        function getSheet () {
            axios.get(globalVar.RestUrl +"LoadingSheet/loadingSheet",{params:{hash:route.params.id}})
            .then(res => {
                console.log(res)

                sheetTypes.value.forEach(item => {
                    item.sheetList = res.data.filter( x => x.idLoadingSheetType == item.id)
                })

                                    
            })
            .catch(err => {
                console.log(err)
            }) 
        }

    onMounted(() => {
        console.log(route.params)
        hash.value = route.params.id
        user.value = $q.localStorage.getItem("User")
        var url = globalVar.RestUrl

        getSheetTypes()

    })
    return {
        hash,
        events,
        sheetTypes,
        
        closeEventDay(){
            router.push({path:`/event/${hash.value}`})
        },

      
    }
  },
  })
  </script>