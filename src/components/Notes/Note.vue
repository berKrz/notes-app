<template>
  <div class="card mb-4">
		<div class="card-content">
			<div class="content">
				{{ nota.conteudo }}
        <div class="columns has-text-grey mt-2">
          <small class="column has-text-left">{{ nota.data }}</small>
          <small class="column has-text-right">{{ charsNota }}</small>
        </div>
			</div>
		</div>
		<footer class="card-footer">
			<router-link :to="`/editNote/${nota.id}`" href="#" class="card-footer-item has-text-link">Editar</router-link>
			<a href="#" @click="modals.deleteNote = true" class="card-footer-item has-text-danger">Deletar</a>
		</footer>

    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :idToDelete="props.nota.id"></ModalDeleteNote>
	</div>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import ModalDeleteNote from './ModalDeleteNote.vue';

  const props = defineProps({
    nota: {
      type: Object,
      required: true
    }
  })

  const charsNota = computed(() => {
    let ch = props.nota.conteudo.length
    let descricao = ch > 1 ? 'caracteres' : 'caracter'

    return `${ ch } ${ descricao }`
  })

  const modals = reactive({
    deleteNote: false
  })
</script>