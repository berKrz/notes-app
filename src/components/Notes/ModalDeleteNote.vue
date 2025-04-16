<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Deletar Nota?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Tem certeza que gostaria de deletar a nota com id {{ props.idToDelete }}?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button @click="closeModal" class="button is-danger is-light">Cancelar</button>
          <button @click="deleteNote" class="button is-danger">Deletar</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
  import { onClickOutside } from '@vueuse/core'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useStoreNotes } from '@/stores/storeNotes';
  import router from '@/router';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    idToDelete: {
      type: String,
      required: true
    },
    goHome: {
      type: Boolean,
      default: false
    }
  })

  const storeNotes = useStoreNotes()

  const emit = defineEmits(['update:modelValue'])
  const closeModal = () => {
    emit('update:modelValue', false)
  }


  const modalCardRef = ref(null)
  onClickOutside(modalCardRef, closeModal)


  const handleKeyboard = e => {
    if (e.key === 'Escape') closeModal()
    
    if (e.key === 'Enter') deleteNote()
  }


  const deleteNote = () => {
    storeNotes.deleteNote(props.idToDelete)
    if (props.goHome) router.push('/')
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
  })
  onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
  })
</script>