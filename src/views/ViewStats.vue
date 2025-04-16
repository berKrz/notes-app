<template>
  <div class="stats">
    <table class="table is-fullwidth has-background-white">
      <thead>
        <tr>
          <th class="has-text-black">Stat</th>
          <th class="has-text-black">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="has-text-grey">Número de notas</td>
          <td class="has-text-grey">{{ storeNotes.getTotalNotas }}</td>
        </tr>

        <tr>
          <td class="has-text-grey">Número de caracteres (de todas as notas)</td>
          <td class="has-text-grey">{{ storeNotes.getTotalCaracteres }}</td>
        </tr>
      </tbody>
    </table>

    <input v-model="review" type="text" class="input has-background-white has-text-black" placeholder="Deixe um review" v-autofocus>
  </div>
</template>

<script setup>
  import { useStoreNotes } from '@/stores/storeNotes';
  import { vAutofocus } from '@/directives/vAutofocus';
  import { useWatchCharacters } from '@/use/useWatchCharacters';
  import { ref } from 'vue';

  const storeNotes = useStoreNotes()

  const review = ref('')

  useWatchCharacters(review, 100)
</script>