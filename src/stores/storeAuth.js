import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { computed, ref } from "vue";
import { useStoreNotes } from "./storeNotes";
import router from '@/router';


export const useStoreAuth = defineStore('storeAuth', () => {
  const usuario = ref({})
  
  const init = computed(() => {
    const storeNotes = useStoreNotes()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        usuario.value.id = user.uid
        usuario.value.email = user.email

        storeNotes.init
        router.replace('/')
      } else {
        usuario.value = {}

        storeNotes.clearAllNotas()
      }})
    })

  const registrar = (info) => {
    createUserWithEmailAndPassword(auth, info.email, info.senha)
      .then((userCredential) => {
        const user = userCredential.user
        router.push('/')
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const logar = (info) => {
    signInWithEmailAndPassword(auth, info.email, info.senha)
      .then((userCredential) => {
        const user = userCredential.user
        router.push('/')
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.replace('/auth')
      })
      .catch((error) => {
        // alert(error.message)
      })
  }

  return { usuario, init, logar, registrar, logout}
})