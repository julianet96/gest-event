<template>
    <q-page class="flex flex-center">
         <div v-if="platform.is.mobile">
             <div class="flex flex-center">
                 <q-avatar size="100px"  class="shadow">
                     <img src="~assets/blank-profile.png">
                 </q-avatar>
 
             </div>
         
             <div class="flex flex-center">
                 <h3  class="text-weight-regular textShadow">GestEvent</h3>
             </div>

             <div  class="q-gutter-md">
                <q-input ref="inputRefUsr" lazy-rules rounded standout class="colorImputLogin" v-model="userName" label="Username" :rules="[val => !!val || 'Este campo es obligatorio']"></q-input>
                <q-input ref="inputRefPass" v-model="password" rounded standout class="colorImputLogin" :type="isPwd ? 'password' : 'text'" label="Password" :rules="[val => !!val || 'Este campo es obligatorio']">
                    <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    ></q-icon>
                    </template>
                </q-input>
             </div>
             <div class="q-mt-lg flex flex-center" >
                <q-btn class="glossy full-width" rounded color="grey-5" label="Olvidastes la Contraseña"></q-btn>
                <q-btn class="glossy full-width q-mt-lg" rounded color="green-4" label="Login"  @click="login"></q-btn>
             </div>
         </div>
         <div v-if="!platform.is.mobile">

            <q-card class="q-pa-md shadow-2" bordered :style="{'min-height':'0', 'min-width':'450px'}">
                <q-card-section class="text-center">
                    <q-avatar size="100px"  class="shadow">
                        <img src="~assets/blank-profile.png">
                    </q-avatar>
                    <div class="text-grey-9 text-h5 text-weight-bold">GestEvent</div>
                </q-card-section>
                <q-card-section class="text-center q-pt-none text-negative">
                    {{ errorLogin }}
                </q-card-section>
                <form @submit.prevent.stop="login">
                    <q-card-section>
                    <q-input ref="inputRefUsr" lazy-rules rounded standout v-model="userName" label="Usuario" :rules="[val => !!val || 'Este campo es obligatorio']"></q-input>
                    <q-input ref="inputRefPass" rounded standout class="q-mt-md" v-model="password" :type="isPwd ? 'password' : 'text'" label="Contraseña" :rules="[val => !!val || 'Este campo es obligatorio']">
                        <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        ></q-icon>
                        </template>
                    </q-input>
                    </q-card-section>
                    <q-card-section>
                        <q-btn class="glossy full-width" rounded color="grey-5" label="Olvidastes la Contraseña"></q-btn>
                        <q-btn class="glossy full-width q-mt-lg" rounded color="green-4" label="Login" type="submit"></q-btn>
                    </q-card-section>
                </form>
                
            </q-card>

         </div>
         
        
    </q-page>
  </template>
  
  <script>
    import globalVar from 'src/boot/globalVars';
    import { defineComponent, ref } from 'vue'
    import { Platform, useQuasar} from 'quasar'
    import { useRouter } from "vue-router";
    import { axios } from 'boot/axios'
  
  export default defineComponent({
    name: 'IndexPage',

    setup () {
        const inputRefUsr = ref(null)
        const inputRefPass = ref(null)
        const isPwd = ref(true)
        const userName = ref()
        const password = ref()
        const $q = useQuasar();
        const router = useRouter();

    return {
        platform:Platform,
        isPwd,
        userName,
        password,
        inputRefUsr,
        inputRefPass,

        login(){
            var url = globalVar.RestUrl
            console.log('login')
            inputRefUsr.value.validate()
            inputRefPass.value.validate()

            if (!inputRefUsr.value.hasError && !inputRefPass.value.hasError) {
                console.log("libre para login",userName.value,password.value)
                axios.post(url +"Autentication/Autenticate",{"UserName":userName.value,"Password":password.value})
                .then(res => {
                        console.log(res.data)
                        $q.localStorage.set("Token",res.data.token)
                        $q.localStorage.set("User",res.data.user)
                        router.push({path:"/"})
                })
                .catch(err => {
                        this.errorLogin = "Usuario o contraseña incorrecots"
                        console.log(err)
                }) 
            }
        }


      
    }
  },
  })
  </script>