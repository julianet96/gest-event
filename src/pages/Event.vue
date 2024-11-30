<template>
    <q-page >
        
        <div class="text-h5 bg-secondary titelEvent q-mb-xs">{{ event.eventName }}</div>
        <div class="row listItemEvent q-mb-xs q-pt-sm q-pb-sm bg-grey-5 text-black glossy"> <div style="font-size: 1rem !important;" class="text-h6 col-6 q-pl-xs">Horario del evento:</div><div class="col-5 text-body1 flex flex-center ">{{ eventDetail.eventTime }} h - {{ eventDetail.timeEventEnd }} h</div> </div>
        <div class="row listItemEvent q-mb-xs q-pt-sm q-pb-sm bg-grey-5 text-black glossy"> <div style="font-size: 1rem !important;" class="text-h6 col-6 q-pl-xs">Horario en Almacen:</div><div class="col-3 text-body1 flex flex-center">{{ eventDetail.warehouseTime }} h</div> </div>
        <div class="row listItemEvent q-mb-xs q-pt-sm q-pb-sm bg-grey-5 text-black glossy"> <div style="font-size: 1rem !important;" class="text-h6 col-6 q-pl-xs">Vehiculo a utilizar:</div><div class="col-3 text-body1 flex flex-center">{{ selectedCar.name }}</div> </div>
        <div class="row listItemEvent q-mb-xs q-pt-sm q-pb-sm bg-grey-5 text-black glossy"> <div style="font-size: 1rem !important;" class="text-h6 col-4 q-pl-xs">Tecnicos:</div><div class="col-7 text-body1 flex flex-center">{{ userEvent }}</div> </div>
        <div class="row listItemEvent q-mb-md flex flex-center q-pt-sm q-pb-sm bg-grey-5 text-black glossy"> <div style="font-size: 1rem !important;" class="text-h6 col-6 q-pl-xs">Ubicación del evento:</div><div class="col-4 text-body1 ">{{ eventDetail.location }}</div><div class="col-2"><q-btn v-if="eventDetail.urlLocation != null && eventDetail.urlLocation != undefined" round color="secondary" size="sm" icon="navigation" :href="eventDetail.urlLocation"></q-btn></div> </div>

        <div class="row  q-mb-md q-pl-sm q-pr-sm" v-if="event.indLoadingSheet"><q-btn class="glossy full-width" rounded color="grey-7" label="Hoja de carga" @click="goToLoadingSheet()"></q-btn></div>
        
        <div class="row  q-mb-md q-pl-sm q-pr-sm" v-if="eventDetail.indPatchLights"><q-btn class="glossy full-width" rounded color="grey-7" label="Patch Luces"></q-btn></div>

        <q-table
            v-if="eventSchedule.length > 0"
            
            title="Horarios"
            :rows="eventSchedule"
            :columns="scheduleColumns"
            row-key="name"
            color="primary"
            card-class="bg-secondary text-white"
            table-class="bg-grey-5 text-black"
            table-header-class="bg-secondary text-white"
            :rows-per-page-options="[0]"
            hide-bottom
            >
            <template v-slot:body="props">
                <q-tr :props="props">
                <q-td key="name" :props="props">
                    {{ props.row.groupName }}
                </q-td>
                <q-td key="tests" :props="props">
                    
                    {{ props.row.timeTest }}
                </q-td>
                <q-td key="performance" :props="props">
                    
                    {{ props.row.performanceTime }}
                   
                </q-td>
                <!-- <q-td key="options" :props="props">
                    <q-btn
                    
                    round
                    class="glossy"
                    color="secondary"
                    size="xs"
                    icon="view_timeline"
                    ></q-btn>
                </q-td> -->
                </q-tr>
            </template>
        </q-table>

    </q-page>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRouter } from "vue-router";
  import { useRoute } from 'vue-router'
  import { axios } from 'boot/axios'
  import globalVar from 'src/boot/globalVars';
  
  export default defineComponent({
    name: 'Event',

    setup () {
        const router = useRouter();
        const route = useRoute();
        const event = ref({eventName:''});
        const hash = ref()
        const eventDetail = ref({})
        const userEvent = ref()
        const scheduleColumns = [{name: 'name',align: 'center',label: 'Nombre Grupo'},{name: 'tests',align: 'center',label: 'Hora Pruebas',field: 'timeTest',sortable: true},{name: 'performance',align: 'center',label: 'Hora actuación',field: 'performanceTime',sortable: true}]
        const eventSchedule = ref([])
        const selectedCar = ref({name:''})

        function getEventDetail (idEvent){
            axios.get(globalVar.RestUrl +"Event/eventDetail",{params:{idEvent:idEvent}})
            .then(res => {
                console.log(res)
                eventDetail.value = res.data
                getCars()
                
                                    
            })
            .catch(err => {
                console.log(err)
            }) 
        }

        function getUserEvent (idEvent){
            axios.get(globalVar.RestUrl +"Users/userEvent",{params:{idEvent:idEvent}})
            .then(res => {
                var users = '';
                for (var i = 0; i < res.data.length ; i++) {

                    users += res.data[i].name

                    if(i != (res.data.length -1)){
                        users += ', '
                    }
                }

                userEvent.value = users
                
                                    
            })
            .catch(err => {
                console.log(err)
            }) 
        }

        function getEventSchedule (idEvent){
            axios.get(globalVar.RestUrl +"Event/eventSchedule",{params:{idEvent:idEvent}})
            .then(res => {

                eventSchedule.value = res.data
                                
            })
            .catch(err => {
                console.log(err)
            }) 
        }
        function getCars(){
            axios.get(globalVar.RestUrl +"Cars/allCars")
            .then(res => {
                selectedCar.value = res.data.find(x => x.id == eventDetail.value.idVehicle)

               
            })
            .catch(err => {
                console.log(err)
            }) 
        }

    onMounted(() => {
        hash.value = route.params.id
        var url = globalVar.RestUrl

        axios.get(url +"Event/eventByHash",{params:{hash:hash.value}})
        .then(res => {
            event.value = res.data
            getEventDetail(res.data.id)
            getUserEvent(res.data.id)
            getEventSchedule(res.data.id)
           
                                
        })
        .catch(err => {
            console.log(err)
        }) 
    })
    return {
        event,
        eventDetail,
        userEvent,
        scheduleColumns,
        eventSchedule,
        selectedCar,

        goToLoadingSheet(){
            router.push({path:`/loadingSheet/${hash.value}`})
        }
      
    }
  },
  })
  </script>