<template>
    <q-page >
        <div class="text-h5 bg-secondary titelEvent q-mb-xs" >Listado de eventos</div>
        
        <div class="flex full-width">
            <q-list class="full-width">
                <q-item v-for="event in events" :class="event.class" >
                    
                    <q-item-section @click="goToEvent(event.hashEvent)">
                        <q-item-label v-if="event.eventConfirmed == false" caption>Borrador</q-item-label>
                        <q-item-label>{{event.eventName}}</q-item-label>
                    </q-item-section>

                    <q-item-section @click="goToEvent(event.hashEvent)">
                        <q-item-label caption>{{ event.eventStringDate }}</q-item-label>
                        <q-item-label caption>{{ event.eventTime }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn-group>
                            <q-btn color="primary" icon="upload_file" size="sm" @click="openLoadingSheet(event)"></q-btn>
                            <q-btn color="warning" icon="edit" size="sm"></q-btn>
                            <q-btn color="red" icon="delete" size="sm" @click="askToDelete(event.id)"></q-btn>
                        </q-btn-group>
                   
                    </q-item-section>
                </q-item>
              

            </q-list>

        </div>
         
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" @click="newEvent()"></q-btn>
        </q-page-sticky>

        <q-dialog v-model="deleteEventModal" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="warning" color="red" text-color="white"></q-avatar>
                <span class="q-ml-sm">Quieres eliminar el evento ?.</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Eliminar" color="red" v-close-popup @click="deleteRow"></q-btn>
                <q-btn flat label="Cancelar" color="primary" v-close-popup></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="newLoadingSheetModal" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="question_mark" color="secondary" text-color="white"></q-avatar>
                <span class="q-ml-sm">No hay ninguna hoja de cargas creada  desea crear una ?.</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Crear" color="primary" v-close-popup @click="deleteRow"></q-btn>
                <q-btn flat label="Cancelar" color="red" v-close-popup></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="editLoadingSheetModal">
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="question_mark" color="secondary" text-color="white"></q-avatar>
                <span class="q-ml-sm">Deseas editar o visualizar la hoja de carga ?.</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Visualizar" color="primary" v-close-popup @click="deleteRow"></q-btn>
                <q-btn flat label="Editar" color="warning" v-close-popup></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
         
        
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
        const events = ref([]);
        const idEvent = ref()
        const deleteEventModal = ref(false)
        const newLoadingSheetModal = ref(false)
        const editLoadingSheetModal = ref(false)
        const hashEvent = ref()

        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
        }

        function askToDelete(idEvento){
            idEvent.value = idEvento
            deleteEventModal.value = true
        }

        function deleteRow (){
            axios.delete(globalVar.RestUrl+'Event/deleteEvent',{params:{idEvent:idEvent.value}}).then(resp => {
                getAllEvents()
            }).catch(ex => {

            })
        }

        function getAllEvents (){
            var url = globalVar.RestUrl

            axios.get(url +"Event/AllFutureEvent")
            .then(res => {
                console.log(res.data)

                events.value = res.data.map(x => {
                    x.eventDay = new Date(x.eventDay)
                    x.eventStringDate = convertDate(x.eventDay)
                    x.class = x.eventConfirmed ? 'itemLoadSheetOk' : 'itemLoadSheet'
                    return x
                })        
            })
            .catch(err => {
                console.log(err)
            }) 
        }

        function openLoadingSheet(event){
            console.log(event)
            hashEvent.value = event.hashEvent

            if(event.indLoadingSheet){
                editLoadingSheetModal.value = true;
            }else{
                newLoadingSheetModal.value = true;
            }
        }

    onMounted(() => {
        user.value = $q.localStorage.getItem("User")
        
        getAllEvents()
    })
    return {
        
        events,
        deleteEventModal,
        newLoadingSheetModal,
        editLoadingSheetModal,
        
        goToEvent(eventId){
            router.push({path:`/event/${eventId}`})

        },
        newEvent(){
            router.push('newEvent')
        },
        deleteRow,
        askToDelete,
        openLoadingSheet

      
    }
  },
  })
  </script>