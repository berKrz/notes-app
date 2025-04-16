import { watch } from "vue"

export function useWatchCharacters(valueToWatch, maxChars = 280) {
    watch(valueToWatch, (novoValor) => {
		if (novoValor.length >= maxChars) {
			alert(`Mais de ${maxChars} caracteres não são permitidos`)	
		}
  })
}