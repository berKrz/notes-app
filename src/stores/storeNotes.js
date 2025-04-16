import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { db } from '@/js/firebase'
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore'
import { useStoreAuth } from './storeAuth'

let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshot = null

const dateTimeFormat = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

export const useStoreNotes = defineStore('storeNotes', () => {
	const notas = ref([])

	const init = computed(() => {
		const storeAuth = useStoreAuth()

		notesCollectionRef = collection(db, 'usuarios', storeAuth.usuario.id, 'notas')
		notesCollectionQuery = query(notesCollectionRef, orderBy('data', 'desc'))

		getAllNotas.value
	})

	function getNote(idToGet) {
		return this.notas.filter(nota => { return nota.id === idToGet})[0].conteudo
	}

	async function addNote(novaNotaConteudo) {
		await addDoc(notesCollectionRef, {
			conteudo: novaNotaConteudo,
			data: new Date().toLocaleTimeString('pt-BR', dateTimeFormat)
		})
	}

	async function updateNote(idToUpdate, novoConteudo) {
		await updateDoc(doc(notesCollectionRef, idToUpdate), {
			conteudo: novoConteudo,
			data: new Date().toLocaleString('pt-BR', dateTimeFormat)
		})
	}

	async function deleteNote(idToDelete) {
		await deleteDoc(doc(notesCollectionRef, idToDelete));
	}

	const getAllNotas = computed(async () => {
	// GET DB with realtime updates
		getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
			notas.value = []
			querySnapshot.forEach((d) => {
				let nota = {
					id: d.id,
					conteudo: d.data().conteudo,
					data: d.data().data
				}
				notas.value.push(nota)
			})
		}, erro => {
			console.log(erro.message)
		})
	})

	function clearAllNotas() {
		notas.value = []
		if (getNotesSnapshot) getNotesSnapshot() // removendo qualquer listener ativo
	}

	const getTotalNotas = computed(() => {
		return notas.value.length
	})

	const getTotalCaracteres = computed(() => {
		let c = 0

		notas.value.forEach(nota => {
			c += nota.conteudo.length
		});

		return c
	})

  return { notas, init, addNote, updateNote, deleteNote ,getNote, getAllNotas, clearAllNotas, getTotalNotas, getTotalCaracteres }
  })