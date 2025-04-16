<template>
  <div class="card p-4 mb-5">
    <label v-if="props.label" class="label">{{ props.label }}</label>

    <div class="field">
      <div class="control">
        <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keydown.enter.shift.exact.prevent="$emit('shiftEnterPressed')" class="textarea" :placeholder="props.placeholder" v-autofocus ref="textareaRef" maxlength="280">
        </textarea>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
	</div>
</template>

<script setup>
  import { ref } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Escreva suas anotações aqui'
    },
    label: {
      type: String
    }
  })

  const emit = defineEmits(['update:modelValue', 'shiftEnterPressed'])

  const textareaRef = ref(null)
  const focusTextarea = () => {
    textareaRef.value.focus()
  }

  defineExpose({focusTextarea})
</script>