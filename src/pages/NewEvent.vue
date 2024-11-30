<template>
    <q-page >
        <div class="text-h5 bg-secondary titelEvent q-mb-xs" >Nuevo Evento</div>
        <div class="q-pa-md">
        <q-stepper
            v-model="step"
            ref="stepper"
            contracted
            color="secondary"
            animated
        >
            <q-step
                :name="1"
                title="Información del evento"
                icon="settings"
                :done="step > 1"
            >
                <!-- Titulo del evento -->
                <q-input ref="eventNameRef" color="grey-8" bg-color="grey-4" class="q-mb-md" rounded outlined v-model="eventName" label="Nombre del Evento" :rules="[val => !!val]"></q-input>
                
                <!-- Dia del evento -->
                <q-input ref="eventDateRef" color="grey-8" bg-color="grey-4" v-model="eventDate" rounded outlined mask="date" :rules="['date']" label="Día del Evento">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="eventDate" :options="optionsDate">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                            </div>
                            </q-date>
                        </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>

                    <!-- Horario inicio del evento -->
           
                    <q-input ref="eventTimeRef" color="grey-8" bg-color="grey-4" rounded outlined v-model="eventTime" mask="time" :rules="['time']" label="Hora Inicio del Evento">
                        <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="eventTime" format24h>
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                                </div>
                            </q-time>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input>

                    <!-- Horario fin del evento -->
                    <q-input ref="eventEndTimeRef" color="grey-8" bg-color="grey-4" rounded outlined v-model="eventEndTime" mask="time" :rules="['time']" label="Hora Fin del Evento">
                        <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="eventEndTime" format24h>
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                                </div>
                            </q-time>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input>

                    <!-- Horario en almacen -->
                    <q-input ref="warehouseTimeRef" color="grey-8" bg-color="grey-4" rounded outlined v-model="warehouseTime" mask="time" :rules="['time']" label="Hora En Almacén">
                        <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="warehouseTime" format24h>
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                                </div>
                            </q-time>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input>


                   

                

            </q-step>

            <q-step
                :name="2"
                title="Configuracion"
                icon="map"
                :done="step > 2"
            >
                <!-- Ubicacion -->
                <q-input ref="eventLocationRef" color="grey-8" bg-color="grey-4" class="q-mb-md" rounded outlined v-model="eventLocation" label="Ubicación del Evento" :rules="[val => !!val]"></q-input>

                <!-- URl google Maps -->
                <q-input color="grey-8" bg-color="grey-4" class="q-mb-md" rounded outlined v-model="eventUrlLocation" label="URL Google Maps"></q-input>


                <!-- Vehiculo -->
                <q-select
                    ref="eventCarRef"
                    color="grey-8" 
                    bg-color="grey-4"
                    rounded 
                    outlined
                    v-model="eventCar"
                    :options="cars"
                    option-value="id"
                    option-label="name"
                    emit-value
                    map-options
                    label="Vehículo"
                    class="q-mb-md"
                    :rules="[val => !!val]"

                ></q-select>

                    <!-- Tecnicos -->
                <q-select
                    ref="eventUsersRef"
                    color="grey-8" 
                    bg-color="grey-4"
                    rounded 
                    outlined
                    multiple
                    v-model="eventUsers"
                    :options="users"
                    option-value="id"
                    option-label="name"
                    emit-value
                    map-options
                    label="Tecnicos"
                    :rules="[val => !!val]"
                        
                ></q-select>
            </q-step>

            <q-step
                :name="3"
                title="Horario de evento"
                icon="hourglass_empty"
                :done="step > 3"
            >
                <!-- Nombre Grupo -->
                <q-input ref="groupNameRef" color="grey-8" bg-color="grey-4" class="q-mb-md" rounded outlined v-model="groupName" label="Nombre del Grupo" :rules="[val => !!val]"></q-input>

                <!-- Horario pruebas grupo -->

                <q-input ref="timeTestRef" color="grey-8" bg-color="grey-4" rounded outlined v-model="timeTest" mask="time" :rules="['time']" label="Hora Pruebas Grupo">
                    <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="timeTest" format24h>
                            <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                            </div>
                        </q-time>
                        </q-popup-proxy>
                    </q-icon>
                    </template>
                </q-input>

                <!-- Horario Actuacion -->

                <q-input ref="performanceTimeRef" color="grey-8" bg-color="grey-4" rounded outlined v-model="performanceTime" mask="time" :rules="['time']" label="Hora Actuacion">
                    <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="performanceTime" format24h>
                            <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                            </div>
                        </q-time>
                        </q-popup-proxy>
                    </q-icon>
                    </template>
                </q-input>

                 <q-btn color="secondary" class="q-mb-md full-width"  glossy unelevated icon="add" label="Añadir horario" @click="addGroupEvent()"></q-btn>

                <q-table
                                       
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
                    class="tableNew"
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
                        <q-td key="options" :props="props">
                            <q-btn
                            
                            round
                            class="glossy"
                            color="red"
                            size="xs"
                            icon="delete"
                            @click="deleteRow(props)"
                            ></q-btn>
                        </q-td>
                        </q-tr>
                    </template>
                </q-table>
                
            </q-step>

           
            <template v-slot:navigation>
                <q-stepper-navigation>
                <q-btn v-if="step < 3" @click="testing(step)" color="primary" label="Continuar"></q-btn>
                <q-btn v-if="step === 3" @click="saveModal = true" color="primary" label="Guardar"></q-btn>
                <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Volver" class="q-ml-sm"></q-btn>
                </q-stepper-navigation>
            </template>
        </q-stepper>

        <q-dialog v-model="saveModal" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="warning" color="primary" text-color="white"></q-avatar>
                <span class="q-ml-sm q-mb-md">Como quieres crear el evento.</span>
                <span class="q-ml-sm">Si lo guardas como confirmado deberas rellenar la hoja de carga.</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Borrador" color="primary" v-close-popup @click="saveEvent(0)"></q-btn>
                <q-btn flat label="Confirmado" color="primary" v-close-popup @click="saveEvent(1)"></q-btn>
                <q-btn flat label="Cancelar" color="red" v-close-popup></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="generateSheet" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="question_mark" color="primary" text-color="white"></q-avatar>
                <span class="q-ml-sm">Quieres crear hoja de carga ?.</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Crear" color="primary" v-close-popup @click="goToCreateSheet"></q-btn>
                <q-btn flat label="Cancelar" color="red" v-close-popup @click="goToList"></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
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
        const eventNameRef = ref(null)
        const eventDateRef = ref(null)
        const eventTimeRef = ref(null)
        const eventEndTimeRef = ref(null)
        const warehouseTimeRef = ref(null)
        const eventCarRef = ref(null)
        const eventUsersRef = ref(null)
        const eventLocationRef = ref(null)
        const groupNameRef = ref(null)
        const timeTestRef = ref(null)
        const performanceTimeRef = ref(null)
        const eventHash = ref()

        const router = useRouter();
        const route = useRoute();
        const $q = useQuasar();
        const users = ref();
        const saveModal = ref(false)
        const generateSheet = ref(false)
        const step = ref(1)
        const eventName = ref()
        const eventDate = ref()
        const eventTime = ref()
        const eventEndTime = ref()
        const warehouseTime = ref()
        const cars = ref([])
        const  eventCar = ref()
        const eventUsers = ref()
        const eventLocation = ref()
        const eventUrlLocation = ref()
        const groupName = ref()
        const timeTest = ref()
        const performanceTime = ref()
        const scheduleColumns = [{name: 'name',align: 'center',label: 'Nombre', field:'name'},{name: 'tests',align: 'center',label: 'Pruebas',field: 'timeTest',sortable: true},{name: 'performance',align: 'center',label: 'Actuación',field: 'performanceTime',sortable: true},{name: 'options',align: 'center'}]
        const eventSchedule = ref([])

        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [d.getFullYear(), pad(d.getMonth()+1),pad(d.getDate()) ].join('/')
        }

        function getCars(){
            axios.get(globalVar.RestUrl +"Cars/allCars")
            .then(res => {
                cars.value = res.data
               
            })
            .catch(err => {
                console.log(err)
            }) 
        }

        function getUsers(){
            axios.get(globalVar.RestUrl +"Users/allUsers")
            .then(res => {
                users.value = res.data
               
            })
            .catch(err => {
                console.log(err)
            }) 
        }

        function addGroupEvent(){

            groupNameRef.value.validate()
            timeTestRef.value.validate()
            performanceTimeRef.value.validate()

            if (!timeTestRef.value.hasError && !performanceTimeRef.value.hasError && !groupNameRef.value.hasError) {
            
                eventSchedule.value.push({groupName: groupName.value, timeTest:timeTest.value, performanceTime:performanceTime.value})

                groupName.value = ''

                timeTest.value= ''

                performanceTime.value = ''

                setTimeout(() => {
                    groupNameRef.value.resetValidation()
                    timeTestRef.value.resetValidation()
                    performanceTimeRef.value.resetValidation()

                }, 10);

                groupNameRef.value.resetValidation()
                performanceTimeRef.value.resetValidation()
                timeTestRef.value.resetValidation()
            }
        }

        function deleteRow(props){

            var index = eventSchedule.value.indexOf(props.row)
            eventSchedule.value.splice(index,1)

        }

        function convertDateSave(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [d.getFullYear(), pad(d.getMonth()+1),pad(d.getDate()) ].join('-')
        }

        function saveEvent (type){

            var saveDate = convertDateSave(Date.parse(eventDate.value))

            var saveEvent = {
                eventName: eventName.value,
                eventDate: saveDate,
                eventTime: eventTime.value,
                eventEndTime: eventEndTime.value,
                warehouseTime: warehouseTime.value,
                eventCar: eventCar.value,
                eventLocation: eventLocation.value,
                eventUrlLocation: eventUrlLocation.value,
                eventUsers:eventUsers.value,
                eventSchedule:eventSchedule.value,
                eventConfirmed: type == 1 ? true : false
            }


            axios.post(globalVar.RestUrl +"Event/addEvent",saveEvent).then(res => {

                eventHash.value = res.data.hashEvent

                if(type == 1){
                    goToCreateSheet()
                }else{
                    generateSheet.value = true
                }

            }).catch(err => {

            })

        }

        function testing(index){
            var itsOk = false;

            switch(index){
                case 1:
                    eventNameRef.value.validate()
                    eventDateRef.value.validate()
                    eventTimeRef.value.validate()
                    eventEndTimeRef.value.validate()
                    warehouseTimeRef.value.validate()

                    if(!eventNameRef.value.hasError && !eventDateRef.value.hasError && !eventTimeRef.value.hasError && !eventEndTimeRef.value.hasError && !warehouseTimeRef.value.hasError){
                        itsOk = true;
                    }
                break;
                case 2:
                    eventLocationRef.value.validate()
                    eventCarRef.value.validate()
                    eventUsersRef.value.validate()

                    if(!eventLocationRef.value.hasError && !eventCarRef.value.hasError && !eventUsersRef.value.hasError){
                        itsOk = true;
                    }
                break;

            }


            if(itsOk){
                this.$refs.stepper.next()
            }
        }

        function goToCreateSheet(){
            router.push('')
        }

        function goToList(){
            router.push('events')
        }

       
    onMounted(() => {
        getCars()
        getUsers()

    })
    return {
        eventCarRef,
        eventUsersRef,
        eventLocationRef,
        eventNameRef,
        eventDateRef,
        eventTimeRef,
        eventEndTimeRef,
        warehouseTimeRef,
        groupNameRef,
        timeTestRef,
        performanceTimeRef,

        step,
        cars,
        users,
        saveModal,
        generateSheet,
        eventName,
        eventDate,
        eventTime,
        eventEndTime,
        warehouseTime,
        eventCar,
        eventUsers,
        eventLocation,
        eventUrlLocation,
        groupName,
        timeTest,
        performanceTime,
        scheduleColumns,
        eventSchedule,
        optionsDate (date) {
            var newDate = Date.now()
            return date >= convertDate(newDate)
        },
        addGroupEvent,
        deleteRow,
        saveEvent,
        testing,
        goToList,
        goToCreateSheet

      
    }
  },
  })
  </script>