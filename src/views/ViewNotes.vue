<template>
	<div class="notes">
		<AddEditNote v-model="novaNota" ref="addEditNoteRef" @shiftEnterPressed="addNota">
			<template #buttons>
				<button @click="novaNota = ''" :disabled="!novaNota" class="button is-danger mr-4">Apagar</button>
				<button @click="addNota" :disabled="!novaNota" class="button is-link">Adicionar Nota</button>
			</template>
		</AddEditNote>

		<Note v-for="nota in storeNotes.notas" :key="nota.id" :nota="nota"></Note>

		<div v-if="!storeNotes.notas.length" class="is-size-5 has-text-centered py-6">
			Nenhuma nota por esquanto!
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import Note from '@/components/Notes/Note.vue';
	import AddEditNote from '@/components/Notes/AddEditNote.vue';
	import { useStoreNotes } from '@/stores/storeNotes';
	import { useWatchCharacters } from '@/use/useWatchCharacters';

	const storeNotes = useStoreNotes()

	const novaNota = ref('')
	const addEditNoteRef = ref(null)

	const addNota = () => {
		storeNotes.addNote(novaNota.value)

		novaNota.value = ''
		addEditNoteRef.value.focusTextarea()
	}

	useWatchCharacters(novaNota)
</script>