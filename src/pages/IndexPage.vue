<template>
  <q-page class="flex">
    <q-banner class="text-white q-mb-md full-width" :class="nextEvent.class">
      {{nextEvent.text}}
    </q-banner>
    <div class="flex flex-center full-width">
      <div style=" width: 97%;">
        <div class="calendarButtons"><q-btn round text-color="accent" class="calendarButonColor" icon="arrow_back_ios" @click="onPrev"></q-btn> <div class="text-h6 text-weight-bolder">{{ monthSelected }} {{ yearSelected }}</div>  <q-btn round text-color="accent" class="calendarButonColor" icon="arrow_forward_ios" @click="onNext"></q-btn></div>
        <q-calendar-month
        ref="calendar"
            v-model="selectedDate"
            animated
            bordered
            focusable
            hoverable
            no-active-date
            locale="es"
            :weekdays="[1,2,3,4,5,6,0]"
            :day-min-height="60"
            :day-height="0"
            @change="onChange"
            @moved="onMoved"
            @click-date="onClickDate"
            @click-day="onClickDay"
            @click-workweek="onClickWorkweek"
            @click-head-workweek="onClickHeadWorkweek"
            @click-head-day="onClickHeadDay"
          >
          <template #day="{ scope: { timestamp } }">
              <template
                v-for="event in eventsMap[timestamp.date]"
                :key="event.id"
              >
                <div
                  :class="badgeClasses(event, 'day')"
                  class="my-event"
                >
                  <div class="title q-calendar__ellipsis">
                    {{ event.title + (event.time ? ' - ' + event.time : '') }}
                    <q-tooltip>{{ event.details }}</q-tooltip>
                  </div>
                </div>
              </template>
            </template>
          </q-calendar-month>
          <div class="full-width q-mt-sm">
            <q-chip color="green" style="min-width: 220px;" text-color="white" label="Evento Confirmado"></q-chip>
          </div>
          <div class="full-width">
            <q-chip color="orange" style="min-width: 220px;" text-color="white" label="Evento Pendiente Confirmación"></q-chip>
          </div>
          <div class="full-width">
            <q-chip color="grey"   style="min-width: 220px;" text-color="white" label="Vacaciones Confirmadas"></q-chip>
          </div>
      </div>
      
    </div>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">No Evento</div>
          <q-space></q-space>
          <q-btn icon="close" flat round dense v-close-popup></q-btn>
        </q-card-section>

        <q-card-section>
          El día seleccionado no hay ningun evento para ti.
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import {QCalendarMonth,addToDate,parseDate,parseTimestamp,today} from '@quasar/quasar-ui-qcalendar/src/index.js'
import { useRouter } from "vue-router";
import { axios } from 'boot/axios'
import globalVar from 'src/boot/globalVars';
import { useQuasar} from 'quasar'


const CURRENT_DAY = new Date()
function getCurrentDay (day) {
  const newDay = new Date(day)
  // newDay.setDate(day)

  console.log("getCurrentDay:",CURRENT_DAY, newDay)
  const tm = parseDate(newDay)
  return tm.date
}

export default defineComponent({
  name: 'MonthSlotDay',
  data () {
    return {
      selectedDate: today(),
      monthSelected:'',
      yearSelected:'',
      dialog:false,
      router:useRouter(),
      nextEvent:{},
      events: [],
      $q:useQuasar(),
    }
  },
  computed: {
    eventsMap () {
      const map = {}
      if (this.events.length > 0) {
        this.events.forEach(event => {
          (map[ event.date ] = (map[ event.date ] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[ timestamp.date ]) {
                map[ timestamp.date ] = []
              }
              map[ timestamp.date ].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      console.log(map)

      var monthDate = new Date(this.selectedDate)
      this.monthSelected = monthDate.toLocaleString('default', { month: 'long' })
      this.yearSelected = monthDate.getFullYear();

      return map
    }
  },
  mounted(){
    console.log("mounteeeeddd")
    this.nextEvent = {
      class:'bg-primary',
      text:'No tienes ningun evento asignado proximamente'
    }

    var url = globalVar.RestUrl
    var user = this.$q.localStorage.getItem("User")

    axios.get(url +"Event/AllEventByUserId",{params:{userId:user.id}})
    .then(res => {
        console.log(res)

        res.data.forEach(x => {
          var item = {
            id: x.id,
            title: x.eventName,
            details: x.eventDescription,
            date: getCurrentDay(x.eventDay),
            bgcolor: x.eventConfirmed == true ? "green" : 'orange' 
          }
          this.events.push(item)
        })

        var dateNow = parseDate(new Date(CURRENT_DAY))

        var allItems = this.events.sort((a,b) => new Date(a.date) - new Date(b.date))
        var itemsFiltered = allItems.filter(x => new Date(x.date) >= new Date(dateNow.date))

        
        
        if(itemsFiltered.length > 0){
          var firstEvent = itemsFiltered[0]

          console.log("firstEvent",firstEvent)
          console.log(new Date(firstEvent.date).getTime() ,new Date(dateNow.date).getTime())

          this.nextEvent = {
            class: (new Date(firstEvent.date).getTime() == new Date(dateNow.date).getTime()) ? 'bg-red':'bg-orange',
            text: new Date(firstEvent.date).getTime() == new Date(dateNow.date).getTime() ? 'Tienes un evento hoy' : 'Tu proximo evento es el ' + firstEvent.date
          }
        }

        console.log("AllItems", itemsFiltered)
                            
    })
    .catch(err => {
        console.log(err)
    }) 

    

  },
  methods: {
    badgeClasses (event, type) {
      return {
        [ `text-white bg-${ event.bgcolor }` ]: true,
        'rounded-border': true
      }
    },

    

    onToday () {
      this.$refs.calendar.moveToToday()
    },
    onPrev () {
      this.$refs.calendar.prev()
      console.log(this.selectedDate)

      
    },
    onNext () {
      this.$refs.calendar.next()
      console.log(this.selectedDate)
    },
    onMoved (data) {
      console.log('onMoved', data)
      var monthDate = new Date(data.date)
      this.monthSelected = monthDate.toLocaleString('default', { month: 'long' })
      this.yearSelected = monthDate.getFullYear();
    },
    onChange (data) {
      console.log('onChange', data)
      
    },
    onClickDate (data) {
      var a = this.events.find(x => x.date == data.scope.timestamp.date)

      if(a == undefined){
        this.dialog = true
      }
      else{
        this.router.push({path:"eventDay/"+data.scope.timestamp.date})
      }
      
    },
    onClickDay (data) {
      var a = this.events.find(x => x.date == data.scope.timestamp.date)

      if(a == undefined){
        this.dialog = true
      }
      else{
        this.router.push({path:"eventDay/"+data.scope.timestamp.date})
      }
    },
    onClickWorkweek (data) {
      console.log('onClickWorkweek', data)
    },
    onClickHeadDay (data) {
      console.log('onClickHeadDay', data)
    },
    onClickHeadWorkweek (data) {
      console.log('onClickHeadWorkweek', data)
    }
  }
})
</script>


