<template>
  <AddEditNote v-model="counteudoNota" :model-value="`${counteudoNota}`" @shiftEnterPressed="salvarNota" placeholder="Edite sua nota aqui" :label="`Editar Nota com ID= ${$route.params.id}`" ref="addEditNoteRef">
    <template #buttons>
      <button @click="$router.back" class="button is-danger is-light mr-4">Cancelar</button>

      <div class="is-pulled-right">
        <button @click="modals.deleteNote = true" class="button is-danger mr-4">Apagar Nota</button>
        <button @click="salvarNota" class="button is-link is-focused" :disabled="!counteudoNota">Salvar</button>
      </div>
    </template>
  </AddEditNote>

  <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :idToDelete="$route.params.id" :go-home="true"></ModalDeleteNote>
</template>

<script setup>
  import AddEditNote from '@/components/Notes/AddEditNote.vue';
  import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue';
  import { useStoreNotes } from '@/stores/storeNotes';
  import { useRoute } from 'vue-router';
  import router from '@/router';
  import { onMounted, onUnmounted, ref, reactive } from 'vue';

  const route = useRoute()
  const storeNotes = useStoreNotes()

  const idNota = route.params.id
  const counteudoNota = ref(storeNotes.getNote(idNota))

  const salvarNota = () => {
    storeNotes.updateNote(idNota, counteudoNota.value)
    router.back()
  }

  const modals = reactive({
    deleteNote: false,
  })

  const handleKeyboard = e => {
    if (e.key === 'Escape') router.back()
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
  })
  onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
  })
</script>