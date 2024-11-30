<template>
    <q-page >
        <div class="closePageButton">
            <q-btn icon="close" flat round dense @click="closeEventDay"></q-btn>
        </div>
        <div class="text-h6">Listado de eventos del día {{ dateEvent }}</div>
        <div class="flex full-width">
            <q-list class="full-width">
                <q-item v-for="event in events" class="listItemEvent" :class="event.classEvent" clickable v-ripple @click="goToEvent(event.hashEvent)">
                    <q-item-section>
                    <q-item-label>{{event.eventName}}</q-item-label>
                    
                    </q-item-section>

                    <q-item-section side top>
                    <q-item-label caption>{{ event.eventTime }}</q-item-label>
                    <q-icon :name="event.iconEvent" ></q-icon>
                    </q-item-section>
                </q-item>
                <!-- <q-item class="bg-warning listItemEvent" clickable v-ripple>
                    <q-item-section>
                    <q-item-label>Evento en Portals</q-item-label>
                    
                    </q-item-section>

                    <q-item-section side top>
                    <q-item-label caption>18:00</q-item-label>
                    <q-icon name="question_mark" ></q-icon>
                    </q-item-section>
                </q-item> -->

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
        const dateEvent = ref();
        const $q = useQuasar();
        const user = ref();
        const events = ref([]);
    onMounted(() => {
        console.log(route.params)
        dateEvent.value = route.params.id
        user.value = $q.localStorage.getItem("User")
        var url = globalVar.RestUrl

        axios.get(url +"Event/AllEventByDateAndUserId",{params:{userId:user.value.id,date:dateEvent.value}})
        .then(res => {
            console.log(res)
            if(res.data.length == 1){
                router.push({path:`/event/${res.data[0].hashEvent}`})
            }
            else{
                res.data.forEach(element => {
                    var classEvent = element.eventConfirmed ? 'bg-green' : 'bg-warning'
                    var iconEvent = element.eventConfirmed ? 'check' : 'question_mark'

                    events.value.push({
                        eventName: element.eventName,
                        eventTime: element.eventTime,
                        hashEvent: element.hashEvent,
                        classEvent: classEvent,
                        iconEvent:iconEvent
                    })
                });
            }
                                
        })
        .catch(err => {
            console.log(err)
        }) 

    })
    return {
        dateEvent,
        events,
        
        closeEventDay(){
            router.push({path:"/"})
        },

        goToEvent(eventId){
            router.push({path:`/event/${eventId}`})

        }

      
    }
  },
  })
  </script>